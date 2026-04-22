const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Health check
app.get("/health", (req, res) => {
  res.json({ service: "auth-service", status: "OK", port: PORT });
});

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
