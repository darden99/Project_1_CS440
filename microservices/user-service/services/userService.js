const userRepository = require("../repositories/userRepository");

exports.getAllUsers = async () => {
  return await userRepository.findAll();
};

exports.getUserById = async (id) => {
  return await userRepository.findById(id);
};

exports.updateUser = async (id, userData) => {
  const user = await userRepository.findById(id);
  
  if (!user) {
    throw new Error("User not found");
  }

  return await userRepository.update(id, userData);
};

exports.searchUsers = async (query) => {
  return await userRepository.search(query);
};

exports.getBatchUsers = async (ids) => {
  return await userRepository.findByIds(ids);
};