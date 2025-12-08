import express, { Request, Response } from 'express'
import initDB from './config/db'
const app = express()
const port = process.env.PORT || 5000


initDB()

app.use(express.json())

app.get('/', (req:Request, res:Response) => {
  res.send('This is 2nd Assignment')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
