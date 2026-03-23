const taskService = require("../services/taskService");

async function getTasks(req, res) {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function addTask(req, res) {
  try {
    const { title, description, user_id } = req.body;
    const task = await taskService.addTask(title, description, user_id);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, user_id } = req.body;
    const updatedTask = await taskService.updateTask(id, title, description, user_id);
    res.json(updatedTask);
  } catch (err) {
    if (err.message === "Task not found") {
      return res.status(404).json({ error: err.message });
    }

    if (err.message === "Unauthorized") {
      return res.status(403).json({ error: err.message });
    }

    res.status(400).json({ error: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const result = await taskService.deleteTask(id, user_id);
    res.json(result);
  } catch (err) {
    if (err.message === "Task not found") {
      return res.status(404).json({ error: err.message });
    }

    if (err.message === "Unauthorized") {
      return res.status(403).json({ error: err.message });
    }

    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};