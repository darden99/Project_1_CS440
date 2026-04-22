const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// GET /api/tasks - Get all tasks
router.get("/", taskController.getAllTasks);

// POST /api/tasks - Create new task
router.post("/", taskController.createTask);

// GET /api/tasks/:id - Get task by ID
router.get("/:id", taskController.getTaskById);

// PUT /api/tasks/:id - Update task
router.put("/:id", taskController.updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete("/:id", taskController.deleteTask);

// PATCH /api/tasks/:id/status - Update task status
router.patch("/:id/status", taskController.updateTaskStatus);

// GET /api/tasks/user/:userId - Get tasks by user
router.get("/user/:userId", taskController.getTasksByUser);

module.exports = router;
