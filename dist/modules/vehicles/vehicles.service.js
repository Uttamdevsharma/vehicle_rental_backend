"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = void 0;
const db_1 = require("../../config/db");
//create vehicle
const createVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result.rows[0];
};
//get all vehicle
const getAllVehicle = async () => {
    const result = await db_1.pool.query('SELECT * FROM vehicles');
    return result.rows;
};
//get single vehicle
const getSingleVehicle = async (id) => {
    const result = await db_1.pool.query(`SELECT * FROM  vehicles WHERE id=$1 `, [id]);
    if (result.rows.length === 0) {
        return false;
    }
    return result.rows[0];
};
//update vechile
const updateVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, id } = payload;
    const result = await db_1.pool.query(`UPDATE vehicles
   SET vehicle_name = $1,
       type = $2,
       registration_number = $3,
       daily_rent_price = $4,
       availability_status = $5
   WHERE id = $6
   RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        id
    ]);
    return result.rows[0];
};
const hasActiveBooking = async (id) => {
    const result = await db_1.pool.query(`SELECT id FROM bookings WHERE vehicle_id=$1 AND status = 'active'`, [id]);
    return result.rows.length > 0;
};
//delete vehicle
const deleteVehicle = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING *`, [id]);
    return result;
};
exports.vehicleService = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle,
    hasActiveBooking,
    deleteVehicle
};
