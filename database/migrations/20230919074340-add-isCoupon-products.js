"use strict";
const table = "products";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(table, "is_coupon", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(table, "is_coupon");
  },
};
