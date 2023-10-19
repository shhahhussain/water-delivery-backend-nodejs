"use strict";
const table = "users";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(table, "profile_image", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(table, "profile_image");
  },
};
