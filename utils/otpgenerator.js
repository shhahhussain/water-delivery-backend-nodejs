const otpGenerator = require("otp-generator");

module.exports = {
  randomOTPgenerator: () =>
    otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    }),
};
