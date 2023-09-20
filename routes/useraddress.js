const { Router } = require("express");
const router = Router();

const addressController = require("../controllers/user_address");

router.post("/", addressController.userAddress);
router.get("/", addressController.getUserAddress);

module.exports = router;
