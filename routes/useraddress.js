const { Router } = require("express");
const router = Router();

const addressController = require("../controllers/user_address");

router.post("/", addressController.userAddress);
router.get("/", addressController.getUserAddress);
router.patch("/:id", addressController.updateUserAddress);
router.delete("/:id", addressController.deleteUserAddress);

module.exports = router;
