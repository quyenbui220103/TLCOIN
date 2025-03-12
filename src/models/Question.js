const pool = require('../config/database')
const mysql = require('mysql2/promise');

const Questions = async () => {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS Questions (
                    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                    question_text TEXT NOT NULL,
                    question_type VARCHAR(255),
                    difficulty_level VARCHAR(255),
                    quiz_id INT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (quiz_id) REFERENCES Quiz(id) ON DELETE CASCADE ) `;
        await pool.query(sql)
    } catch (error) {
        console.log(error)
    }
}

module.exports = Questions