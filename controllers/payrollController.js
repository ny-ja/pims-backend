const { Payroll, Employee } = require("../models");
const logger = require("../config/logger");

const PayrollController = {
  async getAllPayrolls(req, res) {
    try {
      const payrolls = await Payroll.findAll({
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      res.status(200).json(payrolls);
      logger.info("Fetched all payroll records");
    } catch (error) {
      logger.error(`Error fetching payroll records: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createPayroll(req, res) {
    try {
      const newPayroll = await Payroll.create(req.body);
      res.status(201).json(newPayroll);
    } catch (error) {
      logger.error(`Error creating payroll record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async getPayrollById(req, res) {
    try {
      const payroll = await Payroll.findByPk(req.params.id, {
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      if (payroll) {
        res.status(200).json(payroll);
      } else {
        res.status(404).json({ message: "Payroll record not found" });
      }
    } catch (error) {
      logger.error(`Error fetching payroll record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async updatePayroll(req, res) {
    try {
      const payroll = await Payroll.findByPk(req.params.id);
      if (payroll) {
        await payroll.update(req.body);
        res
          .status(200)
          .json({ message: "Payroll record updated successfully" });
      } else {
        res.status(404).json({ message: "Payroll record not found" });
      }
    } catch (error) {
      logger.error(`Error updating payroll record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async deletePayroll(req, res) {
    try {
      const payroll = await Payroll.findByPk(req.params.id);
      if (payroll) {
        await payroll.destroy();
        res
          .status(200)
          .json({ message: "Payroll record deleted successfully" });
      } else {
        res.status(404).json({ message: "Payroll record not found" });
      }
    } catch (error) {
      logger.error(`Error deleting payroll record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = PayrollController;
