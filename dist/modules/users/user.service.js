"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
//get all users
const getAllUsers = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result.rows;
};
//update a user by admin or own
const updateUser = async (payload) => {
    const { name, email, phone, role, id } = payload;
    const result = await db_1.pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, id]);
    return result.rows[0];
};
//check active booking any user
const hasActiveBooking = async (id) => {
    const result = await db_1.pool.query(`SELECT customer_id FROM bookings WHERE id=$1 AND status = 'active'`, [id]);
    return result.rows.length > 0;
};
//delete user
const deleteUser = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return result.rows[0];
};
exports.userService = {
    getAllUsers,
    updateUser,
    hasActiveBooking,
    deleteUser
};
