const table = "promotionalOffers";

module.exports = (sequelize, DataTypes) => {
  const Promotional_offer = sequelize.define(
    table,
    {
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
