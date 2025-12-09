"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vehicles_controller_1 = require("./vehicles.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
//create vehicle
router.post('/', (0, auth_1.default)(["admin"]), vehicles_controller_1.vehiclesController.createVehicle);
//get all vehicle
router.get('/', vehicles_controller_1.vehiclesController.getAllVehicle);
//get single vehicle
router.get('/:vehicleId', vehicles_controller_1.vehiclesController.getSingleVehicle);
//update vehicle
router.put('/:vehicleId', (0, auth_1.default)(["admin"]), vehicles_controller_1.vehiclesController.updateVehicle);
//delete vehicle
router.delete('/:vehicleId', (0, auth_1.default)(["admin"]), vehicles_controller_1.vehiclesController.deleteVehicle);
exports.vehiclesRoutes = router;
