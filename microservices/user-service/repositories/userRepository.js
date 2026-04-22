const pool = require("../config/database");

exports.findAll = async () => {
  const result = await pool.query(
    `SELECT user_id, username, full_name, bio, avatar_url, created_at 
     FROM user_profiles 
     ORDER BY user_id`
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    `SELECT user_id, username, full_name, bio, avatar_url, created_at 
     FROM user_profiles 
     WHERE user_id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.findByIds = async (ids) => {
  const result = await pool.query(
    `SELECT user_id, username, full_name, bio, avatar_url, created_at 
     FROM user_profiles 
     WHERE user_id = ANY($1::int[])`,
    [ids]
  );
  return result.rows;
};

exports.update = async (id, userData) => {
  const { full_name, bio, avatar_url } = userData;
  
  const result = await pool.query(
    `UPDATE user_profiles 
     SET full_name = COALESCE($1, full_name),
         bio = COALESCE($2, bio),
         avatar_url = COALESCE($3, avatar_url),
         updated_at = NOW()
     WHERE user_id = $4
     RETURNING user_id, username, full_name, bio, avatar_url, created_at`,
    [full_name, bio, avatar_url, id]
  );
  return result.rows[0];
};

exports.search = async (query) => {
  const result = await pool.query(
    `SELECT user_id, username, full_name, bio, avatar_url, created_at 
     FROM user_profiles 
     WHERE username ILIKE $1 OR full_name ILIKE $1
     ORDER BY username`,
    [`%${query}%`]
  );
  return result.rows;
};

exports.createProfile = async (userId, username) => {
  const result = await pool.query(
    `INSERT INTO user_profiles(user_id, username, created_at, updated_at)
     VALUES($1, $2, NOW(), NOW())
     RETURNING user_id, username, full_name, bio, avatar_url, created_at`,
    [userId, username]
  );
  return result.rows[0];
};