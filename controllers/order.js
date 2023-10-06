const _ = require("lodash");
const {
  calculatePromoDiscount,
  calculateCouponDiscount,
} = require("../utils/discount");
const config = require("../config");
const stripeApiKey = config.get("stripeApiKey");
const stripe = require("stripe")(stripeApiKey);
const paypalID = config.get("paypal.client_id");
const paypalSecret = config.get("paypal.client_secret");
const paypal = require("@paypal/checkout-server-sdk");

const Environment = paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(paypalID, paypalSecret)
);

const {
  Orders,
  Products,
  CartItems,
  OrderItems,
  sequelize,
} = require("../models");

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
        selectedPaymentMethod,
        paypalAuthorizationToken,
      } = req.body;

      const userId = 35;

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
      let paymentIntent;
      let orderofuser;
      if (selectedPaymentMethod === "stripe") {
        paymentIntent = await stripe.paymentIntents.create({
          amount: totalAmountInCents,
          currency: "aed",
          payment_method: paymentToken,
        });
      }
      if (selectedPaymentMethod === "paypal") {
        const totalinUSD = totalAmountInCents / 100;
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");

        request.requestBody({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: totalinUSD,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: totalinUSD,
                  },
                },
              },
            },
          ],
        });
        orderofuser = await paypalClient.execute(request);
      }

      const order = await Orders.create(
        {
          userId,
          subTotal,
          delivery,
          discount,
          total,
          status,
          paymentMethodId,
        },
        { transaction: orderTransaction }
      );
      const orderItemsToInsert = cartItems.map((cartItem) => ({
        orderId: order.id,
        userId: userId,
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
      }));

      await OrderItems.bulkCreate(orderItemsToInsert, {
        transaction: orderTransaction,
      });

      await orderTransaction.commit();

      if (selectedPaymentMethod === "stripe") {
        res.success({ order, paymentIntent });
      } else {
        res.success({ order, orderofuser });
      }
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

      if (_.isEmpty(orders)) {
        throw {
          message: error.message || "No order found",
          status: 404,
        };
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
      if (_.isEmpty(order)) {
        throw {
          message: error.message || "No order found",
          status: 404,
        };
      }
      res.success({ order });
    } catch (error) {
      res.internalError({ message: error.message || "Error finding orders" });
    }
  },
};
