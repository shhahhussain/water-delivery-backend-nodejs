const { Router } = require("express");
const router = Router();

const Otpcontroller = require("../controllers/verificaton_codes");

router.post("/send", Otpcontroller.sendOtp);
router.post("/verify", Otpcontroller.otpVerification);

module.exports = router;
