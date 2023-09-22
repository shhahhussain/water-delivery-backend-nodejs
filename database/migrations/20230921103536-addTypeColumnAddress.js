"use strict";
const table = "user_addresses";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(table, "type", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Home",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(table, "type");
  },
};
