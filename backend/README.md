# Task API

REST API for managing tasks with JWT authentication.
- **Base URL:** `https://task-api-sifa.onrender.com`

## Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT auth, express-validator

## Setup

1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env` and fill in real values
4. Make sure MongoDB is running locally
5. `npm run dev`

## Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me` (protected)

### Tasks (all protected)
- `GET    /api/tasks`
- `POST   /api/tasks`
- `GET    /api/tasks/:id`
- `PUT    /api/tasks/:id`
- `DELETE /api/tasks/:id`
