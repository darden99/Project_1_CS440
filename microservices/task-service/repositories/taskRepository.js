const pool = require("../config/database");

const fetch = require('node-fetch');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:3003";

// Helper function to fetch usernames
async function fetchUsernames(userIds) {
  if (!userIds || userIds.length === 0) return {};
  
  try {
    const response = await fetch(`${USER_SERVICE_URL}/api/users/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: userIds })
    });
    
    if (!response.ok) return {};
    
    const users = await response.json();
    const userMap = {};
    users.forEach(user => {
      userMap[user.user_id] = user.username;
    });
    return userMap;
  } catch (err) {
    console.error('Error fetching usernames:', err);
    return {};
  }
}

exports.findAll = async () => {
  const result = await pool.query(
    `SELECT * FROM tasks ORDER BY id DESC`
  );
  
  const tasks = result.rows;
  
  // Get unique user IDs
  const userIds = [...new Set(tasks.map(t => t.created_by).filter(Boolean))];
  
  // Fetch usernames
  const userMap = await fetchUsernames(userIds);
  
  // Add usernames to tasks
  tasks.forEach(task => {
    task.username = userMap[task.created_by] || 'Unknown';
  });
  
  return tasks;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

exports.create = async (title, description, status, priority, assigned_to, created_by) => {
  const result = await pool.query(
    `INSERT INTO tasks(title, description, status, priority, assigned_to, created_by, created_at, updated_at) 
     VALUES($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
     RETURNING *`,
    [title, description, status, priority, assigned_to, created_by]
  );
  return result.rows[0];
};

exports.update = async (id, taskData) => {
  const { title, description, status, priority, assigned_to } = taskData;
  
  const result = await pool.query(
    `UPDATE tasks 
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         status = COALESCE($3, status),
         priority = COALESCE($4, priority),
         assigned_to = COALESCE($5, assigned_to),
         updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [title, description, status, priority, assigned_to, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return true;
};

exports.updateStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE tasks 
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

exports.findByUser = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM tasks 
     WHERE created_by = $1 OR assigned_to = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};
