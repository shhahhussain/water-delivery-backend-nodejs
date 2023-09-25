const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/jwt");
// Routers
const userRouter = require("./user");
const authRouter = require("./auth");
const addressRouter = require("./useraddress");
const testRuleRouter = require("./test");
const otpRouter = require("./verificaton_codes");
const promoOfferRouter = require("./promotional_offers");
const pivacyPolicyRouter = require("./privacy_policy");
const feedbackRouter = require("./feedbacks");
const passwordresetRouter = require("./passwordreset");
const forgotPasswordRouter = require("./forgotpassword");

// Controllers
const authController = require("../controllers/auth");

//Middlewares
const { verifyToken } = require("../middlewares/jwt");

router.post("/users/signup", authController.signUp);

router.post("/users/login", authController.logIn);

//router.use("/users", userRouter);

router.use("/test", testRuleRouter);
router.use("/test", testRuleRouter);
router.use("/address", auth.verifyToken, addressRouter);
router.use("/auth", authRouter);
router.use("/otp", auth.verifyToken, otpRouter);
router.use("/promotionaloffer", auth.verifyToken, promoOfferRouter);
router.use("/pivacypolicy", auth.verifyToken, pivacyPolicyRouter);
router.use("/feedback", auth.verifyToken, feedbackRouter);
router.use("/passwordreset", auth.verifyToken, passwordresetRouter);
router.use("/forgotpassword", forgotPasswordRouter);

module.exports = router;
