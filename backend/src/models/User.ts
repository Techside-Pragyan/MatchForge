import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bio: string;
  interests: string[];
  images: string[];
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  preferences: {
    ageRange: { min: number; max: number };
    distance: number; // in km
    gender: ('male' | 'female' | 'other')[];
  };
  role: 'user' | 'admin';
  isProfileComplete: boolean;
  matches: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  lastActive: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  age: { type: Number, required: true, min: 18 },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  bio: { type: String, default: '', maxlength: 500 },
  interests: [{ type: String }],
  images: [{ type: String }], // URLs to Cloudinary
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  preferences: {
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 100 }
    },
    distance: { type: Number, default: 50 }, // Default 50km
    gender: [{ type: String, enum: ['male', 'female', 'other'] }]
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isProfileComplete: { type: Boolean, default: false },
  matches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastActive: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for geo-spatial queries
userSchema.index({ location: '2dsphere' });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password!);
};

export default mongoose.model<IUser>('User', userSchema);
