const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, "public.pem"), "utf8");

const verifyToken = (token) => {
    return jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] }); //decode với RS256
};

module.exports = {
    verifyToken
}