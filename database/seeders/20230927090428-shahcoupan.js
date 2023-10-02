"use strict";

let table = "user_coupons";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(table, [
      {
        coupon_book_id: 19,
        quantity: 10,
        user_id: 27,
        avaliable_leaves: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        coupon_book_id: 20,
        quantity: 10,
        user_id: 27,
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
