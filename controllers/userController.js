const bcrypt = require("bcrypt");
const User = require("../models/user");
const logger = require("../config/logger");
const { generateToken } = require("../utils/jwt");

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        where: {
          isAdmin: false,
        },
      });
      res.status(200).json(users);
      logger.info("Fetched all users");
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      res.status(500).json({ message: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      newUser.password = undefined;
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.update(req.body);
        res.status(200).json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async registerUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      newUser.password = undefined;
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async loginUser(req, res) {
    try {
      const user = await User.scope("withPassword").findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed: user not found" });
      }

      if (!req.body.password || !user.password) {
        return res
          .status(401)
          .json({ message: "Authentication failed: missing credentials" });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Authentication failed: incorrect password" });
      }

      const token = generateToken(user);
      res.status(200).json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UserController;
