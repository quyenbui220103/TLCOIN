const pool = require('../config/database')

const getExamByUserService = async (user_id, exam_id) => {
    const sql = `select * from User_Exam where user_id = ? and exam_id = ? `
    const [rows] = await pool.execute(sql, [user_id, exam_id])
    return rows
}

const createNewExamForUserService = async (user_id, exam_id) => {
    const sql = `insert into User_Exam (user_id, exam_id) values (?,?)`
    await pool.execute(sql, [user_id, exam_id])
}

const updateResultTestService = async (score, timeNow, exam_id, user_id,) => {
    console.log(score, timeNow, exam_id, user_id)
    const sql = `update User_Exam set score = ?,completed_at = ? where exam_id = ? and user_id = ?`
    await pool.execute(sql, [score, timeNow, exam_id, user_id])
}

const getResultForExamService = async (exam_id, user_id) => {
    const sql = ` select rs.score,rs.completed_at,quiz.title
                from User_Exam rs
                JOIN ExamRooms ON ExamRooms.id = rs.exam_id
                JOIN quiz ON quiz.id = ExamRooms.quiz_id
                where rs.exam_id= ? and rs.user_id = ?`
    const [rows] = await pool.execute(sql, [exam_id, user_id])
    return rows[0] //để trả về object (phần tử đàu trong array rows)
}

const getAllTestsResultService = async (user_id) => {
    const sql = `select rs.user_id, rs.score, rs.completed_at, ExamRooms.id, ExamRooms.room_name, ExamRooms.quiz_id, quiz.title 
                from User_Exam rs
                JOIN ExamRooms ON ExamRooms.id = rs.exam_id
                JOIN quiz ON quiz.id = ExamRooms.quiz_id
                where rs.user_id = ?`
    const [rows] = await pool.execute(sql, [user_id])
    return rows
}
module.exports = {
    getExamByUserService,
    createNewExamForUserService,
    updateResultTestService,
    getResultForExamService,
    getAllTestsResultService
}