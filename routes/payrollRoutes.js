const express = require("express");
const router = express.Router();
const PayrollController = require("../controllers/payrollController");
const authenticate = require("../middlewares/authenticate");

router.get("/payrolls", authenticate, PayrollController.getAllPayrolls);
router.post("/payrolls", authenticate, PayrollController.createPayroll);
router.get("/payrolls/:id", authenticate, PayrollController.getPayrollById);
router.put("/payrolls/:id", authenticate, PayrollController.updatePayroll);
router.delete("/payrolls/:id", authenticate, PayrollController.deletePayroll);

module.exports = router;
