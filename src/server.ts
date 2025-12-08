import express, { Request, Response } from 'express'
import initDB from './config/db'
import { authRoutes } from './modules/auth/auth.routes'
const app = express()
const port = process.env.PORT || 5000


initDB()

app.use(express.json())


//auth router
app.use("/api/v1/auth",authRoutes)




app.get('/', (req:Request, res:Response) => {
  res.send('This is 2nd Assignment')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
