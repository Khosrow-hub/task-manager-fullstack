# Task Manager — Fullstack

A MERN task manager with JWT auth, full CRUD, search, and filtering.

- **Frontend:** React + Vite + Tailwind CSS (deployed on Vercel)
- **Backend:** Node.js + Express + MongoDB + JWT (deployed on Render)

## Live URLs
- Frontend: https://your-vercel-url.vercel.app
- Backend API: https://task-api-sifa.onrender.com

## Features
- User registration & login (JWT)
- Create / edit / delete / complete tasks
- Search by title & description
- Filter: All / Active / Done
- Loading states & inline error handling
- Fully responsive

## Repo structure
- `/backend` — Express API (see backend/README.md)
- `/frontend` — React app

## Local development

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000
npm run dev
\`\`\`

## Deployment
- Backend → Render (Web Service, root = `backend`, build `npm install`, start `npm start`)
- Frontend → Vercel (root = `frontend`, framework = Vite, env `VITE_API_URL` = deployed backend URL)
