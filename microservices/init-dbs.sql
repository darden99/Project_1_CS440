-- Create databases
CREATE DATABASE auth_db;
CREATE DATABASE task_db;
CREATE DATABASE user_db;

-- Connect to auth_db and create tables
\c auth_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
);

-- Connect to task_db and create tables
\c task_db;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to INTEGER,
    created_by INTEGER NOT NULL,
);

-- Connect to user_db and create tables
\c user_db;

CREATE TABLE user_profiles (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
);