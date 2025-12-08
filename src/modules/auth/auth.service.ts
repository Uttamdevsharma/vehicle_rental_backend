import bcrypt from 'bcryptjs'
import { pool } from '../../config/db'
import jwt from 'jsonwebtoken'
import config from '../../config';


//user register
const registerUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;


  const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (userExists.rows.length > 0) {
    throw new Error('User already exists');
  }

  const hashPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, hashPassword, phone, role],
  );

  return result.rows[0];
};


//user login
const loginUser = async(email : string , password : string) => {

  const result =  await pool.query(`SELECT * FROM users  WHERE email = $1`, [email])

  if(result.rows.length === 0){
    return false
  }

  const user = result.rows[0]

  const matchPassword = await bcrypt.compare(password,user.password)

  if(!matchPassword){
    return false
  }

  const token = jwt.sign(
    {name:user.name , email : user.email , role: user.role} , config.jwt_secret as string,
    {
      expiresIn:"7d"
    }
  )

  return {token,user}

}

export const authService = {
    registerUser,
    loginUser
}