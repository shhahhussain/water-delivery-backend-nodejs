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
        return res.internalError({
          message: "Password did not match. kindly enter the same password",
        });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.success({ message: "password updated successfully" });
    } catch (error) {
      res.internalError({ message: "Something went wrong" });
    }
  },
};
