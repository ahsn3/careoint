const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all patients (doctor only)
router.get('/', async (req, res) => {
    try {
        const userRole = req.headers['x-user-role'];
        
        if (userRole !== 'doctor') {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const result = await pool.query(`
            SELECT 
                p.id, p.email, p.name, p.phone, p.date_of_birth, p.gender, 
                p.address, p.medical_history, p.blood_type, p.allergies,
                p.emergency_contact_name, p.emergency_contact_phone, p.emergency_contact_relation,
                p.registered_at,
                COUNT(a.id) as appointment_count
            FROM patients p
            LEFT JOIN appointments a ON p.id = a.patient_id
            GROUP BY p.id
            ORDER BY p.registered_at DESC
        `);

        const patients = result.rows.map(row => ({
            id: row.id,
            email: row.email,
            name: row.name,
            phone: row.phone,
            dateOfBirth: row.date_of_birth,
            gender: row.gender,
            address: row.address,
            medicalHistory: row.medical_history,
            bloodType: row.blood_type,
            allergies: row.allergies,
            emergencyContact: {
                name: row.emergency_contact_name,
                phone: row.emergency_contact_phone,
                relationship: row.emergency_contact_relation
            },
            registeredAt: row.registered_at,
            appointments: []
        }));

        // Get appointments for each patient
        for (let patient of patients) {
            const appointments = await pool.query(`
                SELECT a.id, a.date, a.time, a.notes, a.status,
                       d.name_en as doctor_name_en, d.name_ar as doctor_name_ar, d.name_tr as doctor_name_tr,
                       d.id as doctor_id
                FROM appointments a
                JOIN doctors d ON a.doctor_id = d.id
                WHERE a.patient_id = $1
                ORDER BY a.date DESC, a.time DESC
            `, [patient.id]);

            patient.appointments = appointments.rows.map(apt => ({
                id: apt.id,
                doctor: apt.doctor_name_en,
                doctorId: apt.doctor_id,
                date: apt.date,
                time: apt.time,
                notes: apt.notes,
                status: apt.status
            }));
        }

        res.json({ success: true, patients });
    } catch (error) {
        console.error('Get patients error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch patients' });
    }
});

// Get single patient
router.get('/:id', async (req, res) => {
    try {
        const userRole = req.headers['x-user-role'];
        const userId = req.headers['x-user-id'];
        const patientId = parseInt(req.params.id);

        // Patients can only view their own data, doctors can view any
        if (userRole === 'patient' && userId != patientId) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const result = await pool.query(`
            SELECT id, email, name, phone, date_of_birth, gender, address,
                   medical_history, blood_type, allergies,
                   emergency_contact_name, emergency_contact_phone, emergency_contact_relation,
                   registered_at
            FROM patients
            WHERE id = $1
        `, [patientId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        const patient = result.rows[0];
        const patientData = {
            id: patient.id,
            email: patient.email,
            name: patient.name,
            phone: patient.phone,
            dateOfBirth: patient.date_of_birth,
            gender: patient.gender,
            address: patient.address,
            medicalHistory: patient.medical_history,
            bloodType: patient.blood_type,
            allergies: patient.allergies,
            emergencyContact: {
                name: patient.emergency_contact_name,
                phone: patient.emergency_contact_phone,
                relationship: patient.emergency_contact_relation
            },
            registeredAt: patient.registered_at
        };

        // Get appointments
        const appointments = await pool.query(`
            SELECT a.id, a.date, a.time, a.notes, a.status,
                   d.name_en as doctor_name_en, d.name_ar as doctor_name_ar, d.name_tr as doctor_name_tr,
                   d.id as doctor_id
            FROM appointments a
            JOIN doctors d ON a.doctor_id = d.id
            WHERE a.patient_id = $1
            ORDER BY a.date DESC, a.time DESC
        `, [patientId]);

        patientData.appointments = appointments.rows.map(apt => ({
            id: apt.id,
            doctor: apt.doctor_name_en,
            doctorId: apt.doctor_id,
            date: apt.date,
            time: apt.time,
            notes: apt.notes,
            status: apt.status
        }));

        res.json({ success: true, patient: patientData });
    } catch (error) {
        console.error('Get patient error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch patient' });
    }
});

module.exports = router;

