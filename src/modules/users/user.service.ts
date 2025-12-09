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

export const userService = {
    getAllUsers,
    updateUser
}