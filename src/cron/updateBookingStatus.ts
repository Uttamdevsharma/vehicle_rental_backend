import cron from 'node-cron';
import { pool } from '../config/db';
import { bookingService } from '../modules/bookings/bookings.service';

// Function to find and update overdue bookings
const updateOverdueBookings = async () => {
  try {
    const query = `
      SELECT id
      FROM bookings
      WHERE status = 'active' AND rent_end_date < NOW();
    `;
    const { rows } = await pool.query(query);

    if (rows.length > 0) {
      console.log(`Found ${rows.length} overdue bookings.`);
      for (const booking of rows) {
        await bookingService.updateBooking(booking.id, 'returned');
        console.log(`Booking ${booking.id} marked as returned.`);
      }
    } else {
      console.log('No overdue bookings found.');
    }
  } catch (error) {
    console.error('Error updating overdue bookings:', error);
  }
};


export const startUpdateBookingStatusCron = () => {
  cron.schedule('0 0 * * *', updateOverdueBookings);
};
