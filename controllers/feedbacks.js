const { UserFeedbacks } = require("../models");
module.exports = {
  Addfeedback: async (req, res) => {
    try {
      const { message, recoommendation, starreceived } = req.body;
      const userId = req.user.id;
      const userfeedback = await UserFeedbacks.create({
        message,
        recoommendation,
        starreceived,
        userId,
      });
      res.success({ message: "Feedback created !!" });
    } catch (error) {
      console.log(error.message);
      res.internalError({ message: "error creating feedback" });
    }
  },
};
