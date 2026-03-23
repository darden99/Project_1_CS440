const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/v1/auth/signup
router.post("/signup", authController.signup);

// POST /api/v1/auth/login
router.post("/login", authController.login);

module.exports = router;
