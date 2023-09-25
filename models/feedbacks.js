const table = "user_feedbacks";

module.exports = (sequelize, DataTypes) => {
  const User_feedback = sequelize.define(
    table,
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recoommendation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      starreceived: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
  return User_feedback;
};
