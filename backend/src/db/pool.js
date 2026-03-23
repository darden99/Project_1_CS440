const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tasksDB",
  password: "Broncosone1",
  port: 5432,
});

module.exports = pool;