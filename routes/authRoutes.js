const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);

module.exports = router;