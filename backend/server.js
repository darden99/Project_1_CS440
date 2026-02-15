const express = require("express");
const app = express();
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..")));

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tasksDB",
  password: "REDACTED_PASSWORD",
  port: 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("DB connection failed:", err);
  else console.log("DB connected:", res.rows[0]);
});

// Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users(username,password) VALUES($1,$2) RETURNING id, username",
      [username, hashed]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: "Signup failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.json({ id: user.id, username: user.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT tasks.id, tasks.title, tasks.description, tasks.user_id, users.username
       FROM tasks LEFT JOIN users ON tasks.user_id = users.id
       ORDER BY tasks.id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get tasks" });
  }
});

// Add task
app.post("/tasks", async (req, res) => {
  const { title, description, user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks(title, description, user_id) VALUES($1,$2,$3) RETURNING *",
      [title, description, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to add task" });
  }
});

// Edit task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, user_id } = req.body;
  try {
    // only allow the owner to edit
    const taskCheck = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    if (!taskCheck.rows.length) return res.status(404).json({ error: "Task not found" });
    if (taskCheck.rows[0].user_id !== user_id)
      return res.status(403).json({ error: "Not allowed" });

    const result = await pool.query(
      "UPDATE tasks SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to edit task" });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    const taskCheck = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    if (!taskCheck.rows.length) return res.status(404).json({ error: "Task not found" });
    if (taskCheck.rows[0].user_id !== user_id)
      return res.status(403).json({ error: "Not allowed" });

    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to delete task" });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
