"use strict";
const table = "verification_codes";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(table, "expiresAt", {
      type: Sequelize.DATE,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(table, "expiresAt");
  },
};
