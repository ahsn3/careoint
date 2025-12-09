// Authentication API wrapper - Uses backend API instead of localStorage
// This file provides backward compatibility with existing auth.js interface

// Check if API client is available, fallback to localStorage
const useAPI = typeof window !== 'undefined' && window.apiClient;

// Register a new patient
async function registerPatient(patientData) {
    if (useAPI) {
        try {
            return await window.apiClient.registerPatient(patientData);
        } catch (error) {
            return { success: false, message: error.message || 'Registration failed' };
        }
    }
    // Fallback to localStorage (for development)
    return registerPatientLocal(patientData);
}

// Login function
async function login(email, password, role = 'patient') {
    if (useAPI) {
        try {
            return await window.apiClient.login(email, password, role);
        } catch (error) {
            return { success: false, message: error.message || 'Login failed' };
        }
    }
    // Fallback to localStorage
    return loginLocal(email, password, role);
}

// Logout function
function logout() {
    if (useAPI) {
        window.apiClient.clearSession();
    } else {
        localStorage.removeItem('carepoint-session');
    }
    window.location.href = 'index.html';
}

// Check if user is logged in
function isLoggedIn() {
    if (useAPI) {
        const session = window.apiClient.getSession();
        return session !== null;
    }
    return getCurrentSession() !== null;
}

// Get current user
function getCurrentUser() {
    if (useAPI) {
        const session = window.apiClient.getSession();
        return session ? session.user : null;
    }
    const session = getCurrentSession();
    return session ? session.user : null;
}

// Get current user role
function getCurrentUserRole() {
    if (useAPI) {
        const session = window.apiClient.getSession();
        return session ? session.role : null;
    }
    const session = getCurrentSession();
    return session ? session.role : null;
}

// Get all patients (for doctor dashboard)
async function getPatients() {
    if (useAPI) {
        try {
            return await window.apiClient.getPatients();
        } catch (error) {
            console.error('Failed to fetch patients:', error);
            return [];
        }
    }
    // Fallback to localStorage
    const patients = localStorage.getItem('carepoint-patients');
    return patients ? JSON.parse(patients) : [];
}

// Get all doctors
async function getDoctors() {
    if (useAPI) {
        try {
            return await window.apiClient.getDoctors();
        } catch (error) {
            console.error('Failed to fetch doctors:', error);
            return [];
        }
    }
    // Fallback to localStorage/doctors.js
    if (typeof doctors !== 'undefined') {
        return doctors;
    }
    const doctorsData = localStorage.getItem('carepoint-doctors');
    return doctorsData ? JSON.parse(doctorsData) : [];
}

// LocalStorage fallback functions
function getCurrentSession() {
    const sessionStr = localStorage.getItem('carepoint-session');
    return sessionStr ? JSON.parse(sessionStr) : null;
}

function registerPatientLocal(patientData) {
    const patients = JSON.parse(localStorage.getItem('carepoint-patients') || '[]');
    
    if (patients.find(p => p.email === patientData.email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    const newPatient = {
        id: Date.now(),
        email: patientData.email,
        password: patientData.password,
        name: patientData.name,
        phone: patientData.phone,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        address: patientData.address || '',
        medicalHistory: patientData.medicalHistory || '',
        bloodType: patientData.bloodType || '',
        allergies: patientData.allergies || '',
        role: 'patient',
        registeredAt: new Date().toISOString(),
        appointments: [],
        emergencyContact: {
            name: patientData.emergencyContactName || '',
            phone: patientData.emergencyContactPhone || '',
            relationship: patientData.emergencyContactRelation || ''
        }
    };
    
    patients.push(newPatient);
    localStorage.setItem('carepoint-patients', JSON.stringify(patients));
    
    return { success: true, patient: newPatient };
}

function loginLocal(email, password, role) {
    let users;
    if (role === 'doctor') {
        users = JSON.parse(localStorage.getItem('carepoint-doctors') || '[]');
    } else {
        users = JSON.parse(localStorage.getItem('carepoint-patients') || '[]');
    }
    
    const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
    );
    
    if (!user) {
        return { success: false, message: 'Invalid email or password' };
    }
    
    const session = {
        userId: user.id,
        user: user,
        role: role,
        timestamp: Date.now()
    };
    
    localStorage.setItem('carepoint-session', JSON.stringify(session));
    
    return { success: true, user: user, role: role };
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.auth = {
        registerPatient,
        login,
        logout,
        isLoggedIn,
        getCurrentUser,
        getCurrentUserRole,
        getPatients,
        getDoctors
    };
}

