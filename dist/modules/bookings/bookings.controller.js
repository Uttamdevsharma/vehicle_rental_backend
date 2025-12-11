"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const bookings_service_1 = require("./bookings.service");
const db_1 = require("../../config/db");
//create booking
const createBooking = async (req, res) => {
    try {
        const result = await bookings_service_1.bookingService.createBooking(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
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
//get all booking based on role based
const getAllBookings = async (req, res) => {
    try {
        const user = req.user;
        if (user.role === "admin") {
            const bookings = await bookings_service_1.bookingService.getAllBookingsAdmin();
            return res.status(200).json({
                success: true,
                message: "Booking retrieved successfully",
                data: bookings
            });
        }
        const customerBookings = await bookings_service_1.bookingService.getAllBookingsCustomer(user.id);
        res.status(200).json({
            success: true,
            message: "Your bookings retrieved successfully",
            data: customerBookings
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//update booking based on role based
const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;
    const user = req.user;
    try {
        const booking = await bookings_service_1.bookingService.getBookingById(bookingId);
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
        const updatedBooking = await bookings_service_1.bookingService.updateBooking(bookingId, status);
        const responseData = { ...updatedBooking };
        // Only admin & returned → attach vehicle info
        if (user.role === 'admin' && status === 'returned') {
            const vehicleRes = await db_1.pool.query(`SELECT availability_status FROM vehicles WHERE id = $1`, [booking.vehicle_id]);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.bookingControllers = {
    createBooking,
    getAllBookings,
    updateBooking
};
