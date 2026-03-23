const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tasksDB",
  password: "REDACTED_PASSWORD",
  port: 5432,
});

// Test connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("DB connection failed:", err);
  else console.log("DB connected:", res.rows[0]);
});

module.exports = pool;
