const { Router } = require("express");
const router = Router();

// Routers
const userRouter = require("./user");
const testRuleRouter = require("./test");

// Controllers
const authController = require("../controllers/auth");

//Middlewares
const { verifyToken } = require("../middlewares/jwt");

router.post("/users/signup", authController.signUp);

router.post("/users/login", authController.logIn);

//router.use("/users", userRouter);

router.use("/test", testRuleRouter);

module.exports = router;
