const nodemailer = require("nodemailer");
const { VerificationCodes } = require("../models");
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "shhahhussain@gmail.com",
    pass: "pdibnqeyxpiesyqk",
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
