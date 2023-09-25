const { Router } = require("express");
const router = Router();

const passwordresetController = require("../controllers/passwordreset");

router.patch("/", passwordresetController.passwordReset);

module.exports = router;
