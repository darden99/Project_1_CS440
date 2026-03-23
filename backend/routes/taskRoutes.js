const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", (req, res) => taskController.getAllTasks(req, res));
router.post("/tasks", (req, res) => taskController.createTask(req, res));
router.put("/tasks/:id", (req, res) => taskController.updateTask(req, res));
router.delete("/tasks/:id", (req, res) => taskController.deleteTask(req, res));

module.exports = router;
