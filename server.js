require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Import das rotas
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/schedule");
const adminRoutes = require("./routes/admin");

// Middleware de erro
const errorHandler = require("./middleware/error");

const app = express();

// -------------------------
// Middleware para parse JSON
// -------------------------
app.use(express.json());

// -------------------------
// Middleware CORS
// -------------------------
const allowedOrigins = [
  "http://localhost:3000", // frontend local
  "https://bella-nails-studio.netlify.app" // frontend deploy
];

app.use((req, res, next) => {
  let origin = req.headers.origin;
  if (origin) origin = origin.replace(/\/$/, ""); // remove trailing slash

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else if (origin) {
    console.warn("❌ CORS blocked request from origin:", origin);
  }

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// -------------------------
// Rota para favicon
// -------------------------
app.get("/favicon.ico", (req, res) => res.status(204).end());

// -------------------------
// Logging Middleware
// -------------------------
app.use((req, res, next) => {
  console.log(`➡️ Request: ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length) {
    console.log("📦 Request body:", req.body);
  }
  next();
});

// -------------------------
// Rota de teste
// -------------------------
app.get("/ping", (req, res) => {
  console.log("🏓 Ping received");
  res.send("pong");
});

// -------------------------
// Rotas API
// -------------------------
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// -------------------------
// Middleware de erro
// -------------------------
app.use(errorHandler);

// -------------------------
// Conexão MongoDB e inicialização do servidor
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
