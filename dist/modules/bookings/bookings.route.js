"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bookings_controller_1 = require("./bookings.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
//create booking
router.post('/', (0, auth_1.default)(["admin", "customer"]), bookings_controller_1.bookingControllers.createBooking);
//get all booking
router.get("/", (0, auth_1.default)(["admin", "customer"]), bookings_controller_1.bookingControllers.getAllBookings);
//update booking
router.put("/:bookingId", (0, auth_1.default)(["admin", "customer"]), bookings_controller_1.bookingControllers.updateBooking);
exports.bookingRoutes = router;
