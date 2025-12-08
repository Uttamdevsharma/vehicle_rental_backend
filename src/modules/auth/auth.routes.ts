import express from 'express'
import { authController } from './auth.controller'

const router = express.Router()

//singup user
router.post('/signup',authController.registerUser)

//signin user
router.post('/signin',authController.loginUser)


export const authRoutes = router