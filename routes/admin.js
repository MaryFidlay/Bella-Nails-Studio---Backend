// const express = require('express');
// const router = express.Router();
// const { adminLogin, getAllAppointments, cancelAppointment } = require('../controllers/adminController');
// const verifyToken = require('../middleware/auth');

// router.post('/login', adminLogin);
// router.get('/appointments', verifyToken, getAllAppointments);
// router.delete('/appointments/:id', verifyToken, cancelAppointment);

// module.exports = router;

const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {
  adminLogin,
  getAllAppointments,
  deleteAppointment,
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.get("/appointments", adminAuth, getAllAppointments);
router.delete("/appointments/:id", adminAuth, deleteAppointment);

module.exports = router;
