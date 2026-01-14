const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { getAppointments, createAppointment, deleteAppointment } = require('../controllers/scheduleController');

router.get('/', verifyToken, getAppointments);
router.post('/', verifyToken, createAppointment);
router.delete('/', verifyToken, deleteAppointment);

module.exports = router;


