import User, { IUser } from '../models/User';
import Match from '../models/Match';

export const getPotentialMatches = async (user: IUser) => {
  const { preferences, location, _id, likes, dislikes, matches } = user;

  // Find users who:
  // 1. Are within distance
  // 2. Match gender preference
  // 3. Are in age range
  // 4. Have not been liked/disliked/matched yet
  // 5. Are not the user themselves

  const excludedIds = [_id, ...likes, ...dislikes, ...matches];

  const potentialMatches = await User.find({
    _id: { $nin: excludedIds },
    gender: { $in: preferences.gender },
    age: { $gte: preferences.ageRange.min, $lte: preferences.ageRange.max },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: location.coordinates
        },
        $maxDistance: preferences.distance * 1000 // convert km to meters
      }
    }
  }).limit(20);

  return potentialMatches;
};

export const handleSwipe = async (userId: string, targetId: string, direction: 'right' | 'left') => {
  const user = await User.findById(userId);
  const target = await User.findById(targetId);

  if (!user || !target) throw new Error('User not found');

  if (direction === 'left') {
    user.dislikes.push(target._id as any);
    await user.save();
    return { match: false };
  }

  // Direction is right (Like)
  user.likes.push(target._id as any);
  await user.save();

  // Check if target also likes user (Mutual Match)
  if (target.likes.includes(user._id as any)) {
    // It's a match!
    const match = await Match.create({
      users: [user._id, target._id]
    });

    user.matches.push(target._id as any);
    target.matches.push(user._id as any);
    
    await user.save();
    await target.save();

    return { match: true, matchId: match._id, partner: target };
  }

  return { match: false };
};
