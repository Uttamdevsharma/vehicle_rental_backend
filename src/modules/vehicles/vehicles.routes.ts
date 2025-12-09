import express from 'express'
import { vehiclesController } from './vehicles.controller'
import auth from '../../middleware/auth'
const router = express.Router()


//create vehicle
router.post('/vehicles',auth("admin"),vehiclesController.createVehicle)

//get all vehicle
router.get('/vehicles',vehiclesController.getAllVehicle)

export const vehiclesRoutes = router