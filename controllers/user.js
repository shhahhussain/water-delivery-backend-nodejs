const { Users, Products, Favorites } = require("../models");

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
    try {
      let update = await Users.update(req.body, {
        where: { id: req.user.id },
        returning: true,
      });
      if (update[1] != 1) {
        return res.internalError(new Error("Could not update user profile"));
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

  addToFavorites: async (req, res) => {
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
