import { pool } from "../../config/db"

//get all users
const getAllUsers = async() => {

    const result = await pool.query(
        `SELECT * FROM users`
    )

    return result.rows
}


//update a user by admin or own
const updateUser = async(payload : Record<string,unknown>) => {

    const {name, email, phone, role ,id} =payload
    const result = await pool.query(
        `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,[name, email, phone, role,id]
    )

    return result.rows[0]

}

//check active booking any user
const hasActiveBooking = async(id:string) => {

    const result  = await pool.query(
        `SELECT customer_id FROM bookings WHERE customer_id=$1 AND status = 'active'`,[id]
    )

    return result.rows.length > 0

}

//delete user
const deleteUser = async(id:string )=>{

    const result = await pool.query(
        `DELETE FROM users WHERE id = $1`,[id]
    )
    return result.rows[0]
}

export const userService = {
    getAllUsers,
    updateUser,
    hasActiveBooking,
    deleteUser
}