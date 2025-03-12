const pool = require('../config/database')

const addNewAnswersService = async (ans) => {
    const sql = `insert into Answers (answer,isCorrect,question_id) values ?` //bulk insert + array
    //đánh dấu ans là 1 array cho sql
    // chỉ có .query([]) hỗ trợ bulk insert
    await pool.query(sql, [ans])

}

const getAnswersByQsService = async (question_id) => {
    const sql = 'select * from Answers where question_id = ?'
    let [rows] = await pool.execute(sql, [question_id]) //destructuring
    return rows
}

const updateAnswersService = async (answer, isCorrect, id) => {
    const sql = `update Answers set answer=?, isCorrect=? where id= ?`
    await pool.execute(sql, [answer, isCorrect, id])
}

const deleteAnswersService = async () => {

}

const getFullAnswersForCheck = async (question_id) => {
    try {
        const values = question_id.map(() => '?').join(','); // tạo số dấu ? tương ứng với số phần từ truyền vào

        const sql = `select * from Answers where question_id in (${values})` // dùng in để lấy theo danh sách điều kiện

        let [rows] = await pool.execute(sql, question_id) // IN chỉ yêu cầu mảng 2D [ , ]; khác với bulk insert
        return rows
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    addNewAnswersService,
    getAnswersByQsService,
    updateAnswersService,
    deleteAnswersService,
    getFullAnswersForCheck
}