const { Router } = require("express");
const router = Router();

// Controllers
const orderController = require("../controllers/order");
const order = require("../controllers/order");

router.post("/cart/:productId", orderController.addToCart);

router.post("/cart", orderController.addMultipleToCart);

module.exports = router;
