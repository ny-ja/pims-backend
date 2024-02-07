const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { validateUserCreation } = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.get("/users", authenticate, UserController.getAllUsers);
router.post(
  "/users",
  authenticate,
  validateUserCreation,
  UserController.createUser
);
router.get("/users/:id", authenticate, UserController.getUserById);
router.put("/users/:id", authenticate, UserController.updateUser);
router.delete("/users/:id", authenticate, UserController.deleteUser);

module.exports = router;
