const taskRepository = require("../repositories/taskRepository");

exports.getAllTasks = async () => {
  return await taskRepository.findAll();
};

exports.getTaskById = async (id) => {
  return await taskRepository.findById(id);
};

exports.createTask = async (title, description, userId) => {
  return await taskRepository.create(title, description, userId);
};

exports.updateTask = async (id, title, description, userId) => {
  const task = await taskRepository.findById(id);
  
  if (!task) {
    throw new Error("Task not found");
  }
  
  if (task.user_id !== userId) {
    throw new Error("Not authorized");
  }

  return await taskRepository.update(id, title, description);
};

exports.deleteTask = async (id, userId) => {
  const task = await taskRepository.findById(id);
  
  if (!task) {
    throw new Error("Task not found");
  }
  
  if (task.user_id !== userId) {
    throw new Error("Not authorized");
  }

  return await taskRepository.remove(id);
};