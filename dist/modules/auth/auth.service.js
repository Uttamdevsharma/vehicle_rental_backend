"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const registerUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, hashPassword, phone, role]);
    return result.rows[0];
};
exports.authService = {
    registerUser
};
