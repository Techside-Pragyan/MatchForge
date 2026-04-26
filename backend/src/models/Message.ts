import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  match: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  type: 'text' | 'image';
  read: boolean;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  match: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image'], default: 'text' },
  read: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Index for fetching messages of a match
messageSchema.index({ match: 1, createdAt: -1 });

export default mongoose.model<IMessage>('Message', messageSchema);
