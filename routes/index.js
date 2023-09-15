const { Router } = require("express");
const router = Router();

// Routers
const userRouter = require("./user");
const testRuleRouter = require("./test");

// Controllers
const controller = require("../controllers/auth");

//Middlewares
const { verifyToken } = require("../middlewares/jwt");

router.post("/users/signup", controller.sign_up);

router.post("/users/login", controller.log_in);

//router.use("/users", userRouter);

router.use("/test", testRuleRouter);

module.exports = router;
