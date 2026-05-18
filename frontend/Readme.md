# Lead Management Frontend

A modern Lead Management Dashboard built using React, TypeScript, and Vite.  
This application provides authentication, lead management, filtering, pagination, and dashboard analytics with a clean and responsive UI.

---

# Tech Stack

- React.js
- TypeScript
- Tailwind CSS

---

# Features

## Authentication

- User Login
- User Registration
- Protected Routes
- Persistent Authentication State

---

## Dashboard

- Lead Statistics Overview
- Summary Cards
- Responsive Dashboard Layout

---

## Lead Management

- Create Leads
- View Leads
- Update Leads
- Delete Leads
- Lead Detail Page

---

## Search & Filtering

- Search Leads
- Filter Leads
- Debounced Search Optimization
- Pagination Support

---

## UI Features

- Reusable Components
- Loading Spinners
- Error Handling
- Empty State UI
- Responsive Design

---

# Project Structure

```bash
src/
│
├── assests/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── types/
├── utils/
├── constants/
└── config/
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/DivyamChitransh/Smart_Leads_Dashboard.git
```

## Navigate to Project

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
VITE_API_BASE_URL=backend_api_url
```

---

---

# API Integration

The frontend communicates with backend services using Axios.

Service layer is organized inside:

```bash
src/services/
```

Includes:

- Authentication APIs
- Lead APIs
- Axios Configuration

---

# Authentication Flow

```text
Login/Register
      ↓
Auth Service
      ↓
Store User State
      ↓
Protected Routes
      ↓
Dashboard Access
```

---

# Lead Management Flow

```text
Dashboard
    ↓
Fetch Leads
    ↓
Lead Table
    ↓
Filters / Search / Pagination
    ↓
CRUD Operations
```

---

# Performance Optimizations

- Debounced Search
- Reusable Hooks
- Modular Component Structure
- Centralized API Layer

---

# Future Improvements

- Role Based Access Control
- Real-time Notifications
- Advanced Analytics
- Export Leads Functionality
- Unit & Integration Testing

---