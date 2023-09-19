"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("products", [
      {
        name: "Coupon Book 1",
        unit_price: "99.99",
        description: "pure water",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Coupon Book 2",
        unit_price: "13.99",
        description: "pure water",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Coupon Book 3",
        unit_price: "1000",
        description: "cups for water",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
