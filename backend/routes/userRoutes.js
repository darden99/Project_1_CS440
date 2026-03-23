const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", (req, res) => userController.signup(req, res));
router.post("/login", (req, res) => userController.login(req, res));

module.exports = router;
