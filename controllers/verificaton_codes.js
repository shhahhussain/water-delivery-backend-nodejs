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
    try {
      await VerificationCodes.create({
        otp,
        userId,
      });
      const mailOptions = {
        from: "shhahhussain@gmail.com",
        to: email,
        subject: "Login OTP",
        text: `Your OTP is ${otp}`,
      };
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.internalError({ message: "Failed to send OTP" });
        } else {
          res.success({ message: "OTP successfully sent" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.internalError({ message: "Failed to generate OTP" });
    }
  },
};
