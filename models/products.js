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
  });

  Product.associate = (models) => {
    Product.hasMany(models.CartItems, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
