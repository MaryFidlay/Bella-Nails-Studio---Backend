require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import das rotas
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/schedule");
const adminRoutes = require("./routes/admin");

// Middleware de erro
const errorHandler = require("./middleware/error");

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Configura CORS para localhost e Netlify
const allowedOrigins = [
  "http://localhost:3000",
  "https://bella-nails-studio.netlify.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
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
  }

  // Preflight responde OK
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Log de todas as requisições (opcional)
app.use((req, res, next) => {
  console.log("➡️ Requisição recebida:", req.method, req.url);
  console.log("Corpo da requisição:", req.body);
  next();
});

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// Middleware de erro
app.use(errorHandler);

// Conexão com MongoDB
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

startServer();
