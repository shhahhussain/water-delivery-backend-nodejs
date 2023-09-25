const { VerificationCodes, Users } = require("../models");

module.exports = {
  otpVerification: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await Users.findByPk(userId);
      const latestOtp = await VerificationCodes.findOne({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });

      if (!latestOtp) {
        return res.internalError({ message: "No OTP found" });
      }

      const timeOfOtp = new Date();

      if (timeOfOtp > latestOtp.expiresAt) {
        await latestOtp.destroy();
        return res.internalError({ message: "The OTP has expired" });
      }

      if (latestOtp.otp !== req.body.otp) {
        return res.internalError({ message: "Wrong OTP" });
      }

      user.is_verified = true;
      await user.save();
      await latestOtp.destroy();

      res.success({ message: "OTP matched" });
    } catch (error) {
      console.error(error.message);
      res.internalError({
        message: "Internal server error. Sorry for the inconvenience",
      });
    }
  },
};
