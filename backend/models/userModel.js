const pool = require("./database");
const bcrypt = require("bcrypt");

const userModel = {
  async createUser(username, password) {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users(username,password) VALUES($1,$2) RETURNING id, username",
      [username, hashed]
    );
    return result.rows[0];
  },

  async findByUsername(username) {
    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    return result.rows[0];
  },

  async verifyPassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
};

module.exports = userModel;
