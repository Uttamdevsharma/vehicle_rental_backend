"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                return res.status(401).json({
                    message: "No token provided"
                });
            }
            const token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    message: "Forbidden : Insufficient role"
                });
            }
            next();
        }
        catch (err) {
            res.status(401).json({
                success: false,
                message: err.message
            });
        }
    };
};
exports.default = auth;
