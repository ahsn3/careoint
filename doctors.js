// Doctor Database
const doctors = [
    // Cardiology
    {
        id: 1,
        name: { en: 'Dr. Ahmed Al-Rashid', ar: 'د. أحمد الراشد', tr: 'Dr. Ahmed Al-Rashid' },
        department: 'cardiology',
        departmentName: { en: 'Cardiology', ar: 'أمراض القلب', tr: 'Kardiyoloji' },
        specialty: { en: 'Interventional Cardiology', ar: 'أمراض القلب التداخلية', tr: 'Girişimsel Kardiyoloji' },
        gender: 'male',
        available: true
    },
    {
        id: 2,
        name: { en: 'Dr. Fatima Al-Zahra', ar: 'د. فاطمة الزهراء', tr: 'Dr. Fatima Al-Zahra' },
        department: 'cardiology',
        departmentName: { en: 'Cardiology', ar: 'أمراض القلب', tr: 'Kardiyoloji' },
        specialty: { en: 'Pediatric Cardiology', ar: 'أمراض قلب الأطفال', tr: 'Pediatrik Kardiyoloji' },
        gender: 'female',
        available: true
    },
    // Neurology
    {
        id: 3,
        name: { en: 'Dr. Mohammed Al-Sayed', ar: 'د. محمد السيد', tr: 'Dr. Mohammed Al-Sayed' },
        department: 'neurology',
        departmentName: { en: 'Neurology', ar: 'الأعصاب', tr: 'Nöroloji' },
        specialty: { en: 'Neurological Surgery', ar: 'جراحة الأعصاب', tr: 'Nörolojik Cerrahi' },
        gender: 'male',
        available: true
    },
    {
        id: 4,
        name: { en: 'Dr. Aisha Al-Mansouri', ar: 'د. عائشة المنصوري', tr: 'Dr. Aisha Al-Mansouri' },
        department: 'neurology',
        departmentName: { en: 'Neurology', ar: 'الأعصاب', tr: 'Nöroloji' },
        specialty: { en: 'Epilepsy Specialist', ar: 'أخصائية الصرع', tr: 'Epilepsi Uzmanı' },
        gender: 'female',
        available: true
    },
    // Orthopedics
    {
        id: 5,
        name: { en: 'Dr. Khalid Al-Mahmoud', ar: 'د. خالد المحمود', tr: 'Dr. Khalid Al-Mahmoud' },
        department: 'orthopedics',
        departmentName: { en: 'Orthopedics', ar: 'العظام', tr: 'Ortopedi' },
        specialty: { en: 'Joint Replacement Surgery', ar: 'جراحة استبدال المفاصل', tr: 'Eklem Protez Cerrahisi' },
        gender: 'male',
        available: true
    },
    {
        id: 6,
        name: { en: 'Dr. Layla Al-Ahmad', ar: 'د. ليلى الأحمد', tr: 'Dr. Layla Al-Ahmad' },
        department: 'orthopedics',
        departmentName: { en: 'Orthopedics', ar: 'العظام', tr: 'Ortopedi' },
        specialty: { en: 'Sports Medicine', ar: 'الطب الرياضي', tr: 'Spor Hekimliği' },
        gender: 'female',
        available: true
    },
    // Pediatrics
    {
        id: 7,
        name: { en: 'Dr. Omar Al-Hassan', ar: 'د. عمر الحسن', tr: 'Dr. Omar Al-Hassan' },
        department: 'pediatrics',
        departmentName: { en: 'Pediatrics', ar: 'طب الأطفال', tr: 'Pediatri' },
        specialty: { en: 'General Pediatrics', ar: 'طب الأطفال العام', tr: 'Genel Pediatri' },
        gender: 'male',
        available: true
    },
    {
        id: 8,
        name: { en: 'Dr. Nour Al-Din', ar: 'د. نور الدين', tr: 'Dr. Nour Al-Din' },
        department: 'pediatrics',
        departmentName: { en: 'Pediatrics', ar: 'طب الأطفال', tr: 'Pediatri' },
        specialty: { en: 'Neonatology', ar: 'طب حديثي الولادة', tr: 'Yenidoğan Bilimi' },
        gender: 'female',
        available: true
    },
    // Dermatology
    {
        id: 9,
        name: { en: 'Dr. Youssef Al-Khatib', ar: 'د. يوسف الخطيب', tr: 'Dr. Youssef Al-Khatib' },
        department: 'dermatology',
        departmentName: { en: 'Dermatology', ar: 'الأمراض الجلدية', tr: 'Dermatoloji' },
        specialty: { en: 'Cosmetic Dermatology', ar: 'التجميل الجلدي', tr: 'Kozmetik Dermatoloji' },
        gender: 'male',
        available: true
    },
    {
        id: 10,
        name: { en: 'Dr. Mariam Al-Farouq', ar: 'د. مريم الفاروق', tr: 'Dr. Mariam Al-Farouq' },
        department: 'dermatology',
        departmentName: { en: 'Dermatology', ar: 'الأمراض الجلدية', tr: 'Dermatoloji' },
        specialty: { en: 'Dermatopathology', ar: 'أمراض الجلد المرضية', tr: 'Dermatopatoloji' },
        gender: 'female',
        available: true
    },
    // Gynecology
    {
        id: 11,
        name: { en: 'Dr. Hassan Al-Mutairi', ar: 'د. حسن المطيري', tr: 'Dr. Hassan Al-Mutairi' },
        department: 'gynecology',
        departmentName: { en: 'Gynecology', ar: 'أمراض النساء', tr: 'Jinekoloji' },
        specialty: { en: 'Gynecologic Oncology', ar: 'أورام النساء', tr: 'Jinekolojik Onkoloji' },
        gender: 'male',
        available: true
    },
    {
        id: 12,
        name: { en: 'Dr. Zainab Al-Qasimi', ar: 'د. زينب القاسمي', tr: 'Dr. Zainab Al-Qasimi' },
        department: 'gynecology',
        departmentName: { en: 'Gynecology', ar: 'أمراض النساء', tr: 'Jinekoloji' },
        specialty: { en: 'Reproductive Medicine', ar: 'الطب الإنجابي', tr: 'Üreme Tıbbı' },
        gender: 'female',
        available: true
    }
];
