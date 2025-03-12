const pool = require('../config/database')

const createExamRoomService = async (room_name, start_time, end_time, created_by_teacher, quiz_id) => {
    try {
        const sql = `INSERT INTO ExamRooms (room_name, start_time, end_time, created_by_teacher, quiz_id) VALUES (?,?,?,?,?);`
        let data = await pool.query(sql, [room_name, start_time, end_time, created_by_teacher, quiz_id])
    } catch (error) {
        console.log(error)
    }
}

const getExamRoomByIdService = async (id) => {
    const sql = `select * from ExamRooms where id = ?`
    const [rows] = await pool.query(sql, [id]) // lấy phần tử đầu tiên của mảng trả về trong lệch select (các bản ghi)
    return rows
}

const getAllRoomsService = async () => {
    const sql = `select * from ExamRooms`
    const [rows] = await pool.query(sql) // lấy phần tử đầu tiên của mảng trả về trong lệch select (các bản ghi)
    return rows
}
module.exports = {
    createExamRoomService,
    getExamRoomByIdService,
    getAllRoomsService
}