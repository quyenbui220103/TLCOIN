const pool = require('../config/database')
const mysql = require('mysql2/promise');

const Answers = async () => {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS Answers (
            id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
            answer VARCHAR(500) NOT NULL,
            isCorrect BOOLEAN NOT NULL DEFAULT FALSE,
            question_id INT NOT NULL,
            FOREIGN KEY (question_id) REFERENCES Questions(id) ON DELETE CASCADE
        );`;
        await pool.query(sql)
    } catch (error) {
        console.log(error)
    }
}

module.exports = Answers