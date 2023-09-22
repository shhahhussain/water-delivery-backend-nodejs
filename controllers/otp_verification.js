const { VerificationCodes, Users } = require("../models");

module.exports = {
  otpVerification: async (req, res) => {
    try {
      const { otp } = req.body;
      const userId = req.user.id;
      const user = await Users.findByPk(userId);
      const latestOtp = await VerificationCodes.findOne({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });

      if (latestOtp) {
        const timeOfOtp = new Date();
        if (timeOfOtp <= latestOtp.expiresAt) {
          if (latestOtp.otp === otp) {
            user.is_verified = true;
            await latestOtp.destroy();
            res.success({ message: "OTP matched" });
          } else {
            res.internalError({ message: "Wrong OTP" });
          }
        } else {
          res.internalError({ message: "The OTP has been expired" });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.internalError({
        message: "Internal server Error !! Sorry for the inconvenience",
      });
    }
  },
};
