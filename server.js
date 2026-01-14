// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const authRoutes = require('./routes/auth');
// const appointmentRoutes = require('./routes/schedule');
// const adminRoutes = require('./routes/admin');
// const errorHandler = require('./middleware/error');

// const app = express();

// Middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/admin', adminRoutes);

// Error middleware
// app.use(errorHandler);

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//     console.log('MongoDB connected');
//     app.listen(process.env.PORT || 5000, () => {
//         console.log(`Server running on port ${process.env.PORT || 5000}`);
//     });
// })
// .catch(err => console.error(err));

// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import das rotas
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/schedule");
const adminRoutes = require("./routes/admin");

// Middleware de erro (opcional)
const errorHandler = require("./middleware/error");

const app = express();

// Middleware

app.use(express.json()); // para interpretar JSON nas requisições
app.use(cors({ origin: "http://localhost:3000" })); // permite requests do frontend React

// Log de todas as requisições
app.use((req, res, next) => {
  console.log("➡️ Requisição recebida:", req.method, req.url);
  console.log("Corpo da requisição:", req.body);
  next();
});

app.get("/ping", (req, res) => {
  console.log("Ping received");
  res.send("pong");
});

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Conexão com MongoDB
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // sem opções antigas
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
