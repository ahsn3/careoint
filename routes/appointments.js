const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Lazy load database
let pool;
try {
    pool = require('../config/database');
} catch (error) {
    console.error('Database config error:', error);
    pool = null;
}

const checkDatabase = (req, res, next) => {
    if (!pool || !process.env.DATABASE_URL) {
        return res.status(503).json({ 
            success: false, 
            message: 'Database not configured' 
        });
    }
    next();
};

// Create appointment
router.post('/', checkDatabase, [
    body('patientId').isInt(),
    body('doctorId').isInt(),
    body('date').isISO8601(),
    body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('notes').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
        }

        const { patientId, doctorId, date, time, notes } = req.body;

        // Check if patient exists
        const patient = await pool.query('SELECT id FROM patients WHERE id = $1', [patientId]);
        if (patient.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        // Check if doctor exists
        const doctor = await pool.query('SELECT id FROM doctors WHERE id = $1', [doctorId]);
        if (doctor.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Insert appointment
        const result = await pool.query(`
            INSERT INTO appointments (patient_id, doctor_id, date, time, notes, status)
            VALUES ($1, $2, $3, $4, $5, 'scheduled')
            RETURNING id, patient_id, doctor_id, date, time, notes, status, created_at
        `, [patientId, doctorId, date, time, notes || null]);

        const appointment = result.rows[0];
        res.json({
            success: true,
            appointment: {
                id: appointment.id,
                patientId: appointment.patient_id,
                doctorId: appointment.doctor_id,
                date: appointment.date,
                time: appointment.time,
                notes: appointment.notes,
                status: appointment.status
            }
        });
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({ success: false, message: 'Failed to create appointment' });
    }
});

// Get appointments for a patient
router.get('/patient/:patientId', checkDatabase, async (req, res) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const userId = req.headers['x-user-id'];
        const userRole = req.headers['x-user-role'];

        // Patients can only view their own appointments
        if (userRole === 'patient' && userId != patientId) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const result = await pool.query(`
            SELECT a.id, a.date, a.time, a.notes, a.status,
                   d.name_en as doctor_name_en, d.name_ar as doctor_name_ar, d.name_tr as doctor_name_tr,
                   d.id as doctor_id, d.department_en, d.department_ar, d.department_tr
            FROM appointments a
            JOIN doctors d ON a.doctor_id = d.id
            WHERE a.patient_id = $1
            ORDER BY a.date DESC, a.time DESC
        `, [patientId]);

        const appointments = result.rows.map(apt => ({
            id: apt.id,
            doctor: apt.doctor_name_en,
            doctorId: apt.doctor_id,
            date: apt.date,
            time: apt.time,
            notes: apt.notes,
            status: apt.status
        }));

        res.json({ success: true, appointments });
    } catch (error) {
        console.error('Get appointments error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
    }
});

module.exports = router;

