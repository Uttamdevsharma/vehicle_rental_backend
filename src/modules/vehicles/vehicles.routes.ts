import express from 'express'
import { vehiclesController } from './vehicles.controller'
const router = express.Router()


//create vehicle
router.post('/vehicles',vehiclesController.createVehicle)

export const vehiclesRoutes = router