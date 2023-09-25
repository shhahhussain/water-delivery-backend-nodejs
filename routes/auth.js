const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/auth");

router.post("/sign-up", controller.signUp);
router.post("/login", controller.logIn);

module.exports = router;
