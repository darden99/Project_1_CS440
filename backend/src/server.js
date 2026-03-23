const app = require("./app");
const pool = require("./db/pool");

const PORT = 3000;

pool
  .query("SELECT NOW()")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });