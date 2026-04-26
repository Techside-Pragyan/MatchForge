import http from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/matchforge';

import { setupChatHandlers } from './socket/chatHandler.js';

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join a personal room for notifications
  socket.on('join_self', (userId) => {
    socket.join(userId);
  });

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  setupChatHandlers(io, socket);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Database connection and Server start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

export { io };
