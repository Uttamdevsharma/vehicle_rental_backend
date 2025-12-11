"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUpdateBookingStatusCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("../config/db");
const bookings_service_1 = require("../modules/bookings/bookings.service");
// Function to find and update overdue bookings
const updateOverdueBookings = async () => {
    try {
        const query = `
      SELECT id
      FROM bookings
      WHERE status = 'active' AND rent_end_date < NOW();
    `;
        const { rows } = await db_1.pool.query(query);
        if (rows.length > 0) {
            console.log(`Found ${rows.length} overdue bookings.`);
            for (const booking of rows) {
                await bookings_service_1.bookingService.updateBooking(booking.id, 'returned');
                console.log(`Booking ${booking.id} marked as returned.`);
            }
        }
        else {
            console.log('No overdue bookings found.');
        }
    }
    catch (error) {
        console.error('Error updating overdue bookings:', error);
    }
};
const startUpdateBookingStatusCron = () => {
    node_cron_1.default.schedule('0 0 * * *', updateOverdueBookings);
};
exports.startUpdateBookingStatusCron = startUpdateBookingStatusCron;
