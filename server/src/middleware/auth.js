"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var SECRET = process.env.JWT_SECRET;
console.log(SECRET);
var authenticateJwt = function (req, res, next) {
    if (!SECRET) {
        console.error('JWT secret is not defined.');
        return res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
    var authHeaders = req.headers.authorization;
    if (authHeaders) {
        var token = authHeaders.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET, function (err, payload) {
            if (err) {
                return res.status(403).json({
                    msg: "Unauthorized"
                });
            }
            if (!payload) {
                return res.status(403).json({ msg: "Payload not found" });
            }
            if (typeof payload === "string") {
                return res.status(403).json({ msg: "Payload not found" });
            }
            req.headers["userId"] = payload._id;
            next();
        });
    }
    else {
        res.status(401).json({
            msg: "Header not found"
        });
    }
};
exports.default = authenticateJwt;
