import express, { Request, Response } from 'express'
import initDB from './config/db'
import { authRoutes } from './modules/auth/auth.routes'
import { vehiclesRoutes } from './modules/vehicles/vehicles.routes'
import { userRoutes } from './modules/users/user.routes'
import { bookingRoutes } from './modules/bookings/bookings.route'
import { startUpdateBookingStatusCron } from './cron/updateBookingStatus'
const app = express()
const port = process.env.PORT || 5000


initDB()

// Start the cron job to update booking statuses
startUpdateBookingStatusCron();

app.use(express.json())


//auth routes
app.use("/api/v1/auth",authRoutes)

//vehicle routes
app.use('/api/v1/vehicles',vehiclesRoutes)

//user routes
app.use('/api/v1/users',userRoutes)

//booking routes
app.use('/api/v1/bookings',bookingRoutes)




app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to the Vehicle Rental Management System API ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
