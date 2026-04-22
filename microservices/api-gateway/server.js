const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3001";
const TASK_SERVICE_URL = process.env.TASK_SERVICE_URL || "http://localhost:3002";
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:3003";

app.use(cors());

app.use("/api/auth", createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  changeOrigin: true,
  logLevel: 'debug'
}));

app.use("/api/tasks", createProxyMiddleware({
  target: TASK_SERVICE_URL,
  changeOrigin: true,
  logLevel: 'debug'
}));

app.use("/api/users", createProxyMiddleware({
  target: USER_SERVICE_URL,
  changeOrigin: true,
  logLevel: 'debug'
}));


app.get("/health", (req, res) => {
  res.json({ 
    service: "api-gateway", 
    status: "OK", 
    port: PORT,
    services: {
      auth: AUTH_SERVICE_URL,
      task: TASK_SERVICE_URL,
      user: USER_SERVICE_URL
    }
  });
});

app.use(express.static(path.join(__dirname, "frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Proxying:`);
  console.log(`  /api/auth -> ${AUTH_SERVICE_URL}`);
  console.log(`  /api/tasks -> ${TASK_SERVICE_URL}`);
  console.log(`  /api/users -> ${USER_SERVICE_URL}`);
});