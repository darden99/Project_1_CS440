const pool = require("../config/database");

exports.createUser = async (username, hashedPassword, email) => {
  const result = await pool.query(
    "INSERT INTO users(username, password_hash, email, created_at) VALUES($1, $2, $3, NOW()) RETURNING id, username, email, created_at",
    [username, hashedPassword, email || null]
  );
  return result.rows[0];
};

exports.findByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT id, username, email, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};