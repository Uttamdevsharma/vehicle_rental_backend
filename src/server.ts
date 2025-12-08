import express, { Request, Response } from 'express'
import initDB from './config/db'
import { authRoutes } from './modules/auth/auth.routes'
import { vehiclesRoutes } from './modules/vehicles/vehicles.routes'
const app = express()
const port = process.env.PORT || 5000


initDB()

app.use(express.json())


//auth routes
app.use("/api/v1/auth",authRoutes)

//vehicle routes
app.use('/api/v1',vehiclesRoutes)




app.get('/', (req:Request, res:Response) => {
  res.send('This is 2nd Assignment')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
