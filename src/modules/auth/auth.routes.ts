import express, { Router } from 'express'
import { authController } from './auth.controller'

const router = express.Router()


router.post('/signup',authController.registerUser)


export const authRoutes = router