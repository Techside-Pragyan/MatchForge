import { Server, Socket } from 'socket.io';
import Message from '../models/Message';
import Match from '../models/Match';

export const setupChatHandlers = (io: Server, socket: Socket) => {
  socket.on('send_message', async (data) => {
    const { matchId, senderId, receiverId, content, type } = data;

    try {
      const message = await Message.create({
        match: matchId,
        sender: senderId,
        receiver: receiverId,
        content,
        type: type || 'text'
      });

      // Update last message in Match
      await Match.findByIdAndUpdate(matchId, { lastMessage: message._id });

      // Emit to the specific match room
      io.to(matchId).emit('receive_message', message);
      
      // Also notify receiver if they are not in the room (for notifications)
      socket.to(receiverId).emit('new_notification', {
        type: 'message',
        from: senderId,
        matchId
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('typing', (data) => {
    socket.to(data.matchId).emit('user_typing', { userId: data.userId });
  });
};
