const { Router } = require("express");
const router = Router();

const orderController = require("../controllers/order");

router.post("/", orderController.addOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOneOrder);

module.exports = router;
