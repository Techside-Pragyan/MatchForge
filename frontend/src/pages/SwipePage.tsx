import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RefreshCcw, X, Heart, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import SwipeCard from '../components/SwipeCard';
import toast from 'react-hot-toast';

const MOCK_USERS = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    bio: 'Adventure seeker and coffee lover. Let\'s explore the city!',
    images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800'],
    interests: ['Travel', 'Coffee', 'Photography']
  },
  {
    id: '2',
    name: 'Emma',
    age: 22,
    bio: 'Looking for someone who can cook a mean pasta. 🍝',
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800'],
    interests: ['Cooking', 'Netflix', 'Cats']
  },
  {
    id: '3',
    name: 'Olivia',
    age: 26,
    bio: 'UX Designer by day, amateur painter by night. 🎨',
    images: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'],
    interests: ['Art', 'Design', 'Yoga']
  }
];

const SwipePage = () => {
  const [users, setUsers] = useState(MOCK_USERS);

  const handleSwipe = (direction: 'left' | 'right', user: typeof MOCK_USERS[0]) => {
    if (direction === 'right') {
      toast.success(`You liked ${user.name}!`, { icon: '❤️' });
    }
    
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center">
      <Navbar />
      
      <main className="flex-1 w-full max-w-md px-4 pt-20 pb-32 flex flex-col">
        <div className="relative flex-1 mt-4">
          <AnimatePresence>
            {users.length > 0 ? (
              users.map((user) => (
                <SwipeCard 
                  key={user.id} 
                  user={user} 
                  onSwipe={(dir) => handleSwipe(dir, user)} 
                />
              ))
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <RefreshCcw className="w-10 h-10 text-slate-500 animate-spin-slow" />
                </div>
                <h3 className="text-white text-xl font-bold">No more profiles</h3>
                <p className="text-slate-400 mt-2">Check back later or change your filters to see more people.</p>
                <button 
                  onClick={() => setUsers(MOCK_USERS)}
                  className="mt-6 px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
                >
                  Refresh Feed
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        {users.length > 0 && (
          <div className="flex items-center justify-between px-4 mt-8">
            <button className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 text-amber-500 hover:scale-110 transition-transform shadow-lg">
              <RefreshCcw className="w-6 h-6" />
            </button>
            <button className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 text-rose-500 hover:scale-110 transition-transform shadow-lg">
              <X className="w-8 h-8" />
            </button>
            <button className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 text-sky-400 hover:scale-110 transition-transform shadow-lg">
              <Star className="w-6 h-6 fill-current" />
            </button>
            <button className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 text-emerald-400 hover:scale-110 transition-transform shadow-lg">
              <Heart className="w-8 h-8 fill-current" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SwipePage;
