const userModel = require("../models/userModel");

const userController = {
  // Handle signup
  async signup(req, res) {
    const { username, password } = req.body;
    try {
      const user = await userModel.createUser(username, password);
      res.json(user);
    } catch (err) {
      console.error("Signup error:", err);
      res.status(400).json({ error: "Signup failed" });
    }
  },

  // Handle login
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await userModel.findByUsername(username);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const match = await userModel.verifyPassword(password, user.password);

      if (!match) {
        return res.status(400).json({ error: "Incorrect password" });
      }

      res.json({ id: user.id, username: user.username });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
};

module.exports = userController;
