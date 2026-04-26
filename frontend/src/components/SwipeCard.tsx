import React from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  distance?: number;
  interests: string[];
}

interface SwipeCardProps {
  user: UserProfile;
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-slate-800 border border-slate-700">
        {/* User Image */}
        <img 
          src={user.images[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'} 
          alt={user.name}
          className="w-full h-full object-cover select-none"
        />

        {/* Overlays */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 border-4 border-emerald-500 rounded-lg px-4 py-1 rotate-[-20deg] z-20">
          <span className="text-emerald-500 font-black text-4xl uppercase">Like</span>
        </motion.div>

        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 border-4 border-rose-500 rounded-lg px-4 py-1 rotate-[20deg] z-20">
          <span className="text-rose-500 font-black text-4xl uppercase">Nope</span>
        </motion.div>

        {/* Info Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end gap-3 mb-2">
            <h2 className="text-3xl font-bold">{user.name}, {user.age}</h2>
            <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <Info className="w-5 h-5 text-slate-300" />
            </button>
          </div>
          
          <div className="flex items-center gap-1 text-slate-300 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{user.distance || 5} km away</span>
          </div>

          <p className="text-slate-200 text-sm line-clamp-2 mb-4">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {user.interests.slice(0, 3).map((interest) => (
              <span key={interest} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium border border-white/10">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
