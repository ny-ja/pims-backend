const express = require("express");
const router = express.Router();
const TaxController = require("../controllers/taxController");
const authenticate = require("../middlewares/authenticate");

router.get("/taxes", authenticate, TaxController.getAllTaxes);
router.post("/taxes", authenticate, TaxController.createTax);
router.get("/taxes/:id", authenticate, TaxController.getTaxById);
router.put("/taxes/:id", authenticate, TaxController.updateTax);
router.delete("/taxes/:id", authenticate, TaxController.deleteTax);

module.exports = router;
