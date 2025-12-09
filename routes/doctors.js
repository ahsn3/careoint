const express = require('express');
const router = express.Router();

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

// Get all doctors
router.get('/', checkDatabase, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id, email, name_en, name_ar, name_tr,
                   department_en, department_ar, department_tr,
                   specialty_en, specialty_ar, specialty_tr
            FROM doctors
            ORDER BY name_en
        `);

        const doctors = result.rows.map(row => ({
            id: row.id,
            email: row.email,
            name: {
                en: row.name_en,
                ar: row.name_ar,
                tr: row.name_tr
            },
            departmentName: {
                en: row.department_en,
                ar: row.department_ar,
                tr: row.department_tr
            },
            specialty: {
                en: row.specialty_en,
                ar: row.specialty_ar,
                tr: row.specialty_tr
            }
        }));

        res.json({ success: true, doctors });
    } catch (error) {
        console.error('Get doctors error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch doctors' });
    }
});

module.exports = router;

