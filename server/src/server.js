const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
const path = require('path')
const pool = require('./config/database')
const User = require('./models/User')
const Quiz = require('./models/Quiz')
const Questions = require('./models/Question')
const Answers = require('./models/Answer')
const router = require('./routes/routers');
const ExamRoom = require('./models/ExamRoom');
const UserExam = require('./models/UserExam');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)

const initTable = async () => {
    await User()
    await Quiz()
    await Questions()
    await Answers()
    await ExamRoom()
    await UserExam()
    console.log('create table success')
}

(async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Database connected successfully');
        await initTable()
    } catch (error) {
        console.log(error);
    }
})()


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})