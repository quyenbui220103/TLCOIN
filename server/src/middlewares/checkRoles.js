
const checkRole = (...allowedRoles) => { // tự tạo mảng nếu truyền vào nhiều role
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập" });
        }
        next();
    };
}

module.exports = { checkRole };
