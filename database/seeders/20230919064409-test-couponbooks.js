"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("coupon_books", [
      {
        coupon_book_id: "D-100",
        leaves: 10,
        rate_per_leaf: 2.5,
        product_id: 9,
        applicable_product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        coupon_book_id: "C-500-12",
        leaves: 15,
        rate_per_leaf: 1.8,
        product_id: 8,
        applicable_product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        coupon_book_id: "C-500-13",
        leaves: 12,
        rate_per_leaf: 2.0,
        applicable_product_id: 3,
        product_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("coupon_books", null, {});
  },
};
