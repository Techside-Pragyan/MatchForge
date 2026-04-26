import { Request, Response } from 'express';
import { getPotentialMatches, handleSwipe } from '../services/matchService';
import User from '../models/User';

export const getFeed = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const potentialMatches = await getPotentialMatches(user);
    res.status(200).json(potentialMatches);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const swipe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { targetId, direction } = req.body;

    const result = await handleSwipe(userId, targetId, direction);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
