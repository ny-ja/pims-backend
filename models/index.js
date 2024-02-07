const sequelize = require("../config/database");
const Department = require("./department");
const Employee = require("./employee");
const Payroll = require("./payroll");
const Deduction = require("./deduction");
const Bonus = require("./bonus");
const Tax = require("./tax");
const Attendance = require("./attendance");

// Association between Department and Employee
Department.hasMany(Employee, { foreignKey: "departmentId", as: "employees" });
Employee.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});

// Association between Employee and Payroll
Employee.hasMany(Payroll, { foreignKey: "employeeID", as: "payrolls" });
Payroll.belongsTo(Employee, { foreignKey: "employeeID", as: "employee" });

// Association between Employee and Deduction
Employee.hasMany(Deduction, { foreignKey: "employeeID", as: "deductions" });
Deduction.belongsTo(Employee, { foreignKey: "employeeID", as: "employee" });

// Association between Employee and Bonus
Employee.hasMany(Bonus, { foreignKey: "employeeID", as: "bonuses" });
Bonus.belongsTo(Employee, { foreignKey: "employeeID", as: "employee" });

// Association between Employee and Tax
Employee.hasMany(Tax, { foreignKey: "employeeID", as: "taxes" });
Tax.belongsTo(Employee, { foreignKey: "employeeID", as: "employee" });

// Association between Employee and Attendance
Employee.hasMany(Attendance, { foreignKey: "employeeID", as: "attendances" });
Attendance.belongsTo(Employee, { foreignKey: "employeeID", as: "employee" });

module.exports = {
  sequelize,
  Department,
  Employee,
  Payroll,
  Deduction,
  Bonus,
  Tax,
  Attendance,
};
