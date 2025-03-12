const express = require('express')
const { addNewQuestionsService, getQuestionsByQuizService, updateQuestionsService, deleteQuestionsService } = require('../services/questionService')

const addNewQuestions = async (req, res) => {
    try {
        let dataArr = req.body
        let data = await addNewQuestionsService(dataArr)
        res.status(200).json({
            EC: 0,
            EM: 'Added new questions',
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const getQuestionsByQuiz = async (req, res) => {
    try {
        let { quiz_id } = req.body
        let data = await getQuestionsByQuizService(quiz_id)
        res.status(200).json({
            EC: 0,
            EM: 'Question for Quiz',
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

const updateQuestions = async (req, res) => {
    try {
        let { question_text, question_type, difficulty_level, id } = req.body
        let data = await updateQuestionsService(question_text, question_type, difficulty_level, id)
        res.status(200).json({
            EC: 0,
            EM: 'updated questions',
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const deleteQuestions = async (req, res) => {
    try {
        let { id } = req.body
        await deleteQuestionsService(id)
        res.status(200).json({
            EC: 0,
            EM: 'delete question'
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
    addNewQuestions,
    getQuestionsByQuiz,
    updateQuestions,
    deleteQuestions
}