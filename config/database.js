const { Pool } = require('pg');
require('dotenv').config();

// Create pool only if DATABASE_URL exists
let pool;

if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
} else {
    // Create a dummy pool that will fail gracefully
    console.warn('DATABASE_URL not set - creating dummy pool');
    pool = {
        query: () => Promise.reject(new Error('DATABASE_URL not configured')),
        end: () => Promise.resolve()
    };
}

// Test connection
pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    // Don't exit in production - let Railway handle restarts
    if (process.env.NODE_ENV !== 'production') {
        process.exit(-1);
    }
});

module.exports = pool;

