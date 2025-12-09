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

// API Routes - Load routes first
try {
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/patients', require('./routes/patients'));
    app.use('/api/appointments', require('./routes/appointments'));
    app.use('/api/doctors', require('./routes/doctors'));
    console.log('API routes loaded successfully');
} catch (error) {
    console.error('Error loading API routes:', error);
    // Continue anyway - static files will still work
}

// Run migrations on startup (only if DATABASE_URL is set) - Don't block server start
if (process.env.DATABASE_URL) {
    (async () => {
        try {
            console.log('Running database migrations...');
            const migrate = require('./migrations/migrate');
            await migrate();
            console.log('Migrations completed successfully');
        } catch (error) {
            console.error('Migration error:', error.message);
            console.error('Server will continue, but database features may not work');
        }
    })();
} else {
    console.warn('WARNING: DATABASE_URL not set. Database features will not work.');
    console.warn('Please add DATABASE_URL environment variable in Railway settings.');
}

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

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Server is ready to accept connections`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

