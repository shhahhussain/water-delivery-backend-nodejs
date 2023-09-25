const { Router } = require("express");
const router = Router();

const promoOfferController = require("../controllers/promotional_offers");

router.post("/", promoOfferController.addingPromoOffer);
router.get("/", promoOfferController.getPromoOffers);

module.exports = router;
