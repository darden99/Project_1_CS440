const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "24h";

exports.registerUser = async (username, password, email) => {
  // Check if user already exists
  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    throw new Error("Username already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const user = await userRepository.createUser(username, hashedPassword, email);
  
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    token
  };
};

exports.loginUser = async (username, password) => {
  // Find user
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new Error("Invalid username or password");
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    token
  };
};

exports.validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};