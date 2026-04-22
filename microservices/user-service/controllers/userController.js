const userService = require("../services/userService");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, bio, avatar_url } = req.body;

    const user = await userService.updateUser(id, {
      full_name,
      bio,
      avatar_url
    });
    
    res.json(user);
  } catch (err) {
    console.error("Update user error:", err);
    
    if (err.message === "User not found") {
      return res.status(404).json({ error: err.message });
    }
    
    res.status(400).json({ error: "Failed to update user" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: "Search query required" });
    }

    const users = await userService.searchUsers(q);
    res.json(users);
  } catch (err) {
    console.error("Search users error:", err);
    res.status(500).json({ error: "Failed to search users" });
  }
};

exports.getBatchUsers = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "Array of user IDs required" });
    }

    const users = await userService.getBatchUsers(ids);
    res.json(users);
  } catch (err) {
    console.error("Get batch users error:", err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};