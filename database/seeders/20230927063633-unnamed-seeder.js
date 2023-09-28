"use strict";
const table = "promotionalOffers";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table, [
      {
        promocode: "shah10",
        discount: 10,
        userId: 27,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        promocode: "shah11",
        discount: 11,
        userId: 27,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  },
};
