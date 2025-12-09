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

// Insert doctors manually (if tables exist but doctors are missing)
router.post('/insert-doctors', async (req, res) => {
    try {
        if (!process.env.DATABASE_URL) {
            return res.status(400).json({
                success: false,
                message: 'DATABASE_URL not set'
            });
        }

        const pool = require('../config/database');
        const bcrypt = require('bcryptjs');

        // Check if doctors table exists
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'doctors'
            )
        `);

        if (!tableCheck.rows[0].exists) {
            return res.status(400).json({
                success: false,
                message: 'Doctors table does not exist. Run migrations first.'
            });
        }

        // Get current doctor count
        const countResult = await pool.query('SELECT COUNT(*) as count FROM doctors');
        const currentCount = parseInt(countResult.rows[0].count);

        if (currentCount > 0) {
            return res.json({
                success: true,
                message: `Doctors already exist (${currentCount} doctors). Skipping insertion.`,
                doctorCount: currentCount
            });
        }

        // Insert all 12 doctors
        const defaultDoctors = [
            {
                email: 'ahmed.rashid@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Ahmed Al-Rashid',
                name_ar: 'د. أحمد الراشد',
                name_tr: 'Dr. Ahmed Al-Rashid',
                department_en: 'Cardiology',
                department_ar: 'أمراض القلب',
                department_tr: 'Kardiyoloji',
                specialty_en: 'Interventional Cardiology',
                specialty_ar: 'أمراض القلب التداخلية',
                specialty_tr: 'Girişimsel Kardiyoloji'
            },
            {
                email: 'fatima.zahra@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Fatima Al-Zahra',
                name_ar: 'د. فاطمة الزهراء',
                name_tr: 'Dr. Fatima Al-Zahra',
                department_en: 'Cardiology',
                department_ar: 'أمراض القلب',
                department_tr: 'Kardiyoloji',
                specialty_en: 'Pediatric Cardiology',
                specialty_ar: 'أمراض قلب الأطفال',
                specialty_tr: 'Pediatrik Kardiyoloji'
            },
            {
                email: 'mohammed.sayed@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Mohammed Al-Sayed',
                name_ar: 'د. محمد السيد',
                name_tr: 'Dr. Mohammed Al-Sayed',
                department_en: 'Neurology',
                department_ar: 'الأعصاب',
                department_tr: 'Nöroloji',
                specialty_en: 'Neurological Surgery',
                specialty_ar: 'جراحة الأعصاب',
                specialty_tr: 'Nörolojik Cerrahi'
            },
            {
                email: 'aisha.mansouri@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Aisha Al-Mansouri',
                name_ar: 'د. عائشة المنصوري',
                name_tr: 'Dr. Aisha Al-Mansouri',
                department_en: 'Neurology',
                department_ar: 'الأعصاب',
                department_tr: 'Nöroloji',
                specialty_en: 'Epilepsy Specialist',
                specialty_ar: 'أخصائية الصرع',
                specialty_tr: 'Epilepsi Uzmanı'
            },
            {
                email: 'khalid.mahmoud@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Khalid Al-Mahmoud',
                name_ar: 'د. خالد المحمود',
                name_tr: 'Dr. Khalid Al-Mahmoud',
                department_en: 'Orthopedics',
                department_ar: 'العظام',
                department_tr: 'Ortopedi',
                specialty_en: 'Joint Replacement Surgery',
                specialty_ar: 'جراحة استبدال المفاصل',
                specialty_tr: 'Eklem Protez Cerrahisi'
            },
            {
                email: 'layla.ahmad@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Layla Al-Ahmad',
                name_ar: 'د. ليلى الأحمد',
                name_tr: 'Dr. Layla Al-Ahmad',
                department_en: 'Orthopedics',
                department_ar: 'العظام',
                department_tr: 'Ortopedi',
                specialty_en: 'Sports Medicine',
                specialty_ar: 'الطب الرياضي',
                specialty_tr: 'Spor Hekimliği'
            },
            {
                email: 'omar.hassan@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Omar Al-Hassan',
                name_ar: 'د. عمر الحسن',
                name_tr: 'Dr. Omar Al-Hassan',
                department_en: 'Pediatrics',
                department_ar: 'طب الأطفال',
                department_tr: 'Pediatri',
                specialty_en: 'General Pediatrics',
                specialty_ar: 'طب الأطفال العام',
                specialty_tr: 'Genel Pediatri'
            },
            {
                email: 'nour.aldin@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Nour Al-Din',
                name_ar: 'د. نور الدين',
                name_tr: 'Dr. Nour Al-Din',
                department_en: 'Pediatrics',
                department_ar: 'طب الأطفال',
                department_tr: 'Pediatri',
                specialty_en: 'Neonatology',
                specialty_ar: 'طب حديثي الولادة',
                specialty_tr: 'Yenidoğan Bilimi'
            },
            {
                email: 'youssef.khatib@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Youssef Al-Khatib',
                name_ar: 'د. يوسف الخطيب',
                name_tr: 'Dr. Youssef Al-Khatib',
                department_en: 'Dermatology',
                department_ar: 'الأمراض الجلدية',
                department_tr: 'Dermatoloji',
                specialty_en: 'Cosmetic Dermatology',
                specialty_ar: 'التجميل الجلدي',
                specialty_tr: 'Kozmetik Dermatoloji'
            },
            {
                email: 'mariam.farouq@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Mariam Al-Farouq',
                name_ar: 'د. مريم الفاروق',
                name_tr: 'Dr. Mariam Al-Farouq',
                department_en: 'Dermatology',
                department_ar: 'الأمراض الجلدية',
                department_tr: 'Dermatoloji',
                specialty_en: 'Dermatopathology',
                specialty_ar: 'أمراض الجلد المرضية',
                specialty_tr: 'Dermatopatoloji'
            },
            {
                email: 'hassan.mutairi@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Hassan Al-Mutairi',
                name_ar: 'د. حسن المطيري',
                name_tr: 'Dr. Hassan Al-Mutairi',
                department_en: 'Gynecology',
                department_ar: 'أمراض النساء',
                department_tr: 'Jinekoloji',
                specialty_en: 'Gynecologic Oncology',
                specialty_ar: 'أورام النساء',
                specialty_tr: 'Jinekolojik Onkoloji'
            },
            {
                email: 'zainab.qasimi@carepoint.com',
                password: 'doctor123',
                name_en: 'Dr. Zainab Al-Qasimi',
                name_ar: 'د. زينب القاسمي',
                name_tr: 'Dr. Zainab Al-Qasimi',
                department_en: 'Gynecology',
                department_ar: 'أمراض النساء',
                department_tr: 'Jinekoloji',
                specialty_en: 'Reproductive Medicine',
                specialty_ar: 'الطب الإنجابي',
                specialty_tr: 'Üreme Tıbbı'
            }
        ];

        let inserted = 0;
        let skipped = 0;

        for (const doctor of defaultDoctors) {
            try {
                const hashedPassword = await bcrypt.hash(doctor.password, 10);
                const result = await pool.query(`
                    INSERT INTO doctors (email, password, name_en, name_ar, name_tr, department_en, department_ar, department_tr, specialty_en, specialty_ar, specialty_tr)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                    ON CONFLICT (email) DO NOTHING
                    RETURNING id
                `, [
                    doctor.email,
                    hashedPassword,
                    doctor.name_en,
                    doctor.name_ar,
                    doctor.name_tr,
                    doctor.department_en,
                    doctor.department_ar,
                    doctor.department_tr,
                    doctor.specialty_en,
                    doctor.specialty_ar,
                    doctor.specialty_tr
                ]);

                if (result.rows.length > 0) {
                    inserted++;
                } else {
                    skipped++;
                }
            } catch (error) {
                console.error(`Error inserting doctor ${doctor.email}:`, error);
            }
        }

        res.json({
            success: true,
            message: `Doctors insertion completed: ${inserted} inserted, ${skipped} skipped`,
            inserted: inserted,
            skipped: skipped,
            total: defaultDoctors.length
        });
    } catch (error) {
        console.error('Insert doctors error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to insert doctors',
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

