"use strict";
const table = "products";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    unit_price: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
    volume: {
      type: DataTypes.DECIMAL(7, 3),
    },
    is_coupon: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Product.associate = (models) => {

    Product.hasMany(models.Favorites, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.CartItems, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });

    Product.hasOne(models.CouponBooks, {
      foreignKey: "product_id",
      as: "productID",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.CouponBooks, {
      foreignKey: "applicable_product_id",
      as: "applicable_productId",
      onDelete: "CASCADE",
    });

  };

  return Product;
};
