const _ = require("lodash");

const { Products } = require("../models");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const products = await Products.findAll();

      if (_.isEmpty(products)) {
        throw {
          message: "No product found",
          status: 404,
        };
      }
      res.success({ products });
    } catch (error) {
      res.internalError({ message: error.message || "Error finding product" });
    }
  },

  getOneOrder: async (req, res) => {
    try {
      const product = await Products.findOne();
      if (_.isEmpty(product)) {
        throw {
          message: "No product found",
          status: 404,
        };
      }
      res.success({ order });
    } catch (error) {
      res.internalError({ message: error.message || "Error finding product" });
    }
  },
};
