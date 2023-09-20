const { PromotionalOffers } = require("../models");
module.exports = {
  addingPromoOffer: async (req, res) => {
    try {
      const { discount, promocode } = req.body;
      const promoOffer = await PromotionalOffers.create({
        discount,
        promocode,
      });
      res.succes({ message: "Promotional offer added !!" });
    } catch (error) {
      console.log(error.message);
      res.internalError({ message: "error creating promotional offer" });
    }
  },
  getPromoOffers: async (req, res) => {
    try {
      const promoOffer = await PromotionalOffers.findAll();
      res.success({ promoOffer });
    } catch (error) {
      console.log(err);
      res.internalError(err);
    }
  },
};
