# Care Point Medical Center

A comprehensive medical appointment booking system with patient and doctor dashboards.

## Features

- Patient registration and authentication
- Doctor authentication and dashboard
- Appointment booking system
- Multi-language support (English, Arabic, Turkish)
- Patient management system
- Analytics dashboard for doctors

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Deployment**: Railway

## Setup Instructions

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard:
   - `DATABASE_URL` (Railway will provide PostgreSQL URL)
   - `JWT_SECRET` (generate a random secret)
   - `NODE_ENV=production`
   - `PORT` (Railway will set this automatically)

3. Railway will automatically:
   - Install dependencies
   - Run migrations
   - Start the server

## Default Doctor Accounts

- Email: `ahmed.rashid@carepoint.com`
- Password: `doctor123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new patient
- `POST /api/auth/login` - Login (patient or doctor)
- `GET /api/auth/me` - Get current user

### Patients
- `GET /api/patients` - Get all patients (doctor only)
- `GET /api/patients/:id` - Get patient details

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/patient/:patientId` - Get patient appointments

### Doctors
- `GET /api/doctors` - Get all doctors

## License

ISC

