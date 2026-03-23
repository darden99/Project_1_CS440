const authService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await authService.registerUser(username, password);
    res.status(201).json(user);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: err.message || "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await authService.authenticateUser(username, password);
    res.json(user);
  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json({ error: err.message || "Login failed" });
  }
};