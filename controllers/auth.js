const { Users, sequelize, VerificationCodes } = require("../models");
const bcrypt = require("bcrypt");
const { getToken } = require("../middlewares/jwt");
const { transport, getMailOptions } = require("./verificaton_codes");

module.exports = {
  signUp: async (req, res) => {
    const {
      full_name,
      email,
      mobile_number,
      gender,
      no_of_family_members,
      date_of_birth,
      password,
    } = req.body;
    if (!mobile_number) {
      res.internalError({ message: "Mobile Number is required", status: 400 });
    }
    if (!full_name) {
      res.internalError({ message: "Full Name is required", status: 400 });
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await sequelize.transaction(async (t) => {
        const newUser = await Users.create(
          {
            full_name: full_name,
            email: email,
            gender: gender,
            mobile_number: mobile_number,
            no_of_family_members: no_of_family_members,
            date_of_birth: date_of_birth,
            password: hashedPassword,
            is_verified: false,
          },
          { transaction: t }
        );

        const otp = Math.floor(1000 + (9999 - 1000) * Math.random());
        const userId = newUser.id;
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);

        await VerificationCodes.create(
          {
            otp,
            userId,
            expiresAt,
          },
          { transaction: t }
        );

        return { id: newUser.id, otp: otp };
      });

      if (!result) {
        return res.internalError({ message: "Could not register" });
      }

      const mailOptions = getMailOptions(email, otp);

      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.internalError({ message: "Failed to send OTP" });
        }
      });

      const token = getToken({ id: result.id });

      res.success({ token: token });
    } catch (err) {
      res.internalError(err);
    }
  },

  logIn: async (req, res) => {
    const { mobile_number, password } = req.body;

    if (!mobile_number) {
      return res.internalError({
        message: "Mobile number is required",
        status: 400,
      });
    }
    if (!password) {
      return res.internalError({
        message: "Password is required",
        status: 400,
      });
    }

    try {
      let user = await Users.findOne({
        where: { mobile_number: req.body.mobile_number },
      });

      let check = await bcrypt.compare(req.body.password, user.password);

      if (check) {
        if (user.is_verified) {
          const token = getToken({ id: user.id, email: user.email });
          res.success({ user: user, token: token });
        } else {
          res.internalError({ message: "Not Verified", status: 403 });
        }
      } else {
        res.internalError({ message: "Incorrect Password", status: 401 });
      }
    } catch (err) {
      res.internalError(err);
    }
  },
};
