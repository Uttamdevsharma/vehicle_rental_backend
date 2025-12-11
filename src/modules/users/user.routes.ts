import express from 'express'
import { usersController } from './user.controller'
import auth from '../../middleware/auth'
import { userService } from './user.service'
const router= express.Router()

// get all users
router.get('/',auth(["admin"]),usersController.getAllUsers)


// update user
router.put('/:userId',auth(["admin","customer"]),usersController.updateUser)

//delete user if no active booking exist
router.delete("/:userId",auth(["admin"]),usersController.deleteUser)


export const userRoutes = router