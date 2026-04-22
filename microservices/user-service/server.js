const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());

// Health check
app.get("/health", (req, res) => {
  res.json({ service: "user-service", status: "OK", port: PORT });
});

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});