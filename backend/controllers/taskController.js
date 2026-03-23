const taskModel = require("../models/taskModel");

const taskController = {
  // Get all tasks
  async getAllTasks(req, res) {
    try {
      const tasks = await taskModel.getAllTasks();
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to get tasks" });
    }
  },

  // Create task
  async createTask(req, res) {
    const { title, description, user_id } = req.body;
    try {
      const task = await taskModel.createTask(title, description, user_id);
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to add task" });
    }
  },

  // Update task
  async updateTask(req, res) {
    const { id } = req.params;
    const { title, description, user_id } = req.body;
    try {
      const task = await taskModel.getTaskById(id);
      if (!task) return res.status(404).json({ error: "Task not found" });
      if (task.user_id !== user_id)
        return res.status(403).json({ error: "Not allowed" });

      const updated = await taskModel.updateTask(id, title, description);
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to edit task" });
    }
  },

  // Delete task
  async deleteTask(req, res) {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
      const task = await taskModel.getTaskById(id);
      if (!task) return res.status(404).json({ error: "Task not found" });
      if (task.user_id !== user_id)
        return res.status(403).json({ error: "Not allowed" });

      await taskModel.deleteTask(id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to delete task" });
    }
  }
};

module.exports = taskController;
