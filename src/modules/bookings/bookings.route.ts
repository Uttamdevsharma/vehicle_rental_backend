import express from 'express'
import { bookingControllers } from './bookings.controller'
import auth from '../../middleware/auth'
const router =express.Router()

//create booking
router.post('/',auth(["admin","customer"]),bookingControllers.createBooking )


//get all booking
router.get("/",auth(["admin"]),bookingControllers.getAllBookings)


export const bookingRoutes = router