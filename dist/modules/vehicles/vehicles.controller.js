"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesController = void 0;
const vehicles_service_1 = require("./vehicles.service");
//create vehicle
const createVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleService.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: {
                id: result.id,
                vehicle_name: result.vehicle_name,
                type: result.type,
                registration_number: result.registration_number,
                daily_rent_price: result.daily_rent_price,
                availability_status: result.availability_status
            }
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//get all vehicle
const getAllVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleService.getAllVehicle();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.map((d) => ({
                id: d.id,
                vehicle_name: d.vehicle_name,
                type: d.type,
                registration_number: d.registration_number,
                daily_rent_price: d.daily_rent_price,
                availability_status: d.availability_status
            }))
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//get single vehicle
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleService.getSingleVehicle(req.params.vehicleId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: {
                id: result.id,
                vehicle_name: result.vehicle_name,
                type: result.type,
                registration_number: result.registration_number,
                daily_rent_price: result.daily_rent_price,
                availability_status: result.availability_status
            }
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//update vehicle
const updateVehicle = async (req, res) => {
    const vehicleId = req.params.vehicleId;
    const payload = {
        ...req.body,
        id: vehicleId
    };
    try {
        const result = await vehicles_service_1.vehicleService.updateVehicle(payload);
        res.status(200).json({
            success: true,
            message: "Vehicle Updated Successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//delete vehicle
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleService.deleteVehicle(req.params.vehicleId);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.vehiclesController = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
};
