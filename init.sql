-- clear tables if they exist
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT REFERENCES users(id)
);

-- add users
INSERT INTO users (username, password) VALUES
('alice', 'pass'),
('bob',   'pass'),
('carol', 'pass');


--  tasks
INSERT INTO tasks (title, description, user_id) VALUES
('Implement Linked List', 'Create a singly and doubly linked list', 1),
('Binary Search Tree', 'Implement insert, delete, search operations', 1),
('Sorting Algorithms', 'Write and compare bubble, merge, quicksort', 2),
('Hash Table Implementation', 'Implement hash table with collisions', 2),
('Database Schema Design', 'Design normalized schema', 3)
