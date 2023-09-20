const { Users, Products, UserCoupons, CouponBooks } = require("../models");

module.exports = {
  getUserCoupons: async (req, res) => {
    try {
      let coupons = await UserCoupons.findAll({
        where: {
          user_id: req.user.id,
        },
        include: [
          {
            model: CouponBooks,
            required: false,
          },
        ],
      });

      res.success({ coupons });
    } catch (err) {
      res.internalError(err);
    }
  },
};
