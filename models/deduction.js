const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Deduction = sequelize.define(
  "Deduction",
  {
    employeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    deductionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deductionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {}
);

module.exports = Deduction;
