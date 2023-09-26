const { Router } = require("express");
const router = Router();

const checkoutController = require("../controllers/checkout");

router.post("/", checkoutController.applyingdiscountoncheckout);

module.exports = router;
