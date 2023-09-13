const { Router } = require("express");
const router = Router();

// Routers
const userRouter = require("./user");
const testRuleRouter = require("./test");

router.use("/v1/users", userRouter);
router.use("/test", testRuleRouter);

module.exports = router;
