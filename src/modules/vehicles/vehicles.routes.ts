import express from 'express'
import { vehiclesController } from './vehicles.controller'
import auth from '../../middleware/auth'
const router = express.Router()


//create vehicle
router.post('/',auth("admin"),vehiclesController.createVehicle)

//get all vehicle
router.get('/',vehiclesController.getAllVehicle)

//get single vehicle
router.get('/:vehicleId',vehiclesController.getSingleVehicle)


//update vehicle
router.put('/:vehicleId',vehiclesController.updateVehicle)


//delete vehicle
router.delete('/:vehicleId',vehiclesController.deleteVehicle)

export const vehiclesRoutes = router