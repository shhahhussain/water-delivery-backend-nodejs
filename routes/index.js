const { Router } = require("express");
const router = Router();

// Routers
const testRuleRouter = require("./test");

router.use("/test", testRuleRouter);

module.exports = router;
