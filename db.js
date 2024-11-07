const { Client } = require('pg');
require('dotenv').config()

/**
 *  Database Configuration
*/

const client = new Client({
    host: process.env.DB_HOST,       
    port: process.env.DB_PORT || 5432, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = client;