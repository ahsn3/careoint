const pool = require('../config/database');
require('dotenv').config();

async function migrate() {
    // Check if DATABASE_URL is set FIRST
    if (!process.env.DATABASE_URL) {
        console.log('⚠ DATABASE_URL not set - skipping migrations');
        console.log('Migrations will run automatically when DATABASE_URL is configured');
        return false; // Return false instead of throwing
    }
    
    try {
        console.log('Starting database migration...');

        // Create doctors table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS doctors (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name_en VARCHAR(255) NOT NULL,
                name_ar VARCHAR(255),
                name_tr VARCHAR(255),
                department_en VARCHAR(255),
                department_ar VARCHAR(255),
                department_tr VARCHAR(255),
                specialty_en VARCHAR(255),
                specialty_ar VARCHAR(255),
                specialty_tr VARCHAR(255),
                role VARCHAR(50) DEFAULT 'doctor',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✓ Doctors table created');

        // Create patients table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS patients (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                date_of_birth DATE,
                gender VARCHAR(20),
                address TEXT,
                medical_history TEXT,
                blood_type VARCHAR(10),
                allergies TEXT,
                emergency_contact_name VARCHAR(255),
                emergency_contact_phone VARCHAR(50),
                emergency_contact_relation VARCHAR(100),
                role VARCHAR(50) DEFAULT 'patient',
                registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✓ Patients table created');

        // Create appointments table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS appointments (
                id SERIAL PRIMARY KEY,
                patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
                doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE,
                date DATE NOT NULL,
                time TIME NOT NULL,
                notes TEXT,
                status VARCHAR(50) DEFAULT 'scheduled',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✓ Appointments table created');

        // Create sessions table for authentication
        await pool.query(`
            CREATE TABLE IF NOT EXISTS sessions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                user_type VARCHAR(50) NOT NULL,
                token VARCHAR(500),
                expires_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✓ Sessions table created');

        // Insert default doctors (all 12 doctors from doctors.js)
        const defaultDoctors = [
            // Cardiology
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
            // Neurology
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
            // Orthopedics
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
            // Pediatrics
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
            // Dermatology
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
            // Gynecology
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

        for (const doctor of defaultDoctors) {
            const hashedPassword = await bcrypt.hash(doctor.password, 10);
            await pool.query(`
                INSERT INTO doctors (email, password, name_en, name_ar, name_tr, department_en, department_ar, department_tr, specialty_en, specialty_ar, specialty_tr)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT (email) DO NOTHING
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
        }
        console.log('✓ Default doctors inserted');

        console.log('Migration completed successfully!');
        return true;
    } catch (error) {
        console.error('Migration failed:', error);
        console.error('Error details:', error.message);
        console.error('Stack:', error.stack);
        // Don't throw - let server start anyway
        return false;
    }
}

// Export the function
module.exports = migrate;

// Only run migration if called directly (for npm run migrate)
if (require.main === module) {
    migrate().then((success) => {
        if (success) {
            console.log('✓ Migration script completed successfully');
        } else {
            console.log('⚠ Migration script completed (skipped or failed, but non-fatal)');
        }
        // Always exit with 0 - don't fail deployment
        process.exit(0);
    }).catch((error) => {
        console.error('Migration script error:', error);
        // Exit with 0 anyway - don't fail deployment
        console.log('⚠ Continuing despite migration error');
        process.exit(0);
    });
}

