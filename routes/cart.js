const { Router } = require("express");
const router = Router();

const orderController = require("../controllers/cart");

router.post("/", orderController.addMultipleToCart);

router.get("/", orderController.getUserCart);

router.post("/:productId", orderController.addToCart);

router.put("/:cartItemId", orderController.updateCartItem);

router.delete("/:cartItemId", orderController.deleteCartItem);

module.exports = router;
