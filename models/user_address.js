const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User_address = sequelize.define(
    "user_addresses",
    {
      apartmentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  User_address.associate = (models) => {
    User_address.belongsTo(models.Users, {
      foreignKey: "userId",
    });
  };

  return User_address;
};
