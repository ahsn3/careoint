// API Client for backend communication
const API_BASE_URL = window.location.origin + '/api';

class APIClient {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Get auth headers
    getAuthHeaders() {
        const session = this.getSession();
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (session) {
            headers['x-user-id'] = session.userId;
            headers['x-user-role'] = session.role;
        }
        
        return headers;
    }

    // Get session from localStorage
    getSession() {
        const sessionStr = localStorage.getItem('carepoint-session');
        return sessionStr ? JSON.parse(sessionStr) : null;
    }

    // Save session
    saveSession(user, role) {
        const session = {
            userId: user.id,
            user: user,
            role: role,
            timestamp: Date.now()
        };
        localStorage.setItem('carepoint-session', JSON.stringify(session));
    }

    // Clear session
    clearSession() {
        localStorage.removeItem('carepoint-session');
    }

    // API request helper
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                ...this.getAuthHeaders(),
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async registerPatient(patientData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(patientData)
        });
    }

    async login(email, password, role) {
        const result = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, role })
        });
        
        if (result.success) {
            this.saveSession(result.user, result.role);
        }
        
        return result;
    }

    async getCurrentUser() {
        try {
            const result = await this.request('/auth/me');
            if (result.success) {
                this.saveSession(result.user, result.user.role);
            }
            return result;
        } catch (error) {
            this.clearSession();
            return { success: false };
        }
    }

    // Patient endpoints
    async getPatients() {
        const result = await this.request('/patients');
        return result.success ? result.patients : [];
    }

    async getPatient(id) {
        const result = await this.request(`/patients/${id}`);
        return result.success ? result.patient : null;
    }

    // Appointment endpoints
    async createAppointment(appointmentData) {
        return this.request('/appointments', {
            method: 'POST',
            body: JSON.stringify(appointmentData)
        });
    }

    async getPatientAppointments(patientId) {
        const result = await this.request(`/appointments/patient/${patientId}`);
        return result.success ? result.appointments : [];
    }

    // Doctor endpoints
    async getDoctors() {
        const result = await this.request('/doctors');
        return result.success ? result.doctors : [];
    }
}

// Create global API client instance
window.apiClient = new APIClient();

