// Authentication and User Management System
// This module handles patient registration, doctor accounts, and authentication

// Initialize default doctor accounts
const defaultDoctors = [
    {
        id: 1,
        email: 'ahmed.rashid@carepoint.com',
        password: 'doctor123', // In production, this should be hashed
        name: { en: 'Dr. Ahmed Al-Rashid', ar: 'د. أحمد الراشد' },
        role: 'doctor',
        doctorId: 1,
        department: 'cardiology'
    },
    {
        id: 2,
        email: 'fatima.zahra@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Fatima Al-Zahra', ar: 'د. فاطمة الزهراء' },
        role: 'doctor',
        doctorId: 2,
        department: 'cardiology'
    },
    {
        id: 3,
        email: 'mohammed.sayed@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Mohammed Al-Sayed', ar: 'د. محمد السيد' },
        role: 'doctor',
        doctorId: 3,
        department: 'neurology'
    },
    {
        id: 4,
        email: 'aisha.mansouri@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Aisha Al-Mansouri', ar: 'د. عائشة المنصوري' },
        role: 'doctor',
        doctorId: 4,
        department: 'neurology'
    },
    {
        id: 5,
        email: 'khalid.mahmoud@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Khalid Al-Mahmoud', ar: 'د. خالد المحمود' },
        role: 'doctor',
        doctorId: 5,
        department: 'orthopedics'
    },
    {
        id: 6,
        email: 'layla.ahmad@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Layla Al-Ahmad', ar: 'د. ليلى الأحمد' },
        role: 'doctor',
        doctorId: 6,
        department: 'orthopedics'
    },
    {
        id: 7,
        email: 'omar.hassan@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Omar Al-Hassan', ar: 'د. عمر الحسن' },
        role: 'doctor',
        doctorId: 7,
        department: 'pediatrics'
    },
    {
        id: 8,
        email: 'nour.din@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Nour Al-Din', ar: 'د. نور الدين' },
        role: 'doctor',
        doctorId: 8,
        department: 'pediatrics'
    },
    {
        id: 9,
        email: 'youssef.khatib@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Youssef Al-Khatib', ar: 'د. يوسف الخطيب' },
        role: 'doctor',
        doctorId: 9,
        department: 'dermatology'
    },
    {
        id: 10,
        email: 'mariam.farouq@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Mariam Al-Farouq', ar: 'د. مريم الفاروق' },
        role: 'doctor',
        doctorId: 10,
        department: 'dermatology'
    },
    {
        id: 11,
        email: 'hassan.mutairi@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Hassan Al-Mutairi', ar: 'د. حسن المطيري' },
        role: 'doctor',
        doctorId: 11,
        department: 'gynecology'
    },
    {
        id: 12,
        email: 'zainab.qasimi@carepoint.com',
        password: 'doctor123',
        name: { en: 'Dr. Zainab Al-Qasimi', ar: 'د. زينب القاسمي' },
        role: 'doctor',
        doctorId: 12,
        department: 'gynecology'
    }
];

// Initialize storage with default doctors if not exists
function initializeStorage() {
    // Initialize doctors accounts
    if (!localStorage.getItem('carepoint-doctors')) {
        localStorage.setItem('carepoint-doctors', JSON.stringify(defaultDoctors));
    }
    
    // Initialize patients array if not exists
    if (!localStorage.getItem('carepoint-patients')) {
        localStorage.setItem('carepoint-patients', JSON.stringify([]));
    }
    
    // Initialize sample data if available and no patients exist
    if (typeof initializeSampleData === 'function') {
        const existingPatients = localStorage.getItem('carepoint-patients');
        const patients = existingPatients ? JSON.parse(existingPatients) : [];
        if (patients.length === 0) {
            initializeSampleData();
        }
    }
}

// Get all patients
function getPatients() {
    const patients = localStorage.getItem('carepoint-patients');
    return patients ? JSON.parse(patients) : [];
}

// Get all doctors
function getDoctors() {
    // Ensure storage is initialized first
    if (!localStorage.getItem('carepoint-doctors')) {
        initializeStorage();
    }
    const doctors = localStorage.getItem('carepoint-doctors');
    return doctors ? JSON.parse(doctors) : defaultDoctors;
}

// Register a new patient
function registerPatient(patientData) {
    const patients = getPatients();
    
    // Check if email already exists
    if (patients.find(p => p.email === patientData.email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    // Create patient object with additional fields
    const newPatient = {
        id: Date.now(), // Simple ID generation
        email: patientData.email,
        password: patientData.password, // In production, hash this
        name: patientData.name,
        phone: patientData.phone,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        address: patientData.address || '',
        medicalHistory: patientData.medicalHistory || '',
        role: 'patient',
        registeredAt: new Date().toISOString(),
        appointments: [],
        // Additional patient information
        bloodType: patientData.bloodType || '',
        allergies: patientData.allergies || '',
        medications: patientData.medications || '',
        emergencyContact: {
            name: patientData.emergencyContactName || '',
            phone: patientData.emergencyContactPhone || '',
            relationship: patientData.emergencyContactRelation || ''
        },
        insurance: {
            provider: patientData.insuranceProvider || '',
            policyNumber: patientData.insurancePolicyNumber || ''
        }
    };
    
    patients.push(newPatient);
    localStorage.setItem('carepoint-patients', JSON.stringify(patients));
    
    return { success: true, patient: newPatient };
}

// Login function
function login(email, password) {
    // Ensure storage is initialized
    initializeStorage();
    
    // Check doctors first
    const doctors = getDoctors();
    const doctor = doctors.find(d => d.email.toLowerCase() === email.toLowerCase() && d.password === password);
    if (doctor) {
        const session = {
            user: doctor,
            role: 'doctor',
            loggedInAt: new Date().toISOString()
        };
        localStorage.setItem('carepoint-session', JSON.stringify(session));
        return { success: true, user: doctor, role: 'doctor' };
    }
    
    // Check patients
    const patients = getPatients();
    const patient = patients.find(p => p.email.toLowerCase() === email.toLowerCase() && p.password === password);
    if (patient) {
        const session = {
            user: patient,
            role: 'patient',
            loggedInAt: new Date().toISOString()
        };
        localStorage.setItem('carepoint-session', JSON.stringify(session));
        return { success: true, user: patient, role: 'patient' };
    }
    
    return { success: false, message: 'Invalid email or password' };
}

// Logout function
function logout() {
    localStorage.removeItem('carepoint-session');
    window.location.href = 'index.html';
}

// Get current session
function getCurrentSession() {
    const session = localStorage.getItem('carepoint-session');
    return session ? JSON.parse(session) : null;
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentSession() !== null;
}

// Get current user
function getCurrentUser() {
    const session = getCurrentSession();
    return session ? session.user : null;
}

// Get current user role
function getCurrentUserRole() {
    const session = getCurrentSession();
    return session ? session.role : null;
}

// Update patient data
function updatePatient(patientId, updates) {
    const patients = getPatients();
    const index = patients.findIndex(p => p.id === patientId);
    
    if (index === -1) {
        return { success: false, message: 'Patient not found' };
    }
    
    patients[index] = { ...patients[index], ...updates };
    localStorage.setItem('carepoint-patients', JSON.stringify(patients));
    
    // Update session if current user
    const session = getCurrentSession();
    if (session && session.user.id === patientId) {
        session.user = patients[index];
        localStorage.setItem('carepoint-session', JSON.stringify(session));
    }
    
    return { success: true, patient: patients[index] };
}

// Add appointment to patient
function addPatientAppointment(patientId, appointmentData) {
    const patients = getPatients();
    const patient = patients.find(p => p.id === patientId);
    
    if (!patient) {
        return { success: false, message: 'Patient not found' };
    }
    
    if (!patient.appointments) {
        patient.appointments = [];
    }
    
    const appointment = {
        id: Date.now(),
        ...appointmentData,
        createdAt: new Date().toISOString()
    };
    
    patient.appointments.push(appointment);
    localStorage.setItem('carepoint-patients', JSON.stringify(patients));
    
    // Update session if current user
    const session = getCurrentSession();
    if (session && session.user.id === patientId) {
        session.user = patient;
        localStorage.setItem('carepoint-session', JSON.stringify(session));
    }
    
    return { success: true, appointment };
}

// Initialize on load
initializeStorage();

// Export functions to window for global access
window.auth = {
    registerPatient,
    login,
    logout,
    getCurrentSession,
    isLoggedIn,
    getCurrentUser,
    getCurrentUserRole,
    updatePatient,
    addPatientAppointment,
    getPatients,
    getDoctors,
    initializeStorage
};

