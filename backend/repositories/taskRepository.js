const pool = require("../config/database");

exports.findAll = async () => {
  const result = await pool.query(
    `SELECT tasks.id, tasks.title, tasks.description, tasks.user_id, users.username
     FROM tasks 
     LEFT JOIN users ON tasks.user_id = users.id
     ORDER BY tasks.id`
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    `SELECT tasks.id, tasks.title, tasks.description, tasks.user_id, users.username
     FROM tasks 
     LEFT JOIN users ON tasks.user_id = users.id
     WHERE tasks.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async (title, description, userId) => {
  const result = await pool.query(
    "INSERT INTO tasks(title, description, user_id) VALUES($1, $2, $3) RETURNING *",
    [title, description, userId]
  );
  return result.rows[0];
};

exports.update = async (id, title, description) => {
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
    [title, description, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return true;
};