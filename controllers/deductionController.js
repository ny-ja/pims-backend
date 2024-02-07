const { Deduction, Employee } = require("../models");
const logger = require("../config/logger");

const DeductionController = {
  async getAllDeductions(req, res) {
    try {
      const deductions = await Deduction.findAll({
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      res.status(200).json(deductions);
      logger.info("Fetched all deduction records");
    } catch (error) {
      logger.error(`Error fetching deduction records: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createDeduction(req, res) {
    try {
      const newDeduction = await Deduction.create(req.body);
      res.status(201).json(newDeduction);
    } catch (error) {
      logger.error(`Error creating deduction record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async getDeductionById(req, res) {
    try {
      const deduction = await Deduction.findByPk(req.params.id, {
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      if (deduction) {
        res.status(200).json(deduction);
      } else {
        res.status(404).json({ message: "Deduction record not found" });
      }
    } catch (error) {
      logger.error(`Error fetching deduction record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async updateDeduction(req, res) {
    try {
      const deduction = await Deduction.findByPk(req.params.id);
      if (deduction) {
        await deduction.update(req.body);
        res
          .status(200)
          .json({ message: "Deduction record updated successfully" });
      } else {
        res.status(404).json({ message: "Deduction record not found" });
      }
    } catch (error) {
      logger.error(`Error updating deduction record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async deleteDeduction(req, res) {
    try {
      const deduction = await Deduction.findByPk(req.params.id);
      if (deduction) {
        await deduction.destroy();
        res
          .status(200)
          .json({ message: "Deduction record deleted successfully" });
      } else {
        res.status(404).json({ message: "Deduction record not found" });
      }
    } catch (error) {
      logger.error(`Error deleting deduction record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = DeductionController;
