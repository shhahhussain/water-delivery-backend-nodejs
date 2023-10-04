const { VerificationCodes, Users, sequelize } = require("../models");
const { transport, getMailOptions } = require("../utils/emailutils");
const { randomOTPgenerator } = require("../utils/otpgenerator");

module.exports = {
  sendOtp: async (req, res) => {
    let otpTransaction;
    try {
      otpTransaction = await sequelize.transaction();
      const userId = req.user.id;
      const { email } = req.body;
      const user = await Users.findOne({ where: { id: userId, email } });
      if (!user) {
        return res.internalError({
          message:
            "No user found with the given email !! Kindly check your email",
        });
      }
      const otp = randomOTPgenerator();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 5);

      const mailOptions = getMailOptions(email, otp);
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.internalError({ message: "Failed to send OTP" });
        }
      });
      await VerificationCodes.create({
        otp,
        userId,
        expiresAt,
      });
      await otpTransaction.commit();
      res.success({ message: "OTP successfully sent" });
    } catch (error) {
      await otpTransaction.rollback();
      return res.internalError({
        message: error.message || "Failed to generate OTP",
      });
    }
  },

  otpVerification: async (req, res) => {
    try {
      const { otp } = req.body;
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

      if (latestOtp.otp !== otp) {
        return res.internalError({ message: "Wrong OTP" });
      }

      if (user) {
        await Users.update({ is_verified: true }, { where: { id: userId } });
      }
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
