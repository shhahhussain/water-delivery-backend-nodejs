const { Router } = require("express");
const router = Router();

const productController = require("../controllers/product");

// router.post("/", productController.addProducts);
router.get("/", productController.getAllOrders);
router.get("/:id", productController.getOneOrder);

module.exports = router;
