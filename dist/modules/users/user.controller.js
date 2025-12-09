"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const user_service_1 = require("./user.service");
//get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.email,
                role: user.role
            }))
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//update user
const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const payload = {
        ...req.body,
        id: userId
    };
    try {
        const currentUser = req.user;
        if (currentUser.role == "customer" && String(currentUser.id) !== userId) {
            return res.status(403).json({
                success: false,
                message: "Customers can update only their own profile"
            });
        }
        const result = await user_service_1.userService.updateUser(payload);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: {
                id: result.id,
                name: result.name,
                email: result.email,
                phone: result.phone,
                role: result.role
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
exports.usersController = {
    getAllUsers,
    updateUser
};
