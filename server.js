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

// Health check endpoint (before everything else)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// API Routes - MUST be loaded BEFORE static files
try {
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/patients', require('./routes/patients'));
    app.use('/api/appointments', require('./routes/appointments'));
    app.use('/api/doctors', require('./routes/doctors'));
    app.use('/api/migrate', require('./routes/migrate'));
    console.log('✓ API routes loaded successfully');
} catch (error) {
    console.error('✗ Error loading API routes:', error);
    console.error('Stack:', error.stack);
    // Continue anyway - static files will still work
}

// Serve static files (AFTER API routes)
try {
    app.use(express.static(path.join(__dirname), {
        index: false, // Don't auto-serve index.html
        dotfiles: 'ignore'
    }));
    console.log('✓ Static file serving configured');
} catch (error) {
    console.error('✗ Error configuring static files:', error);
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

// Serve index.html for all non-API routes (SPA fallback)
// This MUST be after API routes and static files
app.get('*', (req, res, next) => {
    // Skip API routes and health check
    if (req.path.startsWith('/api/') || req.path === '/health') {
        return next();
    }
    
    const indexPath = path.join(__dirname, 'index.html');
    console.log(`Serving index.html for: ${req.path}`);
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            if (err.code === 'ENOENT') {
                res.status(404).send('index.html not found');
            } else {
                res.status(500).send('Error loading page');
            }
        }
    });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error('Error:', err);
    console.error('Stack:', err.stack);
    
    // Don't send error if response already sent
    if (res.headersSent) {
        return next(err);
    }
    
    // API routes - return JSON
    if (req.path.startsWith('/api/')) {
        return res.status(err.status || 500).json({ 
            success: false, 
            message: err.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
    
    // Other routes - return error page
    res.status(err.status || 500).send(`
        <html>
            <head><title>Error</title></head>
            <body>
                <h1>Error ${err.status || 500}</h1>
                <p>${err.message || 'Internal server error'}</p>
            </body>
        </html>
    `);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    console.error('Stack:', error.stack);
    // Don't exit - let Railway handle it
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
    // Don't exit - let Railway handle it
});

// Start server
console.log('Starting server...');
console.log(`Port: ${PORT}`);
console.log(`Node version: ${process.version}`);
console.log(`Working directory: ${__dirname}`);
console.log(`Files in directory:`, require('fs').readdirSync(__dirname).slice(0, 10).join(', '));

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ Server is ready to accept connections`);
    console.log(`✓ Static files serving from: ${__dirname}`);
    console.log(`✓ Health check available at: /health`);
    console.log(`✓ Server started successfully at ${new Date().toISOString()}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    }
    // Don't exit - let Railway restart
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

