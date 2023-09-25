const { PrivacyPolicies } = require("../models");
module.exports = {
  addPrivacyPolicy: async (req, res) => {
    try {
      const { detail } = req.body;
      const privacypolicy = await PrivacyPolicies.create({
        detail,
      });
      res.succes({ message: "Privacy policy created !!" });
    } catch (error) {
      console.log(error.message);
      res.internalError({ message: "error creating privacy policy" });
    }
  },
  getPrivacyPolicy: async (req, res) => {
    try {
      const privacypolicy = await PrivacyPolicies.findAll();
      res.success({ privacypolicy });
    } catch (error) {
      console.log(err);
      res.internalError(err);
    }
  },
};
