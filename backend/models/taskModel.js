const pool = require("./database");

const taskModel = {
  async getAllTasks() {
    const result = await pool.query(
      `SELECT tasks.id, tasks.title, tasks.description, tasks.user_id, users.username
       FROM tasks LEFT JOIN users ON tasks.user_id = users.id
       ORDER BY tasks.id`
    );
    return result.rows;
  },

  async createTask(title, description, user_id) {
    const result = await pool.query(
      "INSERT INTO tasks(title, description, user_id) VALUES($1,$2,$3) RETURNING *",
      [title, description, user_id]
    );
    return result.rows[0];
  },

  async getTaskById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    return result.rows[0];
  },

  async updateTask(id, title, description) {
    const result = await pool.query(
      "UPDATE tasks SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );
    return result.rows[0];
  },

  async deleteTask(id) {
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    return { success: true };
  }
};

module.exports = taskModel;
