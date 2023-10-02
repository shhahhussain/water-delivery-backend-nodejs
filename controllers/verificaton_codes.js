const nodemailer = require("nodemailer");
const { VerificationCodes } = require("../models");
const config = require("../config");

const transport = nodemailer.createTransport({
  service: config.get("email.service"),
  port: config.get("email.port"),
  secure: config.get("email.secure"),
  auth: {
    user: config.get("email.auth.user"),
    pass: config.get("email.auth.pass"),
  },
});

module.exports = {
  sendOtp: async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + (9999 - 1000) * Math.random());
    const userId = req.user.id;
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    const mailOptions = {
      from: "shhahhussain@gmail.com",
      to: email,
      subject: "Login OTP",
      text: `Your OTP is ${otp}`,
    };
    try {
      await VerificationCodes.create({
        otp,
        userId,
        expiresAt,
      });

      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.internalError({ message: "Failed to send OTP" });
        } else {
          res.success({ message: "OTP successfully sent" });
        }
      });
    } catch (error) {
      res.internalError({ message: "Failed to generate OTP" });
    }
  },

  transport: transport,
};
