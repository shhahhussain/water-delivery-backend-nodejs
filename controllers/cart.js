const { Users, Products, CartItems, sequelize } = require("../models");

module.exports = {
  addToCart: async (req, res) => {
    try {
      let cart = await CartItems.create({
        quantity: req.body.quantity,
      });

      let product = await Products.findByPk(req.params.productId);
      if (!product) {
        await cart.destroy();
        throw new Error("Product not avaliable");
      }
      await cart.setProduct(product);
      let user = await Users.findByPk(req.user.id);
      await cart.setUser(user);

      await cart.save();
      res.success({ cart_item: cart });
    } catch (err) {
      res.internalError(err);
    }
  },

  addMultipleToCart: async (req, res) => {
    try {
      let cartItems = [];

      console.log(req.body);
      req.body.forEach((cartItem) => {
        cartItems.push(
          new Promise(async (resolve, reject) => {
            let cart = await CartItems.create({
              quantity: cartItem.quantity,
            });

            let product = await Products.findByPk(cartItem.product_id);
            if (!product) {
              await cart.destroy();
              resolve(null);
            }
            await cart.setProduct(product);
            let user = await Users.findByPk(req.user.id);
            await cart.setUser(user);

            await cart.save();
            resolve(cart);
          })
        );
        console.log(cartItems);
      });

      Promise.all(cartItems).then((cart_items) => {
        var itemsAdded = cart_items.filter((elements) => {
          return elements !== null;
        });
        res.success({ itemsAdded });
      });
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
    try {
      let cartItem = await CartItems.findByPk(req.params.cartItemId);

      if (cartItem) {
        cartItem.quantity = req.body.quantity;

        if (cartItem.quantity == 0) {
          await cartItem.destroy();
          res.success({ message: "Cart Item removed" });
        } else {
          await cartItem.save();
          res.success({ cartItem });
        }
      } else {
        res.internalError(new Error("Cart Item not found"));
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
