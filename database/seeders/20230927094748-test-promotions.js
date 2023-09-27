"use strict";

let table = "promotions";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table, [
      {
        discount: 20,
        promo_code: "HJJ20",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        discount: 25,
        promo_code: "HEJ25",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        discount: 75,
        promo_code: "NEWYEAR24",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  },
};
