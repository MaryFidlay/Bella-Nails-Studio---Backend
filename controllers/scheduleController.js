const Appointment = require("../models/Appointment");


exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};


exports.createAppointment = async (req, res) => {
  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).json({ message: "Date and time required" });
  }

  try {
    const appointment = new Appointment({
      user: req.user.name, 
      date,
      time,
    });

    await appointment.save();

    const appointments = await Appointment.find();
    res.status(201).json(appointments); 
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "This time is already booked" });
    }

    res.status(500).json({ message: "Error creating appointment" });
  }
};


exports.deleteAppointment = async (req, res) => {
  const { date, time } = req.body;

  try {
    await Appointment.findOneAndDelete({
      user: req.user.name,
      date,
      time,
    });

    const appointments = await Appointment.find();
    res.json(appointments); 
  } catch (err) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
};