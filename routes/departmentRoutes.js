const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/departmentController");
const authenticate = require("../middlewares/authenticate");

router.get(
  "/departments",
  authenticate,
  DepartmentController.getAllDepartments
);
router.post(
  "/departments",
  authenticate,
  DepartmentController.createDepartment
);
router.get(
  "/departments/:id",
  authenticate,
  DepartmentController.getDepartmentById
);
router.put(
  "/departments/:id",
  authenticate,
  DepartmentController.updateDepartment
);
router.delete(
  "/departments/:id",
  authenticate,
  DepartmentController.deleteDepartment
);

module.exports = router;
