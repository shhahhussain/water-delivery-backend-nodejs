"use strict";
const table = "users";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(table, "is_verified", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(table, "is_verified");
  },
};
