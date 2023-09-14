const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/auth");

//Middlewares
const { verifyToken } = require("../middlewares/jwt");

router.post("/signup", controller.sign_up);

//to be implemented
// router.post("/login, controller.log_in");

module.exports = router;
