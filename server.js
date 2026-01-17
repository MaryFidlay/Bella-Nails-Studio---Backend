// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/schedule");
const adminRoutes = require("./routes/admin");

// Error handler middleware
const errorHandler = require("./middleware/error");

const app = express();

// -------------------------
// Middleware to parse JSON
// -------------------------
app.use(express.json());

// -------------------------
// Fixed CORS Middleware
// -------------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://bella-nails-studio.netlify.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log("🌐 Incoming request from origin:", origin);

  if (origin && allowedOrigins.some(o => origin === o || origin.startsWith(o))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else if (origin) {
    console.warn("❌ Blocked CORS request from origin:", origin);
  }

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// -------------------------
// Logging Middleware
// -------------------------
app.use((req, res, next) => {
  console.log(`➡️ Request: ${req.method} ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log("📦 Request body:", req.body);
  }
  next();
});

// -------------------------
// Test route
// -------------------------
app.get("/ping", (req, res) => {
  console.log("🏓 Ping received");
  res.send("pong");
});

// -------------------------
// API Routes
// -------------------------
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// -------------------------
// Error Handling Middleware
// -------------------------
app.use(errorHandler);

// -------------------------
// Connect to MongoDB and Start Server
// -------------------------
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
};

startServer();
