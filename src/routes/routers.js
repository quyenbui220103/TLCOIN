
const express = require('express')
const router = express.Router()
const { getAllQuiz, addNewQuiz, deleteQuiz, createCompletedQuiz, getFullQuizById } = require('../controllers/quizController');
const { addNewQuestions, updateQuestions, deleteQuestions, getQuestionsByQuiz } = require('../controllers/questionController')
const { addNewAnswers, updateAnswers, deleteAnswers, getAnswersByQs } = require('../controllers/answerController');
const { createExamRoom, getExamRoomById, startDoQuiz, getAllRooms } = require('../controllers/examroomController');
const { submitTest, getResultTest, getAllTestsResult } = require('../controllers/userExamController');
const { authMiddle } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/checkRoles')

router.use(authMiddle) // áp middleware cho tất cả route

//quiz
router.get('/quiz', getAllQuiz)
router.post('/quiz', checkRole('Admin'), addNewQuiz)
router.delete('/quiz', checkRole('Admin'), deleteQuiz)
router.post('/quiz-create', checkRole('Admin'), createCompletedQuiz)
router.get('/quiz/:id', checkRole('Admin'), getFullQuizById)

//question
router.get('/question', getQuestionsByQuiz)
router.post('/question', checkRole('Admin'), addNewQuestions)
router.put('/question', checkRole('Admin'), updateQuestions)
router.delete('/question', checkRole('Admin'), deleteQuestions)

//answer
router.get('/answer', getAnswersByQs)
router.post('/answer', checkRole('Admin'), addNewAnswers)
router.put('/answer', checkRole('Admin'), updateAnswers)
//router.delete('/answer', deleteAnswers)

//examroom
router.get('/exam-room/:id', checkRole('User'), getExamRoomById)
router.get('/exam-room', checkRole('User'), getAllRooms)
router.post('/exam-room', checkRole('Admin'), createExamRoom)
router.post('/exam-room/:id/start', checkRole('User'), startDoQuiz)

//userExam
router.put('/exam-submit', checkRole('User'), submitTest)
router.get('/exam-result', checkRole('User'), getResultTest)
router.get('/exam-history', checkRole('User'), getAllTestsResult)

module.exports = router