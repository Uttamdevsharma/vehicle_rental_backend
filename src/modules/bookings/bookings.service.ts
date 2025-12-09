import { pool } from "../../config/db"

//create booking
const createBooking = async(payload: Record<string,unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    

    //vehicle info
    const vehicleInfo = await pool.query(
        `SELECT * FROM vehicles WHERE id=$1`,[vehicle_id]
    )

    if(vehicleInfo.rows.length === 0){
        throw new Error("Vehicle not found")
    }

    const vehicle = vehicleInfo.rows[0];

    if(vehicle.availability_status !== "available"){
        throw new Error("Vehicle is not available for booking")
    }



    //days calculate
    const start = new Date(rent_start_date as string)
    const end = new Date(rent_end_date as string)

    const difference = end.getTime() - start.getTime();
    const days =Math.ceil(difference / (1000*60*60*24)) 

   
    //total price
    const total_price = vehicle.daily_rent_price * days


    const bookingResult = await pool.query(
        `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
        VALUES ($1,$2,$3,$4,$5,'active')
        RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]

    )

    const booking = bookingResult.rows[0]

    // update vehicle status
    await pool.query(
        `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,[vehicle_id]
    )

    return {
        ...booking,
        vehicle: {
            vehicle_name: vehicle.vehicle_name,
            daily_rent_price:vehicle.daily_rent_price
        }
    }












}


//get all bookings by admin
const getAllBookingsAdmin = async() => {

    const result = await pool.query(
        `SELECT 
        b.id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,
        
        u.name AS customer_name,
        u.email AS customer_email,
        
        v.vehicle_name,
        v.registration_number

        FROM bookings b
        JOIN users u ON b.customer_id = u.id
        JOIN vehicles v ON b.vehicle_id = v.id
        ORDER BY b.id DESC
    `
    )

    return result.rows.map(booking => ({
        id: booking.id,
        customer_id: booking.customer_id,
        vehicle_id: booking.vehicle_id,
        rent_start_date: booking.rent_start_date,
        rent_end_date: booking.rent_end_date,
        total_price: booking.total_price,
        status: booking.status,
        customer: {
            name: booking.customer_name,
            email: booking.customer_email
        },
        vehicle: {
            vehicle_name: booking.vehicle_name,
            registration_number: booking.registration_number
        }
    }));
}



//get all bookings by customer
const getAllBookingsCustomer = async() => {

    const result = await pool.query(
        `SELECT 
        b.id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,

        v.vehicle_name,
        v.registration_number,
        v.type

        FROM bookings b
        JOIN vehicles v ON b.vehicle_id = v.id 

        `
    )
    return result.rows.map((booking) => ({
        id: booking.id,
        vehicle_id : booking.vehicle_id,
        rent_start_date: booking.rent_start_date,
        rent_end_date :booking.rent_end_date,
        total_price : booking.total_price,
        status:booking.status,
        vehicle : {
            vehicle_name : booking.vehicle_name,
            registration_number : booking.registration_number,
            type : booking.type
        }
    }))
}


// get a single booking by id
const getBookingById = async (bookingId: string) => {
    const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
    return result.rows[0];
};

// update booking
const updateBooking = async (bookingId: string, status: string) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const bookingResult = await client.query(
            `SELECT * FROM bookings WHERE id = $1`,
            [bookingId]
        );

        if (bookingResult.rows.length === 0) {
            throw new Error("Booking not found");
        }

        const booking = bookingResult.rows[0];

        const updatedBookingResult = await client.query(
            `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`,
            [status, bookingId]
        );

        const updatedBooking = updatedBookingResult.rows[0];
        
        if (status === 'returned' || status === 'cancelled') {
            await client.query(
                `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
                [booking.vehicle_id]
            );
        }

        await client.query('COMMIT');

        return updatedBooking;

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};



export const bookingService = {
    createBooking,
    getAllBookingsAdmin,
    getAllBookingsCustomer,
    getBookingById,
    updateBooking
}