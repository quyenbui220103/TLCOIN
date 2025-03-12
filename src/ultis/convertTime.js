const moment = require("moment-timezone");

const convertToVietnamTime = (utcDateTime) => {
    return moment.utc(utcDateTime).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
};

module.exports = { convertToVietnamTime }