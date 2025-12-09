-- SQL Script to Insert All 12 Doctors
-- Run this in Railway Postgres Database → Database → Data → SQL Editor
-- Or use Railway's "Connect" button to connect with a SQL client

-- Note: Passwords are hashed versions of "doctor123"
-- All doctors use password: doctor123
-- Hash: $2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q

INSERT INTO doctors (email, password, name_en, name_ar, name_tr, department_en, department_ar, department_tr, specialty_en, specialty_ar, specialty_tr)
VALUES 
-- Cardiology Doctors
('ahmed.rashid@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Ahmed Al-Rashid', 'د. أحمد الراشد', 'Dr. Ahmed Al-Rashid', 'Cardiology', 'أمراض القلب', 'Kardiyoloji', 'Interventional Cardiology', 'أمراض القلب التداخلية', 'Girişimsel Kardiyoloji'),

('fatima.zahra@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Fatima Al-Zahra', 'د. فاطمة الزهراء', 'Dr. Fatima Al-Zahra', 'Cardiology', 'أمراض القلب', 'Kardiyoloji', 'Pediatric Cardiology', 'أمراض قلب الأطفال', 'Pediatrik Kardiyoloji'),

-- Neurology Doctors
('mohammed.sayed@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Mohammed Al-Sayed', 'د. محمد السيد', 'Dr. Mohammed Al-Sayed', 'Neurology', 'الأعصاب', 'Nöroloji', 'Neurological Surgery', 'جراحة الأعصاب', 'Nörolojik Cerrahi'),

('aisha.mansouri@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Aisha Al-Mansouri', 'د. عائشة المنصوري', 'Dr. Aisha Al-Mansouri', 'Neurology', 'الأعصاب', 'Nöroloji', 'Epilepsy Specialist', 'أخصائية الصرع', 'Epilepsi Uzmanı'),

-- Orthopedics Doctors
('khalid.mahmoud@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Khalid Al-Mahmoud', 'د. خالد المحمود', 'Dr. Khalid Al-Mahmoud', 'Orthopedics', 'العظام', 'Ortopedi', 'Joint Replacement Surgery', 'جراحة استبدال المفاصل', 'Eklem Protez Cerrahisi'),

('layla.ahmad@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Layla Al-Ahmad', 'د. ليلى الأحمد', 'Dr. Layla Al-Ahmad', 'Orthopedics', 'العظام', 'Ortopedi', 'Sports Medicine', 'الطب الرياضي', 'Spor Hekimliği'),

-- Pediatrics Doctors
('omar.hassan@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Omar Al-Hassan', 'د. عمر الحسن', 'Dr. Omar Al-Hassan', 'Pediatrics', 'طب الأطفال', 'Pediatri', 'General Pediatrics', 'طب الأطفال العام', 'Genel Pediatri'),

('nour.aldin@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Nour Al-Din', 'د. نور الدين', 'Dr. Nour Al-Din', 'Pediatrics', 'طب الأطفال', 'Pediatri', 'Neonatology', 'طب حديثي الولادة', 'Yenidoğan Bilimi'),

-- Dermatology Doctors
('youssef.khatib@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Youssef Al-Khatib', 'د. يوسف الخطيب', 'Dr. Youssef Al-Khatib', 'Dermatology', 'الأمراض الجلدية', 'Dermatoloji', 'Cosmetic Dermatology', 'التجميل الجلدي', 'Kozmetik Dermatoloji'),

('mariam.farouq@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Mariam Al-Farouq', 'د. مريم الفاروق', 'Dr. Mariam Al-Farouq', 'Dermatology', 'الأمراض الجلدية', 'Dermatoloji', 'Dermatopathology', 'أمراض الجلد المرضية', 'Dermatopatoloji'),

-- Gynecology Doctors
('hassan.mutairi@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Hassan Al-Mutairi', 'د. حسن المطيري', 'Dr. Hassan Al-Mutairi', 'Gynecology', 'أمراض النساء', 'Jinekoloji', 'Gynecologic Oncology', 'أورام النساء', 'Jinekolojik Onkoloji'),

('zainab.qasimi@carepoint.com', '$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q', 'Dr. Zainab Al-Qasimi', 'د. زينب القاسمي', 'Dr. Zainab Al-Qasimi', 'Gynecology', 'أمراض النساء', 'Jinekoloji', 'Reproductive Medicine', 'الطب الإنجابي', 'Üreme Tıbbı')

ON CONFLICT (email) DO NOTHING;

-- Verify insertion
SELECT COUNT(*) as total_doctors FROM doctors;

