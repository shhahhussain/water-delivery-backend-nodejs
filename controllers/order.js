const config = require("../config");
const stripeApiKey = config.get("stripeApiKey");
const stripe = require("stripe")(stripeApiKey);
const {
  Orders,
  Products,
  CartItems,
  PromotionalOffers,
  UserCoupons,
  CouponBooks,
  OrderItems,
  sequelize,
} = require("../models");

const calculatePromoDiscount = async (userId, subTotal, promocode) => {
  let discount = 0;

  if (promocode) {
    const promotionalOffer = await PromotionalOffers.findOne({
      where: { promocode, userId },
    });

    if (promotionalOffer) {
      discount = (subTotal * promotionalOffer.discount) / 100;
    }
  }

  return discount;
};

const calculateCouponDiscount = async (userId, cartItems, couponLeafs) => {
  let totalCouponDiscount = 0;

  for (const cartItem of cartItems) {
    if (couponLeafs.length > 0) {
      for (const couponLeaf of couponLeafs) {
        const { coupon_book_id, leafs } = couponLeaf;
        const selectedCouponBook = await UserCoupons.findOne({
          where: { coupon_book_id, user_id: userId },
          include: [{ model: CouponBooks }],
        });

        if (selectedCouponBook) {
          if (
            selectedCouponBook.coupon_book.applicable_product_id ===
              cartItem.product.id &&
            selectedCouponBook.avaliable_leaves > 0
          ) {
            const couponDiscount =
              leafs * selectedCouponBook.coupon_book.rate_per_leaf;
            totalCouponDiscount += couponDiscount;

            let remainingleaf = selectedCouponBook.avaliable_leaves - leafs;
            await selectedCouponBook.update({
              avaliable_leaves: remainingleaf,
            });
          }
        }
      }
    }
  }

  return totalCouponDiscount;
};

module.exports = {
  addOrder: async (req, res) => {
    let orderTransaction;
    try {
      orderTransaction = await sequelize.transaction();
      const {
        promocode,
        delivery,
        status,
        paymentMethodId,
        paymentToken,
      } = req.body;

      const userId = req.user.id;

      const cartItems = await CartItems.findAll({
        where: { user_id: userId },
        include: [{ model: Products }],
      });

      let subTotal = 0;
      for (const cartItem of cartItems) {
        subTotal += cartItem.product.unit_price * cartItem.quantity;
      }

      let totalCouponDiscount = 0;
      const couponLeafs = req.body.coupon_leafs || [];
      totalCouponDiscount = await calculateCouponDiscount(
        userId,
        cartItems,
        couponLeafs
      );

      let discount = 0;
      discount = await calculatePromoDiscount(userId, subTotal, promocode);

      const total = subTotal + delivery - discount - totalCouponDiscount;

      const totalAmountInCents = Math.round(subTotal * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmountInCents,
        currency: "aed",
        payment_method: paymentToken,
      });

      const order = await Orders.create({
        userId,
        subTotal,
        delivery,
        discount,
        total,
        status,
        paymentMethodId,
      });

      for (const cartItem of cartItems) {
        await OrderItems.create({
          orderId: order.id,
          userId: userId,
          productId: cartItem.product.id,
          quantity: cartItem.quantity,
        });
      }

      await orderTransaction.commit();

      res.success({ order, paymentIntent });
    } catch (error) {
      await orderTransaction.rollback();
      return res.internalError({
        message: error.message || "An error occurred during placing order ",
      });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const userId = req.user.id;
      const page = req.query.page || 1;
      const orderPerPage = 3;
      const offset = (page - 1) * orderPerPage;
      const orders = await Orders.findAll({
        where: { userId },
        limit: orderPerPage,
        offset,
      });
      if (Object.keys(orders).length === 0) {
        return res.internalError({
          message: error.message || "No order found",
          status: 404,
        });
      }
      res.success({ orders });
    } catch (error) {
      res.internalError({ message: error.message || "Error finding orders" });
    }
  },

  getOneOrder: async (req, res) => {
    try {
      const userId = req.user.id;
      const orderId = req.params.id;
      const order = await Orders.findOne({ where: { userId, id: orderId } });
      if (Object.keys(order).length === 0) {
        return res.internalError({
          message: error.message || "No order found",
          status: 404,
        });
      }
      res.success({ order });
    } catch (error) {
      res.internalError({ message: error.message || "Error finding orders" });
    }
  },
};
