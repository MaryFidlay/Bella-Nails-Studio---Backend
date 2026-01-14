// const Appointment = require('../models/Appointment');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');


// const admins = [
//     { name: "Mary's Manicure & Pedicure", email: "admin@company.com", password: "admin123" }
// ];

// exports.adminLogin = (req, res, next) => {
//     const { email, password } = req.body;
//     const admin = admins.find(a => a.email === email && a.password === password);
//     if (!admin) return res.status(400).json({ message: 'Invalid admin credentials!' });

//     const token = jwt.sign({ name: admin.name, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ token, name: admin.name });
// };

// exports.getAllAppointments = async (req, res, next) => {
//     try {
//         const appointments = await Appointment.find().populate('user', 'name phone email');
//         res.json(appointments);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.cancelAppointment = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const appointment = await Appointment.findById(id);
//         if (!appointment) return res.status(404).json({ message: 'Appointment not found!' });

//         await appointment.deleteOne();
//         res.json({ message: 'Appointment canceled!' });
//     } catch (err) {
//         next(err);
//     }
// };



const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Appointment = require("../models/Appointment");


exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: admin._id,
      name: admin.name,
      role: "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    admin: {
      name: admin.name,
      email: admin.email,
    },
    token,
  });
};


exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      date: 1,
      time: 1,
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};


exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
};
