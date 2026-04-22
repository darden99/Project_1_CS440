const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "task_db",
  password: process.env.DB_PASSWORD || "REDACTED_PASSWORD",
  port: process.env.DB_PORT || 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Task DB connection failed:", err);
  } else {
    console.log("Task DB connected:", res.rows[0].now);
  }
});

module.exports = pool;