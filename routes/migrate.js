const express = require('express');
const router = express.Router();
const migrate = require('../migrations/migrate');

// Manual migration endpoint (for triggering migrations)
router.post('/run', async (req, res) => {
    try {
        if (!process.env.DATABASE_URL) {
            return res.status(400).json({
                success: false,
                message: 'DATABASE_URL not set. Please configure it in Railway variables.'
            });
        }

        console.log('Manual migration triggered');
        const result = await migrate();
        
        if (result) {
            res.json({
                success: true,
                message: 'Migrations completed successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Migrations failed or were skipped'
            });
        }
    } catch (error) {
        console.error('Migration error:', error);
        res.status(500).json({
            success: false,
            message: 'Migration failed',
            error: error.message
        });
    }
});

// Check migration status
router.get('/status', async (req, res) => {
    try {
        const pool = require('../config/database');
        
        if (!process.env.DATABASE_URL) {
            return res.json({
                success: false,
                databaseConfigured: false,
                message: 'DATABASE_URL not set'
            });
        }

        // Check if tables exist
        const tablesResult = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);

        const tables = tablesResult.rows.map(row => row.table_name);
        
        // Check if doctors exist
        let doctorCount = 0;
        if (tables.includes('doctors')) {
            const doctorsResult = await pool.query('SELECT COUNT(*) as count FROM doctors');
            doctorCount = parseInt(doctorsResult.rows[0].count);
        }

        res.json({
            success: true,
            databaseConfigured: true,
            tables: tables,
            tableCount: tables.length,
            doctorCount: doctorCount,
            expectedTables: ['doctors', 'patients', 'appointments', 'sessions'],
            allTablesExist: ['doctors', 'patients', 'appointments', 'sessions'].every(t => tables.includes(t))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            databaseConfigured: false,
            error: error.message
        });
    }
});

module.exports = router;

