const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");

async function signup(username, password) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const existingUser = await userRepository.findUserByUsername(username);

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser(username, hashedPassword);

  return {
    id: newUser.id,
    username: newUser.username,
  };
}

async function login(username, password) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const user = await userRepository.findUserByUsername(username);

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Incorrect password");
  }

  return {
    id: user.id,
    username: user.username,
  };
}

module.exports = {
  signup,
  login,
};