const {
  Users,
  Products,
  Favorites,
  UserCoupons,
  CouponBooks,
} = require("../models");
const _ = require("lodash");

module.exports = {
  getUserProfile: async (req, res) => {
    try {
      let user = await Users.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
      res.success({ user });
    } catch (err) {
      res.internalError(err);
    }
  },

  setUserProfilePicture: async (req, res) => {
    try {
      await Users.update(
        { profile_image: req.profile_image_location },
        {
          where: { id: req.user.id },
        }
      );
      let updatedUser = await Users.findByPk(req.user.id);
      res.success({ updatedUserImage: updatedUser.profile_image });
    } catch (err) {
      res.internalError(err);
    }
  },

  updateUserProfile: async (req, res) => {
    const updatingFields = req.body;

    console.log(req.body);

    if (_.isEmpty(updatingFields)) {
      return res.internalError({
        message: "Updating fields are required",
        status: 400,
      });
    }
    if (_.has(updatingFields, "mobile_number")) {
      return res.internalError({
        message: "Mobile number cannnot be changed",
        status: 400,
      });
    }
    if (_.has(updatingFields, "password")) {
      return res.internalError({
        message: "password cannot be changed",
        status: 400,
      });
    }

    try {
      let update = await Users.update(updatingFields, {
        where: { id: req.user.id },
        returning: true,
      });
      if (update[1] != 1) {
        return res.internalError({ message: "Update Failed", status: 500 });
      }
      let updatedUser = await Users.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
      res.success({ updatedUser });
    } catch (err) {
      res.internalError(err);
    }
  },

  getUserFavorites: async (req, res) => {
    try {
      let userFavorites = await Favorites.findAll({
        where: {
          user_id: req.user.id,
        },
        include: [
          {
            model: Products,
            required: false,
            attributes: { exclude: ["description", "createdAt", "updatedAt"] },
          },
        ],
      });
      res.success({ userFavorites });
    } catch (err) {
      res.internalError(err);
    }
  },

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

  addToFavorites: async (req, res) => {
    const productId = req.params.productId;

    const product = await Products.findByPk(productId);

    if (_.isNull(product)) {
      return res.internalError({
        message: "product does not exist",
        status: 400,
      });
    }

    try {
      let favoriteItem = await Favorites.findOrCreate({
        where: { user_id: req.user.id, product_id: req.params.productId },
      });

      res.success({
        favoriteItem: favoriteItem[0],
        isNewEntry: favoriteItem[1],
      });
    } catch (err) {
      res.internalError(err);
    }
  },

  removeFromFavorites: async (req, res) => {
    try {
      await Favorites.destroy({
        where: {
          user_id: req.user.id,
          product_id: req.params.productId,
        },
      });

      res.success({ message: "Product removed from favorites" });
    } catch (err) {
      res.internalError(err);
    }
  },
};
