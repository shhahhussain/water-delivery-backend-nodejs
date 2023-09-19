"use strict";

const table = "coupon_books";

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      leaves: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      coupon_book_id: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      rate_per_leaf: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      applicable_product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable(table);
  },
};
