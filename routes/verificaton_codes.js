const { Router } = require("express");
const router = Router();

const Otpverificationcontroller = require("../controllers/otp_verification");
const Otpcontroller = require("../controllers/verificaton_codes");

router.post("/send", Otpcontroller.sendOtp);
router.post("/verify", Otpverificationcontroller.otpVerification);

module.exports = router;
