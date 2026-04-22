const taskRepository = require("../repositories/taskRepository");

exports.getAllTasks = async () => {
  return await taskRepository.findAll();
};

exports.getTaskById = async (id) => {
  return await taskRepository.findById(id);
};

exports.createTask = async (taskData) => {
  const { title, description, status, priority, assigned_to, created_by } = taskData;
  return await taskRepository.create(title, description, status, priority, assigned_to, created_by);
};

exports.updateTask = async (id, taskData) => {
  const task = await taskRepository.findById(id);
  
  if (!task) {
    throw new Error("Task not found");
  }
  
  // Check authorization only creator can update
  if (taskData.user_id && task.created_by !== taskData.user_id) {
    throw new Error("Not authorized");
  }

  return await taskRepository.update(id, taskData);
};

exports.deleteTask = async (id, userId) => {
  const task = await taskRepository.findById(id);
  
  if (!task) {
    throw new Error("Task not found");
  }
  
  // Check authorization 
  if (userId && task.created_by !== userId) {
    throw new Error("Not authorized");
  }

  return await taskRepository.remove(id);
};

exports.updateTaskStatus = async (id, status, userId) => {
  const task = await taskRepository.findById(id);
  
  if (!task) {
    throw new Error("Task not found");
  }

  return await taskRepository.updateStatus(id, status);
};

exports.getTasksByUser = async (userId) => {
  return await taskRepository.findByUser(userId);
};