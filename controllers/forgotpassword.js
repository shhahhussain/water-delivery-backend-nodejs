const { Users } = require("../models");
const { getToken } = require("../middlewares/jwt");

module.exports = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        throw {
          message:
            error.message ||
            "No email provided !! Kindly provide an email associated with your account",
          status: 400,
        };
      }
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        throw {
          message:
            error.message || "No Account is associated with the given email",
          status: 400,
        };
      }

      const token = getToken({ id: user.id, email: user.email });
      res.success({ token: token });
    } catch (error) {
      return res.internalError({
        message: error.message || "Something went wrong",
      });
    }
  },
};
