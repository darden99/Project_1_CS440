const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const result = await authService.registerUser(username, password, email);
    res.status(201).json(result);
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json({ error: err.message || "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const result = await authService.loginUser(username, password);
    res.json(result);
  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json({ error: err.message || "Login failed" });
  }
};

exports.validateToken = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: "Token required" });
    }

    const decoded = await authService.validateToken(token);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    console.error("Validation error:", err);
    res.status(401).json({ valid: false, error: "Invalid token" });
  }
};