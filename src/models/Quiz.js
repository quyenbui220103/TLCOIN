const pool = require('../config/database')
const mysql = require('mysql2/promise');

const Quiz = async () => {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS QUIZ (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    title VARCHAR(255),
                    description TEXT,
                    exam_duration INT NOT NULL DEFAULT 60,
                    created_by_teacher INT NOT NULL,
                    level INT NOT NULL DEFAULT 0, -- 0: Easy, 1: Middle, 2: Hard
                    FOREIGN KEY (created_by_teacher) REFERENCES Users(id) )`
        await pool.query(sql)
    } catch (error) {
        console.log(error)
    }
}

module.exports = Quiz 