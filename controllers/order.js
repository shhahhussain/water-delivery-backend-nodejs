const stripe = require("stripe")(
  "sk_test_51Nt38eF3WlU4fAFlINb2leMhLtp3HVqWueKcwUg1TOQNmH33ZO4NwjvDKLdyz9HoVAMPjIyLcMQRjwxtziHXFOOT00eC9Ct2kT"
);
const {
  Users,
  Orders,
  Products,
  CartItems,
  Promotional_offers,
  UserCoupons,
  sequelize,
} = require("../models");

module.exports = {
  addOrder: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const userId = req.user.id;
      const promocode = req.body.promocode || null;

      const promotionalOffer = await Promotional_offers.findOne({
        where: { code: promocode },
      });
      if (!promotionalOffer) {
        await t.rollback();
        return res.badRequest({
          message: "Invalid discount code",
          status: 404,
        });
      }
      let subTotal;
      let delivery;
      let status;
      const discountPercentage = promotionalOffer.discount;
      const discount = (subTotal * discountPercentage) / 100;

      const applicableProductId = promotionalOffer.applicableProductId;
      const leafValue = promotionalOffer.leafValue;

      const user = await Users.findByPk(userId);
      if (user.leaves < leafValue) {
        await t.rollback();
        return res.badRequest({
          message: "Not enough leaves to use this coupon",
        });
      }

      user.leaves -= leafValue;
      await user.save({ transaction: t });

      let leaf = 18;
      let sendleaf = req.body.sendedleaffromuser;
      let leafremaining = leaf - sendleaf;

      let thierPrice = 3;
      let coupanpricededucation = sendleaf * thierPrice;

      let total = subTotal + delivery - discount - coupanpricededucation;

      const session = await stripe.checkout.session.create({
        payment_method_types: ["card"],
        mode: "payment",
      });
      Orders.create({
        subTotal,
        delivery,
        discount,
        total,
        status,
      });
      await t.commit();
      res.success({
        message:
          "Your price is " +
          totalpriceofcart +
          " total leaf remaining " +
          leafremaining,
      });
    } catch (error) {
      await t.rollback();
      res.internalError({ message: "Something went wrong" });
    }
  },
  getOrders: async (req, res) => {
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
