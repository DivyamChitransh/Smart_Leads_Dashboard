# Lead Management Backend

A scalable and modular backend application built using Node.js, Express, TypeScript, and MongoDB.  
This backend provides authentication, lead management APIs, validation, pagination, error handling, and secure route protection.

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Docker

---

# Features

## Authentication

- User Registration
- User Login
- JWT Based Authentication
- Protected Routes
- Password Hashing

---

## Lead Management APIs

- Create Lead
- Get All Leads
- Get Single Lead
- Update Lead
- Delete Lead

---

# Project Structure

```bash
src/
│
├── config/
│   ├── database.ts
│   └── env.ts
│
├── controllers/
│   ├── auth.controller.ts
│   └── lead.controller.ts
│
├── middleware/
│   ├── auth.ts
│   ├── errorHandler.ts
│   └── validate.ts
│
├── models/
│   ├── Lead.ts
│   └── User.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── lead.routes.ts
│   └── index.ts
│
├── services/
│   ├── auth.service.ts
│   └── lead.service.ts
│
├── utils/
│   ├── ApiError.ts
│   ├── asyncHandler.ts
│   ├── csv.ts
│   ├── pagination.ts
│   ├── request.ts
│   ├── response.ts
│   └── validation.ts
│
├── validators/
│   ├── auth.validator.ts
│   └── lead.validator.ts
│
├── types/
│   └── index.ts
│
├── app.ts
└── server.ts
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/DivyamChitransh/Smart_Leads_Dashboard.git
```

## Navigate to Project

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

# Run Development Server

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:5000
```

---

# Build Project

```bash
npm run build
```

---

# Run Production Build

```bash
npm start
```

---

# API Endpoints

## Authentication Routes

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## Lead Routes

### Get All Leads

```http
GET /api/leads
```

### Get Single Lead

```http
GET /api/leads/:id
```

### Create Lead

```http
POST /api/leads
```

### Update Lead

```http
PUT /api/leads/:id
```

### Delete Lead

```http
DELETE /api/leads/:id
```

---

# Authentication Flow

```text
User Login/Register
        ↓
Validate Request
        ↓
Generate JWT Token
        ↓
Return Auth Response
        ↓
Protected Route Access
```

---

# Lead Management Flow

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Service Layer
   ↓
MongoDB Model
   ↓
Response
```

---

# Middleware Used

- Authentication Middleware
- Error Handling Middleware
- Validation Middleware

---

# Utilities

- Pagination Helper
- Async Handler
- API Response Formatter
- CSV Utility
- Validation Helpers

---

# Docker Support

Docker configuration is included using:

```bash
Dockerfile
```

Build Docker Image:

```bash
docker build -t lead-management-backend .
```

Run Docker Container:

```bash
docker run -p 5000:5000 lead-management-backend
```

---

# Important Notes

The following folders should not be pushed to GitHub:

```bash
node_modules/
dist/
.env
```

Use `.gitignore` for excluding them.

---

# Future Improvements

- Role Based Access Control
- Refresh Token Authentication
- API Rate Limiting
- Unit & Integration Testing
- Swagger API Documentation
- Email Notifications

---