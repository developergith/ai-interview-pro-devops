# AI Interview Pro 🚀

A full-stack MERN application for generating AI-powered interview questions with detailed answers.

## Features
- ✅ Authentication (Register / Login / Logout)
- ✅ Generate Interview Questions (AI-powered via Gemini)
- ✅ View AI Answers for each question (click "View Answer")
- ✅ Interview History with search
- ✅ Delete interviews
- ✅ Dashboard with real stats
- ✅ Dark/Light theme toggle

## Project Structure
```
ai-interview-pro-devops/
├── ai-interview-Backend/   # Express + MongoDB API
└── ai-interview-Frontend/  # React + Vite + TailwindCSS
```

## Setup & Run

### Backend Setup
```bash
cd ai-interview-Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your values in .env:
# MONGO_URI=mongodb://localhost:27017/ai-interview-pro
# JWT_SECRET=any_random_secret_string
# GEMINI_API_KEY=your_google_gemini_api_key (optional, works without it)

# Run in development
npm run dev

# Or run in production
npm start
```

### Frontend Setup
```bash
cd ai-interview-Frontend

# Install dependencies
npm install

# Create .env file (optional, vite proxy handles it in dev)
cp .env.example .env

# Run in development
npm run dev
# Opens on http://localhost:3000
```

## Getting Gemini API Key (Optional but Recommended)
1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add it to Backend `.env` as `GEMINI_API_KEY`
4. Without it, the app uses smart fallback questions/answers

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login (returns token + user) |
| POST | /api/interview/generate | Generate interview questions |
| GET  | /api/interview/history | Get all user interviews |
| GET  | /api/interview/stats | Get dashboard stats |
| GET  | /api/interview/:id | Get single interview |
| POST | /api/interview/:id/answer/:index | Get AI answer for question |
| DELETE | /api/interview/:id | Delete interview |
