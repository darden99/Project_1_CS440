const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

// Health check
app.get("/health", (req, res) => {
  res.json({ service: "task-service", status: "OK", port: PORT });
});

// Routes
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Task Service running on port ${PORT}`);
});