const { Users, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const { getToken } = require("../middlewares/jwt");

module.exports = {
  sign_up: async (req, res) => {
    let {
      full_name,
      email,
      mobile_number,
      gender,
      no_of_family_members,
      date_of_birth,
      password,
    } = req.body;
    if (!mobile_number) {
      res.internalError(new Error("Mobile Number is required"));
    }
    if (!full_name) {
      res.internalError(new Error("Full Name is required"));
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await Users.create({
        full_name: full_name,
        email: email,
        gender: gender,
        mobile_number: mobile_number,
        no_of_family_members: no_of_family_members,
        date_of_birth: date_of_birth,
        password: hashedPassword,
        is_mobile_verified: false,
      });

      const token = getToken({ id: newUser.id });

      res.success({ newUser: newUser, token: token });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },
};
