const jwt = require('jsonwebtoken');
const { verifyToken } = require('../config/jwtconfigs')

const authMiddle = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; //Lấy access_token sau Bearer

    if (!token) return res.status(401).json({ message: "No access_token" });


    try {
        const decoded = verifyToken(token);
        req.user = { // đính thêm info user vào mỗi req trước khi gửi
            id: decoded.nameid,
            role: decoded.role
        };
        next(); // req thành công
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = { authMiddle }