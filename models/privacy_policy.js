const table = "privacy_policies";

module.exports = (sequelize, DataTypes) => {
  const Privacy_policy = sequelize.define(
    table,
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Privacy_policy;
};
