"use strict";
const table = "favorites";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "id",
    });
    Favorite.belongsTo(models.Products, {
      foreignKey: "product_id",
      targetKey: "id",
    });
  };

  return Favorite;
};
