const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");
const authenticate = require("../middlewares/authenticate");

router.get("/employees", authenticate, EmployeeController.getAllEmployees);
router.post("/employees", authenticate, EmployeeController.createEmployee);
router.get("/employees/:id", authenticate, EmployeeController.getEmployeeById);
router.put("/employees/:id", authenticate, EmployeeController.updateEmployee);
router.delete(
  "/employees/:id",
  authenticate,
  EmployeeController.deleteEmployee
);

module.exports = router;
