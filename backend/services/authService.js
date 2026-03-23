const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");

exports.registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(username, hashedPassword);
  
  delete user.password;
  return user;
};

exports.authenticateUser = async (username, password) => {
  const user = await userRepository.findByUsername(username);
  
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  return { id: user.id, username: user.username };
};