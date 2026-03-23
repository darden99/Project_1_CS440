const authService = require("../services/authService");

async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const user = await authService.signup(username, password);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await authService.login(username, password);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  signup,
  login,
};