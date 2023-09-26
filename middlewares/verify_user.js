const config = require("../config");
const { Users } = require("../models");

module.exports = {
  verifyUser: async (req, res, next) => {
    try {
      let user = await Users.findByPk(req.user.id);
      if (!user.is_verified) {
        return res.internalError({
          message: "User is not verified",
          status: 403,
        });
      }
      next();
    } catch (error) {
      return res.internalError(error);
    }
  },
};
