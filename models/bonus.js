const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bonus = sequelize.define(
  "Bonus",
  {
    employeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    bonusType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bonusDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {}
);

module.exports = Bonus;
