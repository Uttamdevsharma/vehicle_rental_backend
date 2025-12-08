"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const registerUser = async (req, res) => {
    try {
        const user = await auth_service_1.authService.registerUser(req.body);
        res.status(200).json({
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
exports.authController = {
    registerUser
};
