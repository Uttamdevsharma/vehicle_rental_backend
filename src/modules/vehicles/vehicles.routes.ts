import express from 'express'
import { vehiclesController } from './vehicles.controller'
import auth from '../../middleware/auth'
const router = express.Router()


//create vehicle
router.post('/vehicles',auth("admin"),vehiclesController.createVehicle)

//get all vehicle
router.get('/vehicles',vehiclesController.getAllVehicle)

//get single vehicle
router.get('/vehicles/:vehicleId',vehiclesController.getSingleVehicle)


//update vehicle
router.put('/vehicles/:vehicleId',vehiclesController.updateVehicle)

export const vehiclesRoutes = router