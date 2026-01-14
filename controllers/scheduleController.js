// const Appointment = require('../models/Appointment');

// exports.getAppointments = async (req, res, next) => {
//     try {
//         const appointments = await Appointment.find({ user: req.user.id });
//         res.json(appointments);
//     } catch (err) {
//         next(err);
//     }
// };

// const Appointment = require('../models/Appointment');

// exports.getAppointments = async (req, res, next) => {
//     try {
//         const appointments = await Appointment.find({ user: req.user.id });

//         const groupedAppointments = appointments.reduce((acc, appointment) => {
//             if (!acc[appointment.date]) {
//                 acc[appointment.date] = [];
//             }
//             acc[appointment.date].push({ time: appointment.time });
//             return acc;
//         }, {});

//         res.json(groupedAppointments);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.createAppointment = async (req, res, next) => {
//     try {
//         const { date, time } = req.body;

//         const existing = await Appointment.findOne({ date, time });
//         if (existing) return res.status(400).json({ message: 'Time already booked!' });

//         const appointment = new Appointment({ user: req.user.id, date, time });
//         await appointment.save();
//         res.status(201).json(appointment);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.deleteAppointment = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const appointment = await Appointment.findById(id);
//         if (!appointment) return res.status(404).json({ message: 'Appointment not found!' });

//         if (appointment.user.toString() !== req.user.id)
//             return res.status(401).json({ message: 'Not authorized!' });

//         await appointment.deleteOne();
//         res.json({ message: 'Appointment deleted!' });
//     } catch (err) {
//         next(err);
//     }
// };

const Appointment = require("../models/Appointment");

// GET /api/appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// POST /api/appointments
exports.createAppointment = async (req, res) => {
  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).json({ message: "Date and time required" });
  }

  try {
    const appointment = new Appointment({
      user: req.user.name, // vem do token
      date,
      time,
    });

    await appointment.save();

    const appointments = await Appointment.find();
    res.status(201).json(appointments); // frontend espera array
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "This time is already booked" });
    }

    res.status(500).json({ message: "Error creating appointment" });
  }
};

// DELETE /api/appointments/:id  (opcional)
// OU compatível com seu frontend (date + time)
exports.deleteAppointment = async (req, res) => {
  const { date, time } = req.body;

  try {
    await Appointment.findOneAndDelete({
      user: req.user.name,
      date,
      time,
    });

    const appointments = await Appointment.find();
    res.json(appointments); // frontend espera array atualizado
  } catch (err) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
};
