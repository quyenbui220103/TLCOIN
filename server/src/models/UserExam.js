const pool = require('../config/database')
const mysql = require('mysql2/promise');

const UserExam = async () => {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS User_Exam (
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    score FLOAT DEFAULT 0,
    completed_at DATETIME NULL,
    PRIMARY KEY (user_id, exam_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (exam_id) REFERENCES ExamRooms(id)
);`
        await pool.query(sql)
    } catch (error) {
        console.log(error)
    }
}

module.exports = UserExam