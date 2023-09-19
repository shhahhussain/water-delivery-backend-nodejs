"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products", [
      {
        name: "water bottle",
        unit_price: "6.99",
        description: "pure water",
        volume: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "water can",
        unit_price: "13.99",
        description: "pure water",
        volume: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pack of 12 water cups",
        unit_price: "1.29",
        description: "cups for water",
        volume: "0.035",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
