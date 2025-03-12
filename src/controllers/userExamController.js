const { getAnswersByQsService, getFullAnswersForCheck } = require("../services/answerService");
const { updateResultTestService, getResultForExamService, getAllTestsResultService } = require("../services/userExamService");
const moment = require("moment-timezone");
const { convertToVietnamTime } = require("../ultis/convertTime");

const submitTest = async (req, res) => {
    try {
        let { exam_id, answers } = req.body;
        let user_id = req.user.id

        let qsIdArr = answers.map((item) => { return item.question_id }) // tạo mảng qs_id

        let allAns = await getFullAnswersForCheck(qsIdArr) // lấy tất cả đáp án theo câu hỏi

        let trueAns = []
        allAns.forEach((element) => {
            if (element.isCorrect === 1) {
                trueAns.push(element)
            }
        })

        let trueAnsMap = new Map(); //tạo map
        trueAns.forEach(ans => trueAnsMap.set(ans.question_id, ans.id)); //Map: { question_id => id } (key-value)

        let points = 0; numberOfQs = answers.length
        for (let i = 0; i < answers.length; i++) {
            let correctAnswer = trueAnsMap.get(answers[i].question_id); // Lấy đáp án đúng (get sẽ lấy value của key => lấy id của answer đúng theo id câu hỏi)
            if (correctAnswer === answers[i].answer_id) { // So sánh với đáp án user chọn
                points += 1;
            }
        }
        //console.log(score);
        // for (let i = 0; i < answers.length; i++) {
        //     if (trueAns[i].question_id == answers[i].question_id && trueAns[i].id == answers[i].answer_id) {
        //         score += 1;
        //     }
        // }
        let score = (10 / numberOfQs) * points
        let timeNow = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");; //Lấy time hiện tại
        await updateResultTestService(score, timeNow, exam_id, user_id)
        return res.status(200).json({
            EC: 0,
            EM: "You submitted Test",
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            EM: "Server Error",
        })
    }

}

const getResultTest = async (req, res) => {
    try {
        let { exam_id } = req.body;
        let user_id = req.user.id

        let data = await getResultForExamService(exam_id, user_id)
        timeVN = convertToVietnamTime(data.completed_at) // đổi time về VN trước khi gửi respone
        res.status(200).json({
            EC: 0,
            EM: 'Result',
            DT: {
                "score": data.score,
                "completed_at": timeVN,
                "title": data.title
            }
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const getAllTestsResult = async (req, res) => {
    try {
        let user_id = req.user.id
        let data = await getAllTestsResultService(user_id)
        res.status(200).json({
            EC: 0,
            EM: 'Tests History',
            DT: data
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}
module.exports = {
    submitTest,
    getResultTest,
    getAllTestsResult
}