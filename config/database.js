const { Pool } = require('pg');
require('dotenv').config();

// Create pool only if DATABASE_URL exists
let pool;

if (process.env.DATABASE_URL) {
    try {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            // Connection pool settings
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
        
        // Test connection
        pool.on('connect', () => {
            console.log('✓ Connected to PostgreSQL database');
        });
        
        pool.on('error', (err) => {
            console.error('Database pool error:', err);
            // Don't exit - let the app continue
        });
    } catch (error) {
        console.error('Failed to create database pool:', error);
        pool = null;
    }
} else {
    // Create a dummy pool that will fail gracefully
    console.warn('⚠ DATABASE_URL not set - database features disabled');
    pool = {
        query: () => Promise.reject(new Error('DATABASE_URL not configured')),
        end: () => Promise.resolve(),
        on: () => {} // Dummy event handler
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

