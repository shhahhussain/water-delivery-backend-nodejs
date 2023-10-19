const { Users } = require("../models");
const bcrypt = require("bcrypt");
module.exports = {
  passwordReset: async (req, res) => {
    try {
      const userid = req.user.id;
      const { newPassword, confirmNewPassword } = req.body;
      const user = await Users.findByPk(userid);
      if (!user) {
        return res.internalError({ message: "User not found" });
      }

      if (newPassword !== confirmNewPassword) {
        throw {
          message: "Password did not match. kindly enter the same password",
          status: 400,
        };
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await user.update({
        password: hashedPassword,
      });
      res.success({ message: "password updated successfully" });
    } catch (error) {
      res.internalError({ message: error.message || "Something went wrong" });
    }
  },
};
