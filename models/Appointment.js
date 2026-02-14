const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String },
  phone: { type: String }, 
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
