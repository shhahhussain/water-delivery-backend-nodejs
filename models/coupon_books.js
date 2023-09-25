"use strict";
const table = "coupon_books";
module.exports = (sequelize, DataTypes) => {
  const CouponBook = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    leaves: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    coupon_book_id: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    rate_per_leaf: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
  });

  CouponBook.associate = (models) => {
    CouponBook.belongsTo(models.Products, {
      foreignKey: "product_id",
      primaryKey: true,
      as: "productID",
      onDelete: "CASCADE",
    });
    CouponBook.belongsTo(models.Products, {
      foreignKey: "applicable_product_id",
      as: "applicable_productID",
      onDelete: "CASCADE",
    });
    CouponBook.hasMany(models.UserCoupons, {
      foreignKey: "coupon_book_id",
      onDelete: "CASCADE",
    });
  };

  return CouponBook;
};
