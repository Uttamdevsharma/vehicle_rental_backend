"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const vehicles_routes_1 = require("./modules/vehicles/vehicles.routes");
const user_routes_1 = require("./modules/users/user.routes");
const bookings_route_1 = require("./modules/bookings/bookings.route");
const updateBookingStatus_1 = require("./cron/updateBookingStatus");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, db_1.default)();
// Start the cron job to update booking statuses
(0, updateBookingStatus_1.startUpdateBookingStatusCron)();
app.use(express_1.default.json());
//auth routes
app.use("/api/v1/auth", auth_routes_1.authRoutes);
//vehicle routes
app.use('/api/v1/vehicles', vehicles_routes_1.vehiclesRoutes);
//user routes
app.use('/api/v1/users', user_routes_1.userRoutes);
//booking routes
app.use('/api/v1/bookings', bookings_route_1.bookingRoutes);
app.get('/', (req, res) => {
    res.send('This is 2nd Assignment');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
