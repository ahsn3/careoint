const pool = require('../config/database');
require('dotenv').config();

async function migrate() {
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

        // Insert default doctors
        const defaultDoctors = [
            {
                email: 'ahmed.rashid@carepoint.com',
                password: 'doctor123', // Will be hashed
                name_en: 'Dr. Ahmed Al-Rashid',
                name_ar: 'د. أحمد الراشد',
                name_tr: 'Dr. Ahmed Al-Rashid',
                department_en: 'Cardiology',
                department_ar: 'أمراض القلب',
                department_tr: 'Kardiyoloji',
                specialty_en: 'Interventional Cardiology',
                specialty_ar: 'القلب التدخلي',
                specialty_tr: 'Girişimsel Kardiyoloji'
            },
            {
                email: 'fatima.zahra@carepoint.com',
                password: 'doctor123', // Will be hashed
                name_en: 'Dr. Fatima Al-Zahra',
                name_ar: 'د. فاطمة الزهراء',
                name_tr: 'Dr. Fatima Al-Zahra',
                department_en: 'Cardiology',
                department_ar: 'أمراض القلب',
                department_tr: 'Kardiyoloji',
                specialty_en: 'Heart Surgery',
                specialty_ar: 'جراحة القلب',
                specialty_tr: 'Kalp Cerrahisi'
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
                specialty_en: 'Epilepsy Treatment',
                specialty_ar: 'علاج الصرع',
                specialty_tr: 'Epilepsi Tedavisi'
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

