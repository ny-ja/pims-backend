const express = require("express");
const router = express.Router();
const DeductionController = require("../controllers/deductionController");
const authenticate = require("../middlewares/authenticate");

router.get("/deductions", authenticate, DeductionController.getAllDeductions);
router.post("/deductions", authenticate, DeductionController.createDeduction);
router.get(
  "/deductions/:id",
  authenticate,
  DeductionController.getDeductionById
);
router.put(
  "/deductions/:id",
  authenticate,
  DeductionController.updateDeduction
);
router.delete(
  "/deductions/:id",
  authenticate,
  DeductionController.deleteDeduction
);

module.exports = router;
