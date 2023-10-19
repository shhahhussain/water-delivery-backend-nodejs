"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a unique constraint to the combination of product_id and user_id
    await queryInterface.addConstraint("cart_items", {
      fields: ["product_id", "user_id"],
      type: "unique",
      name: "unique_product_user_combination",
      // (Optional) Define a custom error message
      message: "The combination of product_id and user_id must be unique.",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint
    await queryInterface.removeConstraint(
      "cart_items",
      "unique_product_user_combination"
    );
  },
};
