const taskService = require("../services/taskService");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ error: "Failed to get tasks" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    
    res.json(task);
  } catch (err) {
    console.error("Get task error:", err);
    res.status(500).json({ error: "Failed to get task" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    
    if (!title || !user_id) {
      return res.status(400).json({ error: "Title and user_id required" });
    }

    const task = await taskService.createTask(title, description, user_id);
    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(400).json({ error: "Failed to create task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, user_id } = req.body;

    const task = await taskService.updateTask(id, title, description, user_id);
    res.json(task);
  } catch (err) {
    console.error("Update task error:", err);
    
    if (err.message === "Task not found") {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === "Not authorized") {
      return res.status(403).json({ error: err.message });
    }
    
    res.status(400).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    await taskService.deleteTask(id, user_id);
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    console.error("Delete task error:", err);
    
    if (err.message === "Task not found") {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === "Not authorized") {
      return res.status(403).json({ error: err.message });
    }
    
    res.status(400).json({ error: "Failed to delete task" });
  }
};