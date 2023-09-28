const table = "payment_methods";

module.exports = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define(
    table,
    {
      payment_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  PaymentMethod.associate = (models) => {
    PaymentMethod.hasMany(models.Orders, { foreignKey: "paymentMethodId" });
  };
  return PaymentMethod;
};
