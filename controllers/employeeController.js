const { Department, Employee } = require("../models");
const logger = require("../config/logger");

const EmployeeController = {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.findAll({
        include: [
          {
            model: Department,
            as: "department",
          },
        ],
      });
      res.status(200).json(employees);
      logger.info("Fetched all employees");
    } catch (error) {
      logger.error(`Error fetching employees: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createEmployee(req, res) {
    try {
      const newEmployee = await Employee.create(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      logger.error(`Error creating employee: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id, {
        include: [
          {
            model: Department,
            as: "department",
          },
        ],
      });
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      logger.error(`Error fetching employee: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async updateEmployee(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.update(req.body);
        res.status(200).json({ message: "Employee updated successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      logger.error(`Error updating employee: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async deleteEmployee(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.destroy();
        res.status(200).json({ message: "Employee deleted successfully" });
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      logger.error(`Error deleting employee: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = EmployeeController;
