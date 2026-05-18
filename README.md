# Lead Management System

A full-stack Lead Management System built using React, TypeScript, Node.js, Express, and MongoDB.  
The application provides authentication, dashboard analytics, and complete lead management functionality with a clean and modular architecture.

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- Tailwind CSS

---

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

---

# Features

## Authentication

- User Registration
- User Login
- JWT Based Authentication
- Protected Routes

---

## Dashboard

- Lead Statistics
- Summary Cards
- Responsive Dashboard Layout

---

## Lead Management

- Create Leads
- View Leads
- Update Leads
- Delete Leads
- Lead Details Page

---

## Search & Filtering

- Search Leads
- Filter Leads
- Pagination Support
- Debounced Search

---

# Project Structure

```bash
project-root/
│
├── frontend/
│
└── backend/
```

---

# Frontend Architecture

The frontend is built using React with TypeScript and follows a modular component-based architecture.

Main frontend modules include:

- Authentication Pages
- Dashboard Pages
- Lead Management Components
- Reusable UI Components
- Context API for State Management
- API Service Layer

---

# Backend Architecture

The backend is built using Node.js and Express with a layered architecture.

Main backend modules include:

- Authentication APIs
- Lead CRUD APIs
- Controllers
- Services
- Middleware
- MongoDB Models
- Validation Layer

---

# Application Flow

```text
Frontend UI
     ↓
API Service Layer
     ↓
Backend Routes
     ↓
Controllers
     ↓
Services
     ↓
MongoDB Database
```

---

# Authentication Flow

```text
User Login/Register
        ↓
JWT Token Generation
        ↓
Store Authentication State
        ↓
Protected Route Access
```

---

# API Modules

## Authentication APIs

- Register User
- Login User

---

## Lead APIs

- Create Lead
- Get Leads
- Get Single Lead
- Update Lead
- Delete Lead

---

# Performance Optimizations

- Debounced Search
- Reusable Hooks
- Modular Folder Structure
- Centralized API Layer

---

# Future Improvements

- Role Based Access Control
- Real-time Notifications
- Swagger Documentation
- Export Functionality
- Unit & Integration Testing

---