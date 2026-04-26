import type { Request, Response } from 'express';
import User from '../models/User';
import { generateTokens } from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age, gender, location } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      age,
      gender,
      location: {
        type: 'Point',
        coordinates: location || [0, 0] // Default until set
      }
    });

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isProfileComplete: user.isProfileComplete
      },
      accessToken,
      refreshToken
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    user.lastActive = new Date();
    await user.save();

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isProfileComplete: user.isProfileComplete
      },
      accessToken,
      refreshToken
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  // In a real app with cookies, we'd clear them here
  res.status(200).json({ message: 'Logged out successfully' });
};
