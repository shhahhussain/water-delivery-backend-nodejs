const stripe = require("stripe")(
  "sk_test_51Nt38eF3WlU4fAFlINb2leMhLtp3HVqWueKcwUg1TOQNmH33ZO4NwjvDKLdyz9HoVAMPjIyLcMQRjwxtziHXFOOT00eC9Ct2kT"
);

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

module.exports = {
  addOrder: async (req, res) => {
    const t = await sequelize.transaction();
    const { leafsend, coupon_book_id, promocode, delivery, status } = req.body;
    const userId = req.user.id;
    try {
      const [promotionalOffer, selectedCouponBook] = await Promise.all([
        PromotionalOffers.findOne({ where: { promocode, userId } }),
        UserCoupons.findOne({
          where: { coupon_book_id, user_id: userId },
          include: [{ model: CouponBooks }],
        }),
      ]);

      if (!promotionalOffer) {
        return res.internalError({
          message:
            error.message || "There is no promotional offer for the given code",
        });
      }

      if (!selectedCouponBook) {
        return res.internalError({
          message: error.message || "Coupan book was not found",
        });
      }

      const cartItems = await CartItems.findAll({
        where: { user_id: userId },
        include: [{ model: Products }],
      });

      let subTotal = 0;
      for (const cartItem of cartItems) {
        subTotal += cartItem.product.unit_price * cartItem.quantity;
      }

      const discount = (subTotal * promotionalOffer.discount) / 100;
      const newCouponPrice =
        leafsend * selectedCouponBook.coupon_book.rate_per_leaf;
      const total = subTotal + delivery - discount - newCouponPrice;
      const totalAmountInCents = Math.round(subTotal * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmountInCents,
        currency: "aed",
      });

      const order = await Orders.create({
        userId,
        subTotal,
        delivery,
        discount,
        total,
        status,
      });
      try {
        for (const cartItem of cartItems) {
          await OrderItems.create({
            orderId: order.id,
            userId: userId,
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
          });
        }
      } catch (error) {
        return res.internalError({
          message: error.message || "Error Creating Order items",
        });
      }

      res.success({ order, paymentIntent });
    } catch (error) {
      await t.rollback();
      return res.internalError({
        message: error.message || "An error occurred",
      });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = Orders.findAll({ where: { userId } });
      if (!orders) {
        return res.internalError({ message: "No order found", status: 404 });
      }
      res.success({ orders });
    } catch (error) {
      res.internalError({ message: "Error finding orders" });
    }
  },
  getOneOrder: async (req, res) => {
    try {
      const userId = req.user.id;
      const orderId = req.param.id;
      const order = Orders.findOne({ where: { userId, id: orderId } });
      if (!order) {
        return res.internalError({ message: "No order found", status: 404 });
      }
      res.success({ order });
    } catch (error) {
      res.internalError({ message: "Error finding orders" });
    }
  },
};
