const { Bonus, Employee } = require("../models");
const logger = require("../config/logger");

const BonusController = {
  async getAllBonuses(req, res) {
    try {
      const bonuses = await Bonus.findAll({
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      res.status(200).json(bonuses);
      logger.info("Fetched all bonus records");
    } catch (error) {
      logger.error(`Error fetching bonus records: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createBonus(req, res) {
    try {
      const newBonus = await Bonus.create(req.body);
      res.status(201).json(newBonus);
    } catch (error) {
      logger.error(`Error creating bonus record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async getBonusById(req, res) {
    try {
      const bonus = await Bonus.findByPk(req.params.id, {
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      if (bonus) {
        res.status(200).json(bonus);
      } else {
        res.status(404).json({ message: "Bonus record not found" });
      }
    } catch (error) {
      logger.error(`Error fetching bonus record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async updateBonus(req, res) {
    try {
      const bonus = await Bonus.findByPk(req.params.id);
      if (bonus) {
        await bonus.update(req.body);
        res.status(200).json({ message: "Bonus record updated successfully" });
      } else {
        res.status(404).json({ message: "Bonus record not found" });
      }
    } catch (error) {
      logger.error(`Error updating bonus record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async deleteBonus(req, res) {
    try {
      const bonus = await Bonus.findByPk(req.params.id);
      if (bonus) {
        await bonus.destroy();
        res.status(200).json({ message: "Bonus record deleted successfully" });
      } else {
        res.status(404).json({ message: "Bonus record not found" });
      }
    } catch (error) {
      logger.error(`Error deleting bonus record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = BonusController;
