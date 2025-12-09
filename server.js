const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Check for required environment variables
if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
    console.error('ERROR: DATABASE_URL is required in production!');
    console.error('Please set DATABASE_URL in Railway environment variables.');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Run migrations on startup
(async () => {
    try {
        console.log('Running database migrations...');
        const migrate = require('./migrations/migrate');
        await migrate();
        console.log('Migrations completed');
    } catch (error) {
        console.error('Migration error:', error.message);
        // Don't exit - allow server to start even if migrations fail
        // This allows the app to work if DATABASE_URL is set later
    }
})();

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/doctors', require('./routes/doctors'));

// Serve index.html for all routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

