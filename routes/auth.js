const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/auth");

router.post("/sign-up", controller.sign_up);

module.exports = router;
