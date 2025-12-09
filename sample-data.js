// Sample Patient Data Generator
// This file generates sample patient data for testing and demonstration

const samplePatients = [
    {
        id: 1001,
        email: 'ahmed.mohammed@example.com',
        password: 'patient123',
        name: 'Ahmed Mohammed',
        phone: '+20 100 123 4567',
        dateOfBirth: '1985-03-15',
        gender: 'male',
        address: '123 Tahrir Square, Cairo, Egypt',
        medicalHistory: 'Hypertension, Type 2 Diabetes. Regular medication: Metformin, Lisinopril.',
        bloodType: 'A+',
        allergies: 'Penicillin, Shellfish',
        role: 'patient',
        registeredAt: '2024-01-15T10:30:00.000Z',
        emergencyContact: {
            name: 'Fatima Mohammed',
            phone: '+20 100 123 4568',
            relationship: 'Spouse'
        },
        appointments: [
            {
                id: 1,
                doctor: 'Dr. Ahmed Al-Rashid',
                doctorId: 1,
                date: '2024-12-20',
                time: '15:00',
                notes: 'Follow-up for hypertension management'
            },
            {
                id: 2,
                doctor: 'Dr. Ahmed Al-Rashid',
                doctorId: 1,
                date: '2024-12-25',
                time: '16:30',
                notes: 'Annual checkup'
            }
        ]
    },
    {
        id: 1002,
        email: 'sara.ali@example.com',
        password: 'patient123',
        name: 'Sara Ali',
        phone: '+20 101 234 5678',
        dateOfBirth: '1992-07-22',
        gender: 'female',
        address: '456 Zamalek, Cairo, Egypt',
        medicalHistory: 'Migraine headaches, occasional. No chronic conditions.',
        bloodType: 'B-',
        allergies: 'None',
        role: 'patient',
        registeredAt: '2024-02-10T14:20:00.000Z',
        emergencyContact: {
            name: 'Mohammed Ali',
            phone: '+20 101 234 5679',
            relationship: 'Brother'
        },
        appointments: [
            {
                id: 3,
                doctor: 'Dr. Mohammed Al-Sayed',
                doctorId: 3,
                date: '2024-12-18',
                time: '17:00',
                notes: 'Migraine consultation'
            },
            {
                id: 4,
                doctor: 'Dr. Mohammed Al-Sayed',
                doctorId: 3,
                date: '2024-12-22',
                time: '18:00',
                notes: 'Follow-up appointment'
            }
        ]
    },
    {
        id: 1003,
        email: 'omar.hassan@example.com',
        password: 'patient123',
        name: 'Omar Hassan',
        phone: '+20 102 345 6789',
        dateOfBirth: '1978-11-05',
        gender: 'male',
        address: '789 Maadi, Cairo, Egypt',
        medicalHistory: 'Previous knee surgery (2020), Sports injury history.',
        bloodType: 'O+',
        allergies: 'Ibuprofen',
        role: 'patient',
        registeredAt: '2024-01-20T09:15:00.000Z',
        emergencyContact: {
            name: 'Layla Hassan',
            phone: '+20 102 345 6790',
            relationship: 'Wife'
        },
        appointments: [
            {
                id: 5,
                doctor: 'Dr. Khalid Al-Mahmoud',
                doctorId: 5,
                date: '2024-12-19',
                time: '15:30',
                notes: 'Knee pain evaluation'
            },
            {
                id: 6,
                doctor: 'Dr. Layla Al-Ahmad',
                doctorId: 6,
                date: '2024-12-21',
                time: '16:00',
                notes: 'Sports medicine consultation'
            }
        ]
    },
    {
        id: 1004,
        email: 'nour.ibrahim@example.com',
        password: 'patient123',
        name: 'Nour Ibrahim',
        phone: '+20 103 456 7890',
        dateOfBirth: '1995-04-18',
        gender: 'female',
        address: '321 Heliopolis, Cairo, Egypt',
        medicalHistory: 'Eczema, seasonal allergies. Using topical corticosteroids.',
        bloodType: 'AB+',
        allergies: 'Dust, Pollen, Latex',
        role: 'patient',
        registeredAt: '2024-02-05T11:45:00.000Z',
        emergencyContact: {
            name: 'Ibrahim Nour',
            phone: '+20 103 456 7891',
            relationship: 'Father'
        },
        appointments: [
            {
                id: 7,
                doctor: 'Dr. Youssef Al-Khatib',
                doctorId: 9,
                date: '2024-12-20',
                time: '17:30',
                notes: 'Skin condition checkup'
            }
        ]
    },
    {
        id: 1005,
        email: 'youssef.mahmoud@example.com',
        password: 'patient123',
        name: 'Youssef Mahmoud',
        phone: '+20 104 567 8901',
        dateOfBirth: '1988-09-12',
        gender: 'male',
        address: '654 Nasr City, Cairo, Egypt',
        medicalHistory: 'Asthma, controlled with inhaler. No other conditions.',
        bloodType: 'A-',
        allergies: 'Dust mites',
        role: 'patient',
        registeredAt: '2024-01-28T13:30:00.000Z',
        emergencyContact: {
            name: 'Mariam Mahmoud',
            phone: '+20 104 567 8902',
            relationship: 'Sister'
        },
        appointments: [
            {
                id: 8,
                doctor: 'Dr. Ahmed Al-Rashid',
                doctorId: 1,
                date: '2024-12-19',
                time: '18:30',
                notes: 'Cardiac evaluation'
            }
        ]
    },
    {
        id: 1006,
        email: 'layla.ahmed@example.com',
        password: 'patient123',
        name: 'Layla Ahmed',
        phone: '+20 105 678 9012',
        dateOfBirth: '1990-06-25',
        gender: 'female',
        address: '987 Dokki, Cairo, Egypt',
        medicalHistory: 'Regular gynecological checkups. No significant medical history.',
        bloodType: 'B+',
        allergies: 'None',
        role: 'patient',
        registeredAt: '2024-02-12T15:00:00.000Z',
        emergencyContact: {
            name: 'Ahmed Layla',
            phone: '+20 105 678 9013',
            relationship: 'Husband'
        },
        appointments: [
            {
                id: 9,
                doctor: 'Dr. Zainab Al-Qasimi',
                doctorId: 12,
                date: '2024-12-20',
                time: '15:00',
                notes: 'Annual gynecological exam'
            },
            {
                id: 10,
                doctor: 'Dr. Zainab Al-Qasimi',
                doctorId: 12,
                date: '2024-12-24',
                time: '16:00',
                notes: 'Follow-up consultation'
            }
        ]
    },
    {
        id: 1007,
        email: 'mohammed.khalil@example.com',
        password: 'patient123',
        name: 'Mohammed Khalil',
        phone: '+20 106 789 0123',
        dateOfBirth: '1982-12-08',
        gender: 'male',
        address: '147 New Cairo, Cairo, Egypt',
        medicalHistory: 'High cholesterol, managed with diet and medication.',
        bloodType: 'O-',
        allergies: 'None',
        role: 'patient',
        registeredAt: '2024-01-10T10:00:00.000Z',
        emergencyContact: {
            name: 'Khalil Mohammed',
            phone: '+20 106 789 0124',
            relationship: 'Brother'
        },
        appointments: [
            {
                id: 11,
                doctor: 'Dr. Fatima Al-Zahra',
                doctorId: 2,
                date: '2024-12-18',
                time: '19:00',
                notes: 'Cardiac consultation'
            }
        ]
    },
    {
        id: 1008,
        email: 'fatima.youssef@example.com',
        password: 'patient123',
        name: 'Fatima Youssef',
        phone: '+20 107 890 1234',
        dateOfBirth: '1993-02-14',
        gender: 'female',
        address: '258 6th October City, Cairo, Egypt',
        medicalHistory: 'Anemia, taking iron supplements. Regular monitoring required.',
        bloodType: 'A+',
        allergies: 'None',
        role: 'patient',
        registeredAt: '2024-02-08T12:15:00.000Z',
        emergencyContact: {
            name: 'Youssef Fatima',
            phone: '+20 107 890 1235',
            relationship: 'Father'
        },
        appointments: [
            {
                id: 12,
                doctor: 'Dr. Omar Al-Hassan',
                doctorId: 7,
                date: '2024-12-21',
                time: '17:00',
                notes: 'Pediatric follow-up (for child)'
            }
        ]
    }
];

// Function to initialize sample data
function initializeSampleData() {
    // Check if sample data already exists
    const existingPatients = localStorage.getItem('carepoint-patients');
    const patients = existingPatients ? JSON.parse(existingPatients) : [];
    
    // Check if sample patients already exist
    const hasSampleData = patients.some(p => p.id >= 1001 && p.id <= 1008);
    
    if (!hasSampleData) {
        // Add sample patients
        samplePatients.forEach(patient => {
            // Check if patient with this email already exists
            const exists = patients.find(p => p.email === patient.email);
            if (!exists) {
                patients.push(patient);
            }
        });
        
        localStorage.setItem('carepoint-patients', JSON.stringify(patients));
        console.log('Sample patient data initialized');
        return true;
    }
    return false;
}

// Initialize on load
if (typeof window !== 'undefined') {
    initializeSampleData();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { samplePatients, initializeSampleData };
}

