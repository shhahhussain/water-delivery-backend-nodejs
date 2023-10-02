"use strict";
const table = "orders";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex(table, ["userId"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex(table, ["userId"]);
  },
};
