"use strict";
const moment = require("moment");
const table = "users";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    no_of_family_members: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

  User.associate = (models) => {

    User.hasMany(models.CartItems, { foreignKey: "user_id" });

    User.hasMany(models.UserAddresses, {
      as: "addresses",
      foreignKey: "userId",
    });
    User.hasMany(models.VerificationCodes, {
      as: "otp",
      foreignKey: "userId",
    });
    User.hasMany(models.PromotionalOffers, {
      as: "promotionalOffers",
      foreignKey: "userId",
    });
    User.hasMany(models.UserFeedbacks, {
      as: "userFeedbacks",
      foreignKey: "userId",
    });
    User.hasOne(models.PrivacyPolicies, {
      as: "privacyPolicy",
      foreignKey: "userId",
    });

  };

  return User;
};
