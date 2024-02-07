const express = require("express");
const router = express.Router();
const BonusController = require("../controllers/bonusController");
const authenticate = require("../middlewares/authenticate");

router.get("/bonuses", authenticate, BonusController.getAllBonuses);
router.post("/bonuses", authenticate, BonusController.createBonus);
router.get("/bonuses/:id", authenticate, BonusController.getBonusById);
router.put("/bonuses/:id", authenticate, BonusController.updateBonus);
router.delete("/bonuses/:id", authenticate, BonusController.deleteBonus);

module.exports = router;
