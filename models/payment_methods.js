const table = "payment_methods";

module.exports = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define(
    table,
    {
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cvc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      credit_card_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return PaymentMethod;
};
