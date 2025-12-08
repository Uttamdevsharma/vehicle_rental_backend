import bcrypt from 'bcryptjs'
import { pool } from '../../config/db'
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

export const authService = {
    registerUser
}