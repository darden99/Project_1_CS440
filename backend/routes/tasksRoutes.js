const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// GET /api/v1/tasks
router.get("/", taskController.getAllTasks);

// POST /api/v1/tasks
router.post("/", taskController.createTask);

// GET /api/v1/tasks/:id
router.get("/:id", taskController.getTaskById);

// PUT /api/v1/tasks/:id
router.put("/:id", taskController.updateTask);

// DELETE /api/v1/tasks/:id
router.delete("/:id", taskController.deleteTask);

module.exports = router;