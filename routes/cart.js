const { Router } = require("express");
const router = Router();

// Controllers
const orderController = require("../controllers/cart");

router.post("/cart", orderController.addMultipleToCart);

router.get("/cart", orderController.getUserCart);

router.post("/cart/:productId", orderController.addToCart);

router.put("/cart/:cartItemId", orderController.updateCartItem);

router.delete("/cart/:cartItemId", orderController.deleteCartItem);

module.exports = router;
