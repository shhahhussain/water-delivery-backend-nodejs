const table = "promotions";

module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    table,
    {
      discount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      promo_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Promotion;
};
