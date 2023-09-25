const { Users } = require("../models");
const { getToken } = require("../middlewares/jwt");

module.exports = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.internalError({
          message: "No Account is associated with the given email",
        });
      }

      const token = getToken({ id: user.id, email: user.email });
      res.success({ token: token });
    } catch (error) {
      res.internalError(error);
    }
  },
};
