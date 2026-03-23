const pool = require("../db/pool");

async function findUserByUsername(username) {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  return result.rows[0];
}

async function createUser(username, password) {
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, password",
    [username, password]
  );

  return result.rows[0];
}

module.exports = {
  findUserByUsername,
  createUser,
};