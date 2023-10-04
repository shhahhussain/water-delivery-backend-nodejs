const config = require("../config");
const nodemailer = require("nodemailer");

module.exports = {
  transport: nodemailer.createTransport({
    service: config.get("email.service"),
    port: config.get("email.port"),
    secure: config.get("email.secure"),
    auth: {
      user: config.get("email.auth.user"),
      pass: config.get("email.auth.pass"),
    },
  }),
  getMailOptions: (email, otp) => {
    return {
      from: config.get("email.auth.user"),
      to: email,
      subject: "Login OTP",
      text: `Your OTP is ${otp}`,
    };
  },
};
