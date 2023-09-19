"use strict";
const table = "cart_items";
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Users, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    CartItem.belongsTo(models.Products, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
  };

  return CartItem;
};
