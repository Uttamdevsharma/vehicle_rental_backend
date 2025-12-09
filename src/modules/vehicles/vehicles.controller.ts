import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";

//create vehicle
const createVehicle = async(req:Request,res:Response) => {

    try{
        const result = await vehicleService.createVehicle(req.body)

        res.status(201).json({
            success : true,
            message : "Vehicle created successfully",
            data : {
                id : result.id,
                vehicle_name : result.vehicle_name,
                 type : result.type,
                 registration_number : result.registration_number,
                 daily_rent_price : result.daily_rent_price,
                 availability_status : result.availability_status
            }
        })

    }catch(err:any){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}


//get all vehicle
const getAllVehicle = async(req:Request, res:Response) => {
    try{

        const result = await vehicleService.getAllVehicle()
        res.status(200).json({
            success : true,
            message : "Vehicles retrieved successfully",
            data : result.rows
        })    
    }catch(err:any){
        res.status(500).json({
            success:false,
            message : err.message
        })
    }
}



export const vehiclesController = {
    createVehicle,
    getAllVehicle
}