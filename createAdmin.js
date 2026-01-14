require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await Admin.findOne({ email: "admin@company.com" });

    if (!exists) {
      await Admin.create({
        name: "Mary's Manicure & Pedicure",
        email: "admin@company.com",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Admin criado com sucesso!");
    } else {
      console.log("⚠️ Admin já existe");
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Erro ao criar admin:", err);
  }
};

createAdmin();
