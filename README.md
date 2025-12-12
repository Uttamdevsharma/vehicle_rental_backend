# Vehicle Rental Management API

This is the backend API for a Vehicle Rental Management System. It provides endpoints for managing users, vehicles, and bookings, with role-based access control for administrators and customers.

**Live Backend URL:** [https://vehiclerent-api.vercel.app](https://vehiclerent-api.vercel.app)

---

## Features

- **User Authentication:** Secure user registration and login with JWT-based authentication.
- **Role-Based Access Control:** Differentiated access for `admin` and `customer` roles.
- **Vehicle Management (Admin):** Admins can create, read, update, and delete vehicle listings.
- **Public Vehicle Access:** All users (authenticated or not) can view all available vehicles and details for a single vehicle.
- **Booking Management (Customer):** Authenticated customers can create and manage their vehicle bookings.
- **Admin Oversight:** Admins have access to view and manage all user bookings.
- **User Profile Management:** Users can update their own profile information.
- **Automated Tasks:** Cron jobs for handling time-based events like booking status updates.

---

## Technology Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt.js
- **Environment Variables:** `dotenv`
- **Scheduled Jobs:** `node-cron`
- **Runtime:** `tsx` for TypeScript execution

---

## Setup Instructions

Follow these steps to set up the project locally.

**1. Clone the Repository:**
```bash
git clone <repository-url>
cd vehicle_rental_backend
```

**2. Install Dependencies:**
```bash
npm install
```

**3. Set Up Environment Variables:**
Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your actual configuration.

```env
# Port for the server to run on
PORT=5000

# PostgreSQL database connection string
CONNECTION_STR=postgresql://<user>:<password>@<host>:<port>/<database>

# Secret key for signing JWT tokens
JWT_SECRET=your-super-secret-jwt-key
```

---

## How to Run the Project

- **Development Mode:** To run the server with live-reloading:
  ```bash
  npm run dev
  ```
  The server will start on the port specified in your `.env` file (e.g., `http://localhost:5000`).

- **Production Build:** To compile the TypeScript code to JavaScript:
  ```bash
  npm run build
  ```
  This will create a `dist` directory with the compiled files.

---

## Usage Instructions (API Endpoints)

You can use a tool like [Postman](https://www.postman.com/) or `curl` to test the API endpoints.

### Authentication

- **User Signup:** `POST /api/auth/signup`
  - **Description:** Register a new user.
  - **Body (raw/json):**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "phone": "1234567890",
      "address": "123 Main St",
      "role": "customer"
    }
    ```

- **User Signin:** `POST /api/auth/signin`
  - **Description:** Log in an existing user and receive a JWT token.
  - **Body (raw/json):**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

### Vehicles

- **Get All Vehicles:** `GET /api/vehicles`
- **Get Single Vehicle:** `GET /api/vehicles/:vehicleId`
- **Create Vehicle (Admin):** `POST /api/vehicles` (Requires Bearer Token)
- **Update Vehicle (Admin):** `PUT /api/vehicles/:vehicleId` (Requires Bearer Token)
- **Delete Vehicle (Admin):** `DELETE /api/vehicles/:vehicleId` (Requires Bearer Token)

### Bookings

- **Create Booking (Customer):** `POST /api/bookings` (Requires Bearer Token)
  - **Body (raw/json):**
    ```json
    {
      "vehicleId": "vehicle-uuid",
      "startTime": "2025-12-20T10:00:00Z",
      "returnTime": null
    }
    ```
- **Get All Bookings (Admin/Customer):** `GET /api/bookings` (Requires Bearer Token)
- **Update Booking (Admin):** `PUT /api/bookings/:bookingId` (Requires Bearer Token)

### Users

- **Get All Users (Admin):** `GET /api/users` (Requires Bearer Token)
- **Update User Profile (Admin/Customer):** `PUT /api/users/:userId` (Requires Bearer Token)
- **Delete User (Admin):** `DELETE /api/users/:userId` (Requires Bearer Token)

---
