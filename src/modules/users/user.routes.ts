import express from 'express'
import { usersController } from './user.controller'
import auth from '../../middleware/auth'
const router= express.Router()

// get all users
router.get('/',auth(["admin","customer"]),usersController.getAllUsers)


// update user
router.put('/:userId',auth(["admin","customer"]),usersController.updateUser)


export const userRoutes = router