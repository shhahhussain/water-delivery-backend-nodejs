const { Router } = require("express");
const router = Router();

// Routers
const userRouter = require("./user");
const testRuleRouter = require("./test");

router.use("/test", testRuleRouter);

router.use("/users", userRouter);

module.exports = router;
