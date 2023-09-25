const table = "promotional_offers";

module.exports = (sequelize, DataTypes) => {
  const Promotional_offer = sequelize.define(
    table,
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      discount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      promocode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Promotional_offer;
};
