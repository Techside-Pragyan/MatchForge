import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  users: mongoose.Types.ObjectId[]; // Array of 2 user IDs
  lastMessage?: mongoose.Types.ObjectId;
  status: 'active' | 'unmatched';
  createdAt: Date;
  updatedAt: Date;
}

const matchSchema = new Schema<IMatch>({
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  status: { type: String, enum: ['active', 'unmatched'], default: 'active' }
}, {
  timestamps: true
});

// Ensure a match always has 2 users
matchSchema.pre('save', function (next) {
  if (this.users.length !== 2) {
    return next(new Error('A match must have exactly 2 users.'));
  }
  next();
});

export default mongoose.model<IMatch>('Match', matchSchema);
