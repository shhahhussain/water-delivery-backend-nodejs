const table = "verification_codes";

module.exports = (sequelize, DataTypes) => {
  const Verification_code = sequelize.define(
    table,
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
    }
  );
  return Verification_code;
};
