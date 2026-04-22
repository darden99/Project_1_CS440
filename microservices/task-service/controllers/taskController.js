const taskService = require("../services/taskService");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error("Get all tasks error:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
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
    res.status(500).json({ error: "Failed to retrieve task" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, assigned_to, created_by } = req.body;
    
    if (!title || !created_by) {
      return res.status(400).json({ error: "Title and created_by are required" });
    }

    const task = await taskService.createTask({
      title,
      description,
      status: status || 'New',
      priority: priority || 'Medium',
      assigned_to,
      created_by
    });
    
    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(400).json({ error: err.message || "Failed to create task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assigned_to, user_id } = req.body;

    const task = await taskService.updateTask(id, {
      title,
      description,
      status,
      priority,
      assigned_to,
      user_id
    });
    
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

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, user_id } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const task = await taskService.updateTaskStatus(id, status, user_id);
    res.json(task);
  } catch (err) {
    console.error("Update status error:", err);
    
    if (err.message === "Task not found") {
      return res.status(404).json({ error: err.message });
    }
    
    res.status(400).json({ error: "Failed to update task status" });
  }
};

exports.getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await taskService.getTasksByUser(userId);
    res.json(tasks);
  } catch (err) {
    console.error("Get user tasks error:", err);
    res.status(500).json({ error: "Failed to retrieve user tasks" });
  }
};
