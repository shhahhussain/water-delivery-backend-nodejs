const { Router } = require("express");
const router = Router();

// Routers
const authRouter = require("./auth");
const testRuleRouter = require("./test");

router.use("/test", testRuleRouter);

router.use("/auth", authRouter);

module.exports = router;
