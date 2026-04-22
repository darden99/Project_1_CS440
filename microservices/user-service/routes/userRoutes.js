const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /api/users - Get all users
router.get("/", userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get("/:id", userController.getUserById);

// PUT /api/users/:id - Update user profile
router.put("/:id", userController.updateUser);

// GET /api/users/search?q= - Search users
router.get("/search", userController.searchUsers);

// POST /api/users/batch - Get multiple users by IDs
router.post("/batch", userController.getBatchUsers);

module.exports = router;