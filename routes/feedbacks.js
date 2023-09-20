const { Router } = require("express");
const router = Router();

const feedbackController = require("../controllers/feedbacks");

router.post("/", feedbackController.Addfeedback);

module.exports = router;
