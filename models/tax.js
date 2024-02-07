const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tax = sequelize.define(
  "Tax",
  {
    employeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    taxType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    taxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {}
);

module.exports = Tax;
