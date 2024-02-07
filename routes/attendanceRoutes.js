const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/attendanceController");
const authenticate = require("../middlewares/authenticate");

router.get("/attendances", authenticate, AttendanceController.getAllAttendances);
router.post("/attendances", authenticate, AttendanceController.createAttendance);
router.get("/attendances/:id", authenticate, AttendanceController.getAttendanceById);
router.put("/attendances/:id", authenticate, AttendanceController.updateAttendance);
router.delete("/attendances/:id", authenticate, AttendanceController.deleteAttendance);

module.exports = router;
