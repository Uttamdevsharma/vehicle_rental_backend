import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from "express";
import { bookingService } from "./bookings.service";
import { pool } from "../../config/db";


//create booking
const createBooking = async(req:Request,res:Response) => {

    try{ 
        const result = await bookingService.createBooking(req.body)

        res.status(201).json({
            success:true,
            message:"Booking created successfully",
            data: result
        })



    }catch(err:any){
        res.status(500).json({
            success:false,
            message : err.message
        })
    }
    
}


//get all booking based on role based
const getAllBookings = async(req:Request,res:Response) => {

    try{
        const user = req.user as JwtPayload & { id: string | number; role: string };

        if(user.role === "admin"){
            const bookings = await bookingService.getAllBookingsAdmin()
            return res.status(200).json({
                success:true,
                message : "Booking retrieved successfully",
                data : bookings
            })
        }


        const customerBookings = await bookingService.getAllBookingsCustomer()

        res.status(200).json({
            success:true,
            message : "Your bookings retrieved successfully",
            data : customerBookings
        })

    }catch(err:any){
        res.status(500).json({
            success:false,
            message : err.message
        })
    }
    
}


export const bookingControllers = {
    createBooking,
    getAllBookings
}