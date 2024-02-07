const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Payroll = sequelize.define(
  "Payroll",
  {
    employeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    periodStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    periodEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    grossSalary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    netSalary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {}
);

module.exports = Payroll;
