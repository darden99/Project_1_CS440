const pool = require("../config/database");

exports.createUser = async (username, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id, username",
    [username, hashedPassword]
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
    "SELECT id, username FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};
