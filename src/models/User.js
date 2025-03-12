const pool = require('../config/database')
const mysql = require('mysql2/promise');

const User = async () => {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL, 
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    phone_number VARCHAR(20), 
                    gender BOOLEAN, 
                    education_level VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await pool.query(sql)
    } catch (error) {
        console.log(error)
    }
}

module.exports = User