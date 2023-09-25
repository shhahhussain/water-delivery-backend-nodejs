const { Router } = require("express");
const router = Router();

const userController = require("../controllers/user");

router.get("/coupons", userController.getUserCoupons);

module.exports = router;
