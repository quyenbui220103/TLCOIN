const pool = require('../config/database')

const getAllQuizService = async () => {
    const sql = 'select * from Quiz'
    let [rows] = await pool.execute(sql) //destructuring ra mảng chứa các object (bản ghi)
    return rows
}

const addNewQuizService = async (title, description, exam_duration, created_by_teacher, level) => {
    const sql = `insert into Quiz (title, description, exam_duration, created_by_teacher, level) values (?,?,?,?,?)`
    const [result] = await pool.execute(sql, [title, description, exam_duration, created_by_teacher, level]) // luôn đặt biến trong [] với prepared statement
    console.log(result)
    return result.insertId; //trả về id quiz
}

const deleteQuizService = async (quiz_id) => {
    const sql = `delete from Quiz where id=?`
    await pool.execute(sql, [quiz_id])
}

const createCompletedQuizService = async (quiz_id, questions) => {
    const questionData = questions.map((item) => {
        return [item.question_text, quiz_id] //cần là mảng các mảng câu hỏi để chạy bulk insert
    })

    const sqlQuestions = `insert into Questions (question_text,quiz_id) values ?`
    const [result] = await pool.query(sqlQuestions, [questionData]) //query() sẽ trả về array chứa các object nên cần destructring array
    // result là biến object và chỉ chứa info của insertId ĐẦU TIÊN được insert

    //tạo mảng chứa các qs_id vừa tạo:
    const questionIdArr = questions.map((item, index) => {
        return result.insertId + index //mảng bắt đầu từ Id đầu tiên được insert
    }); // có thể thay item = _ để hiểu là biến dữ chỗ và không dùng đến 


    // answerData sau flatMap():  [  [ans,isCorrect,qs_id],[],...  ] 
    // là xóa 2 cái ngoặc [] bên trong vì khi này questions chỉ là array CHỨA 1 PHẦN TỬ
    const answerData = questions.flatMap((item, index) => {
        //questions sau khi map(): [ [[ans,isCorrect,qs_id],[],...] ] *khi này questions là 1 array có 1 phần tử 
        //vì questions ban đầu là 1 array
        return item.answers.map((a) => {
            return [a.answer, a.isCorrect, questionIdArr[index]]
            //map() trả về [[ans,isCorrect,qs_id],[],...]
        })
    })

    //cả flatMap() và map() đều chỉ tương tác với TỪNG PHẦN TỬ LẦN LƯỢT

    const sqlAnswers = `insert into Answers (answer,isCorrect,question_id) values ?`
    await pool.query(sqlAnswers, [answerData])

    // format cần đưa vào query: [ [ [...], [...], [...] ] ]
}

const getFullQuizService = async (quiz_id) => {
    const sql = ` SELECT 
                q.id AS question_id, 
                q.question_text, 
                a.id AS answer_id, 
                a.answer, 
                a.isCorrect
                FROM Questions AS q
                INNER JOIN Answers AS a ON q.id = a.question_id
                WHERE q.quiz_id = ?; `
    let [rows] = await pool.execute(sql, [quiz_id]) //destructuring ra mảng chứa các object (bản ghi)
    return rows
}

module.exports = {
    getAllQuizService,
    addNewQuizService,
    deleteQuizService,
    createCompletedQuizService,
    getFullQuizService
}