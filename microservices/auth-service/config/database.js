const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "auth_db",
  password: process.env.DB_PASSWORD || "REDACTED_PASSWORD",
  port: process.env.DB_PORT || 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Auth DB connection failed:", err);
  } else {
    console.log("Auth DB connected:", res.rows[0].now);
  }
});

module.exports = pool;