# MatchForge 🔥

MatchForge is a production-ready, scalable dating application built with a modern stack focusing on performance, security, and a premium user experience.

## 🚀 Features

- **Premium UI/UX**: Dark mode, glassmorphism, and smooth Framer Motion animations.
- **Smart Matching**: Geo-spatial discovery (MongoDB `$near`) and interest-based filtering.
- **Real-time Communication**: Instant messaging and typing indicators via Socket.io.
- **Secure Auth**: JWT-based authentication with Access and Refresh tokens.
- **Mobile First**: Fully responsive design optimized for mobile gestures.

## 🛠️ Tech Stack

### Backend
- **Node.js & Express**: Modular MVC architecture.
- **MongoDB & Mongoose**: Efficient data modeling with geo-spatial indexing.
- **Socket.io**: Real-time bidirectional communication.
- **TypeScript**: Type-safe development.

### Frontend
- **React (Vite)**: Fast, modern UI library.
- **Tailwind CSS**: Utility-first styling with custom design tokens.
- **Framer Motion**: Native-like swipe gestures and transitions.
- **Zustand**: Lightweight and scalable state management.

## 📦 Project Structure

```text
MatchForge/
├── backend/                # Server-side logic
│   ├── src/
│   │   ├── controllers/    # API request handlers
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # Endpoint definitions
│   │   ├── services/       # Core logic (Matching engine)
│   │   ├── socket/         # Real-time handlers
│   │   └── server.ts       # Entry point
├── frontend/               # Client-side logic
│   ├── src/
│   │   ├── components/     # Reusable UI parts
│   │   ├── pages/          # Full-page views
│   │   ├── store/          # Global state
│   │   └── App.tsx         # Routing & Main shell
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or Atlas)

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file based on `.env.example`
4. `npm run dev` (Starts server on port 5000)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. Create a `.env` file based on `.env.example`
4. `npm run dev` (Starts Vite on port 5173)

## 🛡️ Security & Privacy
- Password hashing with Bcrypt.
- Rate limiting to prevent spam.
- Secure HTTP-only cookies for token storage.
- Input validation and sanitization.

## 📝 License
MIT