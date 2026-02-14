# 💅 Bella Nails Studio — Backend
### Node.js + Express + MongoDB — Beauty Salon Appointment Management API

🔗 **Live API (Render):** https://bella-nails-studio-backend.onrender.com

---

## 🏗️ Overview

Backend API for Bella Nails Studio, built with Node.js, Express, and MongoDB.

It provides:

- User and admin management
- Appointment booking and cancellation
- JWT-based authentication and role-based access (User/Admin)
- Error handling, logging, and CORS configuration
- Production-ready modular structure

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Password Security:** bcrypt
- **Environment Variables:** .env (MONGO_URI, JWT_SECRET, PORT)
- **Middleware:** CORS, JSON parser, logging, centralized error handler

---

## Features

- **User:** Register/Login, book and cancel appointments, view personal schedule  
- **Admin:** Login, view all bookings by date, cancel any appointment  
- JWT-based route protection and role-based access
- Relational data between users and appointments using MongoDB ObjectId
- Centralized error handling and request logging
- Duplicate booking prevention

---

## Setup

1. Clone the repo: https://github.com/MaryFidlay/Bella-Nails-Studio---Backend
2. Install dependencies: `npm install`
3. Create `.env` with PORT=5000 / MONGO_URI=your_mongodb_connection_string / JWT_SECRET=your_jwt_secret_key
4. Run: `npm start` 

---

## API Overview

The backend provides RESTful endpoints for:

- **User:** register, login, create/cancel appointments, view schedule
- **Admin:** login, view all appointments, delete any appointment
All routes are protected with JWT authentication and role-based access.

---

## Security

- Passwords hashed with bcrypt
- JWT used for authentication and role-based access
- Users can only manage their own appointments
- Admin has full access to all appointments
- Input validation and duplicate booking prevention
- CORS restricted to authorized frontend domains

## Author

Maria Rita — Software Engineer  
GitHub: https://github.com/MaryFidlay  
LinkedIn: https://www.linkedin.com/in/maria-rita-/
