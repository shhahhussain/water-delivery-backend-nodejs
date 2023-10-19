const { PromotionalOffers } = require("../models");
module.exports = {
  addingPromoOffer: async (req, res) => {
    try {
      const { discount, promocode } = req.body;
      const promoOffer = await PromotionalOffers.create({
        discount,
        promocode,
      });
      res.success({ message: "Promotional offer added !!" });
    } catch (error) {
      console.log(error.message);
      res.internalError({ message: "error creating promotional offer" });
    }
  },
  getPromoOffers: async (req, res) => {
    try {
      const promotions = await Promotions.findAll();
      res.success({ promotions });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
};
