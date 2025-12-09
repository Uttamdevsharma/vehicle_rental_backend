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



//update booking based on role based
const updateBooking = async(req:Request,res:Response) => {
    const { bookingId } = req.params;
    const { status } = req.body;
    const user = req.user as JwtPayload & { id: string | number; role: string };

    try {
        const booking = await bookingService.getBookingById(bookingId as string);


        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (user.role === 'customer') {
            if (String(booking.customer_id) !== String(user.id)) {
                 return res.status(403).json({
                    success: false,
                    message: "You are not authorized to perform this action."
                });
            }
            if (status !== 'cancelled') {
                return res.status(400).json({
                    success: false,
                    message: "Customers can only cancel their bookings."
                });
            }
        }

        if (user.role === 'admin' && status !== 'returned') {
             return res.status(400).json({
                success: false,
                message: "Admins can only mark bookings as returned."
            });
        }

        const updatedBooking = await bookingService.updateBooking(bookingId as string, status);

        const responseData: any = { ...updatedBooking };

        // Only admin & returned → attach vehicle info
        if (user.role === 'admin' && status === 'returned') {
            const vehicleRes = await pool.query(
                `SELECT availability_status FROM vehicles WHERE id = $1`,
                [booking.vehicle_id]
            );
            responseData.vehicle = vehicleRes.rows[0];
        }

        // Build message
        const message = status === 'cancelled'
            ? "Booking cancelled successfully"
            : "Booking marked as returned. Vehicle is now available";

        res.status(200).json({
            success: true,
            message,
            data: responseData
        });
    } catch(err:any) {
        res.status(500).json({
            success:false,
            message : err.message
        })
    }
    
}


export const bookingControllers = {
    createBooking,
    getAllBookings,
    updateBooking
}