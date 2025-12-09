import { pool } from "../../config/db";

//create vehicle
const createVehicle = async(payload:Record<string,unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [vehicle_name, type, registration_number, daily_rent_price, availability_status]
  );

  return result.rows[0]


}


//get all vehicle
const getAllVehicle = async() => {

    const result = await pool.query('SELECT * FROM vehicles')

    return result.rows
}

//get single vehicle
const getSingleVehicle = async(id:string) => {

  const result = await pool.query(`SELECT * FROM  vehicles WHERE id=$1 `,[id])

  if(result.rows.length === 0){
    return false
  }

  return result.rows[0]

}


//update vechile
const updateVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
    id
  } = payload;

const result = await pool.query(
  `UPDATE vehicles
   SET vehicle_name = $1,
       type = $2,
       registration_number = $3,
       daily_rent_price = $4,
       availability_status = $5
   WHERE id = $6
   RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status`,
  [
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
    id
  ]
);

return result.rows[0];
};


export const vehicleService = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle
}