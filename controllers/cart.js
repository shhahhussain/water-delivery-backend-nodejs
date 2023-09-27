const { Users, Products, CartItems, sequelize } = require("../models");

module.exports = {
  addToCart: async (req, res) => {
    let { quantity } = req.body;

    if (!quantity) {
      return res.internalError({
        message: "Quantity is required",
        status: 400,
      });
    }

    let userCart = await CartItems.findOne({
      where: {
        product_id: req.params.productId,
      },
    });

    try {
      if (!userCart) {
        let cart = await CartItems.create({
          quantity: req.body.quantity,
        });

        let product = await Products.findByPk(req.params.productId);
        if (!product) {
          await cart.destroy();
          return res.internalError({
            message: "Product does not exist",
            status: 400,
          });
        }
        await cart.setProduct(product);
        let user = await Users.findByPk(req.user.id);
        await cart.setUser(user);

        await cart.save();
        res.success({ cart_item: cart });
      } else {
        userCart.quantity = quantity;
        await userCart.save();
        res.success({ cart_item: userCart });
      }
    } catch (err) {
      res.internalError(err);
    }
  },

  addMultipleToCart: async (req, res) => {
    try {
      let isValid = true;

      req.body.forEach((item) => {
        let { quantity, product_id } = item;
        if (!quantity || !product_id) {
          isValid = false;
          return;
        } else {
          item.user_id = req.user.id;
        }
      });

      if (!isValid) {
        return res.internalError({
          message: "Body missing required fields",
          status: 400,
        });
      }

      let items = await CartItems.bulkCreate(req.body);

      res.success(items);
    } catch (err) {
      res.internalError(err);
    }
  },

  getUserCart: async (req, res) => {
    try {
      let userCart = await CartItems.findAll({
        where: {
          user_id: req.user.id,
        },
        include: [
          {
            model: Products,
            required: false,
          },
        ],
      });
      res.success({ userCart });
    } catch (err) {
      res.internalError(err);
    }
  },

  updateCartItem: async (req, res) => {
    let { quantity } = req.body;

    if (!quantity) {
      return res.internalError({
        message: "Quantity is required",
        status: 400,
      });
    }

    try {
      let cartItem = await CartItems.findByPk(req.params.cartItemId);

      if (cartItem) {
        cartItem.quantity = quantity;

        if (cartItem.quantity == 0) {
          await cartItem.destroy();
          res.success({ message: "Cart Item removed" });
        } else {
          await cartItem.save();
          res.success({ cartItem });
        }
      } else {
        res.internalError({ message: "Cart item not found", status: 400 });
      }
    } catch (err) {
      res.internalError(err);
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      await CartItems.destroy({
        where: {
          id: req.params.cartItemId,
        },
      });

      res.success({ message: "Cart Item deleted Successfully" });
    } catch (err) {
      res.internalError(err);
    }
  },
};
