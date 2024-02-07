const Department = require("../models/department");
const logger = require("../config/logger");

const DepartmentController = {
  async getAllDepartments(req, res) {
    try {
      const departments = await Department.findAll();
      res.status(200).json(departments);
      logger.info("Fetched all departments");
    } catch (error) {
      logger.error(`Error fetching departments: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createDepartment(req, res) {
    try {
      const newDepartment = await Department.create(req.body);
      res.status(201).json(newDepartment);
    } catch (error) {
      logger.error(`Error creating department: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async getDepartmentById(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);
      if (department) {
        res.status(200).json(department);
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch (error) {
      logger.error(`Error fetching department: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async updateDepartment(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);
      if (department) {
        await department.update(req.body);
        res.status(200).json({ message: "Department updated successfully" });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch (error) {
      logger.error(`Error updating department: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async deleteDepartment(req, res) {
    try {
      const department = await Department.findByPk(req.params.id);
      if (department) {
        await department.destroy();
        res.status(200).json({ message: "Department deleted successfully" });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch (error) {
      logger.error(`Error deleting department: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = DepartmentController;
