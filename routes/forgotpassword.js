const { Router } = require("express");
const router = Router();

const forgotPasswordfieldController = require("../controllers/forgotpassword");

router.post("/", forgotPasswordfieldController.forgotPassword);

module.exports = router;
