const pool = require('../config/database')
const mysql = require('mysql2/promise');

const ExamRoom = async () => {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS ExamRooms (
                    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                    room_name VARCHAR(255) NOT NULL,
                    start_time DATETIME NOT NULL,
                    end_time DATETIME NOT NULL,
                    created_by_teacher INT NOT NULL,
                    quiz_id INT NOT NULL,
                    FOREIGN KEY (created_by_teacher) REFERENCES Users(id),
                    FOREIGN KEY (quiz_id) REFERENCES Quiz(id)
                );`
        await pool.query(sql)
    } catch (error) {
        console.log(error)
    }
}

module.exports = ExamRoom