const { Attendance, Employee } = require("../models");
const logger = require("../config/logger");

const AttendanceController = {
  async getAllAttendances(req, res) {
    try {
      const attendances = await Attendance.findAll({
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      res.status(200).json(attendances);
      logger.info("Fetched all attendance records");
    } catch (error) {
      logger.error(`Error fetching attendance records: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createAttendance(req, res) {
    try {
      const newAttendance = await Attendance.create(req.body);
      res.status(201).json(newAttendance);
    } catch (error) {
      logger.error(`Error creating attendance record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async getAttendanceById(req, res) {
    try {
      const attendance = await Attendance.findByPk(req.params.id, {
        include: [
          {
            model: Employee,
            as: "employee",
          },
        ],
      });
      if (attendance) {
        res.status(200).json(attendance);
      } else {
        res.status(404).json({ message: "Attendance record not found" });
      }
    } catch (error) {
      logger.error(`Error fetching attendance record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async updateAttendance(req, res) {
    try {
      const attendance = await Attendance.findByPk(req.params.id);
      if (attendance) {
        await attendance.update(req.body);
        res
          .status(200)
          .json({ message: "Attendance record updated successfully" });
      } else {
        res.status(404).json({ message: "Attendance record not found" });
      }
    } catch (error) {
      logger.error(`Error updating attendance record: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  },

  async deleteAttendance(req, res) {
    try {
      const attendance = await Attendance.findByPk(req.params.id);
      if (attendance) {
        await attendance.destroy();
        res
          .status(200)
          .json({ message: "Attendance record deleted successfully" });
      } else {
        res.status(404).json({ message: "Attendance record not found" });
      }
    } catch (error) {
      logger.error(`Error deleting attendance record: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = AttendanceController;
