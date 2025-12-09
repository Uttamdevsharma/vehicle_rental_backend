"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
//user register
const registerUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const userExists = await db_1.pool.query('SELECT * FROM users WHERE email = $1', [
        email,
    ]);
    if (userExists.rows.length > 0) {
        throw new Error('User already exists');
    }
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, hashPassword, phone, role]);
    return result.rows[0];
};
//user login
const loginUser = async (email, password) => {
    const result = await db_1.pool.query(`SELECT * FROM users  WHERE email = $1`, [email]);
    if (result.rows.length === 0) {
        return false;
    }
    const user = result.rows[0];
    const matchPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!matchPassword) {
        return false;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, config_1.default.jwt_secret, {
        expiresIn: "7d"
    });
    return { token, user };
};
exports.authService = {
    registerUser,
    loginUser
};
