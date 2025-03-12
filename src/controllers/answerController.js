const express = require('express')
const { addNewAnswersService, getAnswersByQsService, updateAnswersService, deleteAnswersService } = require('../services/answerService')

const addNewAnswers = async (req, res) => {
    try {
        let dataArr = req.body
        let data = await addNewAnswersService(dataArr)
        res.status(200).json({
            EC: 0,
            EM: 'Added new Answers',
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const getAnswersByQs = async (req, res) => {
    try {
        let { question_id } = req.body
        let data = await getAnswersByQsService(question_id)
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

const updateAnswers = async (req, res) => {
    try {
        let { answer, isCorrect, id } = req.body
        let data = await updateAnswersService(answer, isCorrect, id)
        res.status(200).json({
            EC: 0,
            EM: 'updated Answers',
        })
    } catch (error) {
        res.status(500).json({
            EC: 1,
            EM: 'Server Error',
            error: error
        })
    }
}

const deleteAnswers = async (req, res) => { }

module.exports = {
    addNewAnswers,
    getAnswersByQs,
    updateAnswers,
    deleteAnswers
}