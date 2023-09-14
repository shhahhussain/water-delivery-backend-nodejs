const jwt = require("jsonwebtoken");
const config = require("../config");

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
        res.internalError(e);
      }

      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }

      const verified = jwt.verify(token, config.get("jwt.user_secret_key"));
      req.user = verified;
      next();
    } catch (error) {
      res.internalError(error);
    }
  },
};
