const table = "orders";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    table,
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      delivery: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
      },
      total: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  Order.associate = (models) => {
    Order.hasMany(models.OrderItems, {
      foreignKey: "orderItemsId",
      onDelete: "CASCADE",
    });
    Order.belongsTo(models.PaymentMethods, {
      foreignKey: "paymentMethodId",
      onDelete: "CASCADE",
    });
  };
  return Order;
};
