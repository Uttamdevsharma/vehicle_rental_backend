"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
//register user
const registerUser = async (req, res) => {
    try {
        const user = await auth_service_1.authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered Successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await auth_service_1.authService.loginUser(email, password);
        if (!response) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const { token, user } = response;
        res.status(200).json({
            success: true,
            message: "Login successfull",
            data: {
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            }
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.authController = {
    registerUser,
    loginUser
};
