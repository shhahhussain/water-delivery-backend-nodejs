"use strict";
const table = "user_coupons";
module.exports = (sequelize, DataTypes) => {
  const UserCoupon = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    avaliable_leaves: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 1,
    },
  });

  UserCoupon.associate = (models) => {
    UserCoupon.belongsTo(models.Users, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    UserCoupon.belongsTo(models.CouponBooks, {
      foreignKey: "coupon_book_id",
      onDelete: "CASCADE",
    });
  };

  return UserCoupon;
};
