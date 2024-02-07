const { Tax, Employee } = require("../models");
const logger = require("../config/logger");

const TaxController = {
  async getAllTaxes(req, res) {
    try {
      const taxes = await Tax.findAll({
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      res.status(200).json(taxes);
      logger.info("Fetched all tax records");
    } catch (error) {
      logger.error(`Error fetching tax records: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createTax(req, res) {
    try {
      const newTax = await Tax.create(req.body);
      res.status(201).json(newTax);
    } catch (error) {
      logger.error(`Error creating tax record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async getTaxById(req, res) {
    try {
      const tax = await Tax.findByPk(req.params.id, {
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      if (tax) {
        res.status(200).json(tax);
      } else {
        res.status(404).json({ message: "Tax record not found" });
      }
    } catch (error) {
      logger.error(`Error fetching tax record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async updateTax(req, res) {
    try {
      const tax = await Tax.findByPk(req.params.id);
      if (tax) {
        await tax.update(req.body);
        res.status(200).json({ message: "Tax record updated successfully" });
      } else {
        res.status(404).json({ message: "Tax record not found" });
      }
    } catch (error) {
      logger.error(`Error updating tax record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async deleteTax(req, res) {
    try {
      const tax = await Tax.findByPk(req.params.id);
      if (tax) {
        await tax.destroy();
        res.status(200).json({ message: "Tax record deleted successfully" });
      } else {
        res.status(404).json({ message: "Tax record not found" });
      }
    } catch (error) {
      logger.error(`Error deleting tax record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = TaxController;
