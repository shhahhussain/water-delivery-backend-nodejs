"use strict";
const table = "order_items";

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(table, {
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

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    OrderItem.belongsTo(models.Products, {
      foreignKey: "productId",
      onDelete: "CASCADE",
    });
    OrderItem.belongsTo(models.Orders, {
      foreignKey: "orderId",
      onDelete: "CASCADE",
    });
  };

  return OrderItem;
};
