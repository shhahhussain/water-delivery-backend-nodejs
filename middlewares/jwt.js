const jwt = require("jsonwebtoken");
const config = require("../config");
const { Users } = require("../models");

module.exports = {
  getToken: (user) => {
    return jwt.sign(user, config.get("jwt.user_secret_key"), {
      expiresIn: 86400,
    });
  },

  verifyToken: async (req, res, next) => {
    try {
      let token = req.header("Authorization");

      if (!token) {
        let e = new Error("Access Denied");
        e.status = 403;
        return res.internalError(e);
      }

      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }

      jwt.verify(
        token,
        config.get("jwt.user_secret_key"),
        async (err, decoded) => {
          if (err) {
            return res.internalError(err);
          }
          let user = await Users.findByPk(decoded.id);
          if (!user) {
            return res.internalError(new Error("Invalid User"));
          }
          req.user = decoded;
          next();
        }
      );
    } catch (error) {
      return res.internalError(error);
    }
  },
};
