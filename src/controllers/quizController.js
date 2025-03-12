const express = require('express')
const { addNewQuizService, getAllQuizService, deleteQuizService, createCompletedQuizService, getFullQuizService } = require('../services/quizService')

const getAllQuiz = async (req, res) => {
    try {
        let data = await getAllQuizService()
        res.status(200).json({
            EC: 0,
            EM: 'Get Quiz List',
            DT: data
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const addNewQuiz = async (req, res) => {
    try {
        let { title, description, exam_duration, created_by_teacher, level } = req.body

        let data = await addNewQuizService(title, description, exam_duration, created_by_teacher, level)
        res.status(200).json({
            EC: 0,
            EM: 'Added new quiz',
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const deleteQuiz = async (req, res) => {
    try {
        let { id } = req.body
        await deleteQuizService(id)
        res.status(200).json({
            EC: 0,
            EM: 'delete quiz'
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const createCompletedQuiz = async (req, res) => {
    try {
        let { quiz_id, questions } = req.body
        //console.log('questions:', JSON.stringify(questions))
        let data = await createCompletedQuizService(quiz_id, questions)
        console.log(data)
        return res.status(200).json({
            EC: 0,
            EM: "Completed Quiz Created"
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const getFullQuizById = async (req, res) => {
    try {
        let quiz_id = req.params.id
        let data = await getFullQuizService(quiz_id)
        //console.log(data)
        let results = {}
        data.forEach((element) => {
            const { question_id, question_text, answer_id, answer, isCorrect } = element; //destructring
            // nếu không bị trùng question_id thì tạo mới object question và khởi tạo khi chưa tồn tại
            // luôn dùng if (!something) khi cần kiểm tra và tạo mới (findOrCreate)
            if (!results[question_id]) {
                results[question_id] = {
                    question_id: question_id,
                    question_text: question_text,
                    answers: []
                }
            } else {
                // trùng question_id thì thêm câu trả lời vào answers array
                results[question_id].answers.push({ answer_id: answer_id, answer: answer, isCorrect: isCorrect })
            }
        });

        let finalData = Object.values(results) // biến results thành array

        return res.status(200).json({
            EC: 0,
            EM: 'get qs and ans for quiz',
            DT: finalData
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

module.exports = {
    getAllQuiz,
    addNewQuiz,
    deleteQuiz,
    createCompletedQuiz,
    getFullQuizById
}