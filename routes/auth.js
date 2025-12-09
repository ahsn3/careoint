const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { body, validationResult } = require('express-validator');

// Register Patient
router.post('/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty().trim(),
    body('phone').optional().trim(),
    body('dateOfBirth').optional(),
    body('gender').optional().isIn(['male', 'female']),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
        }

        const {
            email,
            password,
            name,
            phone,
            dateOfBirth,
            gender,
            address,
            medicalHistory,
            bloodType,
            allergies,
            emergencyContactName,
            emergencyContactPhone,
            emergencyContactRelation
        } = req.body;

        // Check if email already exists
        const existingPatient = await pool.query(
            'SELECT id FROM patients WHERE email = $1',
            [email]
        );

        if (existingPatient.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert patient
        const result = await pool.query(`
            INSERT INTO patients (
                email, password, name, phone, date_of_birth, gender, address,
                medical_history, blood_type, allergies,
                emergency_contact_name, emergency_contact_phone, emergency_contact_relation
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING id, email, name, phone, date_of_birth, gender, address,
                medical_history, blood_type, allergies, registered_at
        `, [
            email, hashedPassword, name, phone, dateOfBirth, gender, address,
            medicalHistory, bloodType, allergies,
            emergencyContactName, emergencyContactPhone, emergencyContactRelation
        ]);

        const patient = result.rows[0];
        res.json({
            success: true,
            patient: {
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
                registeredAt: patient.registered_at
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Login (Patient or Doctor)
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    body('role').isIn(['patient', 'doctor'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation failed' });
        }

        const { email, password, role } = req.body;

        let user, tableName;
        if (role === 'doctor') {
            tableName = 'doctors';
            user = await pool.query(
                'SELECT id, email, password, name_en, name_ar, name_tr, department_en, department_ar, department_tr, specialty_en, specialty_ar, specialty_tr FROM doctors WHERE LOWER(email) = LOWER($1)',
                [email]
            );
        } else {
            tableName = 'patients';
            user = await pool.query(
                'SELECT id, email, password, name, phone, date_of_birth, gender, address, medical_history, blood_type, allergies FROM patients WHERE LOWER(email) = LOWER($1)',
                [email]
            );
        }

        if (user.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const dbUser = user.rows[0];
        const isValidPassword = await bcrypt.compare(password, dbUser.password);

        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Format user response
        let userData;
        if (role === 'doctor') {
            userData = {
                id: dbUser.id,
                email: dbUser.email,
                name: {
                    en: dbUser.name_en,
                    ar: dbUser.name_ar,
                    tr: dbUser.name_tr
                },
                department: {
                    en: dbUser.department_en,
                    ar: dbUser.department_ar,
                    tr: dbUser.department_tr
                },
                specialty: {
                    en: dbUser.specialty_en,
                    ar: dbUser.specialty_ar,
                    tr: dbUser.specialty_tr
                },
                role: 'doctor'
            };
        } else {
            userData = {
                id: dbUser.id,
                email: dbUser.email,
                name: dbUser.name,
                phone: dbUser.phone,
                dateOfBirth: dbUser.date_of_birth,
                gender: dbUser.gender,
                address: dbUser.address,
                medicalHistory: dbUser.medical_history,
                bloodType: dbUser.blood_type,
                allergies: dbUser.allergies,
                role: 'patient'
            };
        }

        res.json({
            success: true,
            user: userData,
            role: role
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

// Get current user (from session)
router.get('/me', async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const userRole = req.headers['x-user-role'];

        if (!userId || !userRole) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        let user;
        if (userRole === 'doctor') {
            user = await pool.query(
                'SELECT id, email, name_en, name_ar, name_tr, department_en, department_ar, department_tr, specialty_en, specialty_ar, specialty_tr FROM doctors WHERE id = $1',
                [userId]
            );
            if (user.rows.length > 0) {
                const dbUser = user.rows[0];
                return res.json({
                    success: true,
                    user: {
                        id: dbUser.id,
                        email: dbUser.email,
                        name: {
                            en: dbUser.name_en,
                            ar: dbUser.name_ar,
                            tr: dbUser.name_tr
                        },
                        department: {
                            en: dbUser.department_en,
                            ar: dbUser.department_ar,
                            tr: dbUser.department_tr
                        },
                        specialty: {
                            en: dbUser.specialty_en,
                            ar: dbUser.specialty_ar,
                            tr: dbUser.specialty_tr
                        },
                        role: 'doctor'
                    }
                });
            }
        } else {
            user = await pool.query(
                'SELECT id, email, name, phone, date_of_birth, gender, address, medical_history, blood_type, allergies FROM patients WHERE id = $1',
                [userId]
            );
            if (user.rows.length > 0) {
                const dbUser = user.rows[0];
                return res.json({
                    success: true,
                    user: {
                        id: dbUser.id,
                        email: dbUser.email,
                        name: dbUser.name,
                        phone: dbUser.phone,
                        dateOfBirth: dbUser.date_of_birth,
                        gender: dbUser.gender,
                        address: dbUser.address,
                        medicalHistory: dbUser.medical_history,
                        bloodType: dbUser.blood_type,
                        allergies: dbUser.allergies,
                        role: 'patient'
                    }
                });
            }
        }

        res.status(404).json({ success: false, message: 'User not found' });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ success: false, message: 'Failed to get user' });
    }
});

module.exports = router;

