const { createExamRoomService, getExamRoomByIdService, getAllRoomsService } = require("../services/examroomService");
const { getExamByUserService, createNewExamForUserService } = require("../services/userExamService");
const { convertToVietnamTime } = require("../ultis/convertTime")
const moment = require("moment-timezone");

const createExamRoom = async (req, res) => {
    try {
        let { room_name, start_time, end_time, created_by_teacher, quiz_id } = req.body

        await createExamRoomService(room_name, start_time, end_time, created_by_teacher, quiz_id)

        return res.status(200).json({
            EC: 0,
            EM: "Created Room",
        })
    } catch (error) {

    }

}

const getExamRoomById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await getExamRoomByIdService(id);
        return res.status(200).json({
            EC: 0,
            EM: "Room Info",
            DT: data
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            EM: "Server Error",
        })
    }
}

const getAllRooms = async (req, res) => {
    try {
        let data = await getAllRoomsService();
        return res.status(200).json({
            EC: 0,
            EM: "Rooms List",
            DT: data
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            EM: "Server Error",
        })
    }
}

const startDoQuiz = async (req, res) => {
    try {
        let id = req.params.id

        let room = await getExamRoomByIdService(id) //room trả về array chứa 1 object nên phải room[0].attribute

        let timeNow = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");; //Lấy time hiện tại
        let timeStart = convertToVietnamTime(room[0].start_time)//format lại time trả về của mysql
        let timeEnd = convertToVietnamTime(room[0].end_time)

        //console.log(timeStart, timeNow, timeEnd)
        if (timeStart <= timeNow && timeNow <= timeEnd) {
            let user_id = req.user.id
            let data = await getExamByUserService(user_id, id)// id là room id

            if (data = []) { //array rỗng nghĩa là select không trả về bản ghi nào
                await createNewExamForUserService(user_id, id)
                return res.status(200).json({
                    EC: 0,
                    EM: "Let do the test",
                })
            }
            else {
                return res.status(403).json({ //403:Fobbiden
                    EC: 0,
                    EM: "You can't do this test again",
                })
            }
        }
        else {
            return res.status(403).json({
                EC: 0,
                EM: "You can't join now",
            })
        }
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            EM: "Server Error",
        })
    }

}

module.exports = {
    createExamRoom,
    getExamRoomById,
    startDoQuiz,
    getAllRooms
}