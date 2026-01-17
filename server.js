// server.js
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

// Configuração de CORS
const allowedOrigins = [
  "http://localhost:3000", // frontend local
  "https://bella-nails-studio.netlify.app", // frontend Netlify
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

  if (req.method === "OPTIONS") {
    console.log(`🌐 Preflight request (OPTIONS) para ${req.url} respondido`);
    return res.sendStatus(204);
  }

  next();
});

// Rota de teste
app.get("/ping", (req, res) => {
  console.log("🏓 Ping recebido");
  res.send("pong");
});

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`➡️ Requisição recebida: ${req.method} ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log("📦 Corpo da requisição:", req.body);
  }
  next();
});

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Conexão com MongoDB e start do servidor
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("✅ MongoDB conectado");

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server rodando na porta ${port}`);
    });
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err);
  }
};

startServer();
