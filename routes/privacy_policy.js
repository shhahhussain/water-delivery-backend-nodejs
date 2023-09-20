const { Router } = require("express");
const router = Router();

const privacyPolicyController = require("../controllers/privacy_policy");

router.post("/", privacyPolicyController.addPrivacyPolicy);
router.get("/", privacyPolicyController.getPrivacyPolicy);

module.exports = router;
