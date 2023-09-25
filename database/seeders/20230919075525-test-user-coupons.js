"use strict";

let table = "user_coupons";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table, [
      {
        coupon_book_id: 1,
        quantity: 3,
        user_id: 4,
        avaliable_leaves: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        coupon_book_id: 2,
        quantity: 3,
        user_id: 11,
        avaliable_leaves: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  },
};
