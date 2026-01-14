// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     date: { type: String, required: true },
//     time: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Appointment', appointmentSchema);

// const mongoose = require("mongoose");

// const appointmentSchema = new mongoose.Schema(
//   {
//     user: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// appointmentSchema.index({ date: 1, time: 1 }, { unique: true });

// module.exports = mongoose.model("Appointment", appointmentSchema);

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: { type: String, required: true }, // nome do usuário
  email: { type: String }, // email do usuário
  phone: { type: String }, // telefone do usuário
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
