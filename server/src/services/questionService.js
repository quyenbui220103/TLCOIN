const pool = require('../config/database')
const addNewQuestionsService = async (qs) => {
    const sql = `insert into Questions (question_text,question_type,difficulty_level,quiz_id) values ?` //bulk insert + array
    // chỉ có .query(sql,[]) hỗ trợ bulk insert
    // Phải bọc thêm [] vào qs vì sql yêu cầu mảng chứa mảng
    await pool.query(sql, [qs])

}

const getQuestionsByQuizService = async (quiz_id) => {
    const sql = 'select * from Questions where quiz_id = ?'
    let [rows] = await pool.execute(sql, [quiz_id]) //destructuring
    return rows
}

const updateQuestionsService = async (question_text, question_type, difficulty_level, id) => {
    const sql = `update Questions set question_text= ?, question_type=?,difficulty_level=? where id= ?`
    await pool.execute(sql, [question_text, question_type, difficulty_level, id])
}

const deleteQuestionsService = async (id) => {
    const sql = `delete from Questions where id=?`
    await pool.execute(sql, [id])
}

module.exports = {
    addNewQuestionsService,
    getQuestionsByQuizService,
    updateQuestionsService,
    deleteQuestionsService
}