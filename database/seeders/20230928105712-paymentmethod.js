"use strict";
const table = "payment_methods";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table, [
      {
        payment_method: "Cash on Delivery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        payment_method: "Credit Card",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  },
};
