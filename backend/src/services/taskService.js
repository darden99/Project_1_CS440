const taskRepository = require("../repositories/taskRepository");

async function getTasks() {
  return await taskRepository.getAllTasks();
}

async function addTask(title, description, userId) {
  if (!title || !title.trim()) {
    throw new Error("Task title is required");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  return await taskRepository.createTask(title.trim(), description || "", userId);
}

async function updateTask(id, title, description, userId) {
  if (!title || !title.trim()) {
    throw new Error("Task title is required");
  }

  const task = await taskRepository.getTaskById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.user_id !== Number(userId)) {
    throw new Error("Unauthorized");
  }

  return await taskRepository.updateTask(id, title.trim(), description || "");
}

async function deleteTask(id, userId) {
  const task = await taskRepository.getTaskById(id);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.user_id !== Number(userId)) {
    throw new Error("Unauthorized");
  }

  await taskRepository.deleteTask(id);

  return { message: "Task deleted successfully" };
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};