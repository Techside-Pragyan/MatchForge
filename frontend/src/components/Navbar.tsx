import { NavLink } from 'react-router-dom';
import { Heart, MessageCircle, User, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto bg-slate-900/80 backdrop-blur-xl border-t md:border-t-0 md:border-b border-slate-800 z-50">
      <div className="max-w-md mx-auto md:max-w-4xl px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Heart className="text-white w-5 h-5 fill-current" />
            </div>
            <span className="text-white font-bold tracking-tight">MatchForge</span>
          </div>

          <div className="flex flex-1 md:flex-none justify-around md:gap-8">
            <NavLink to="/" className={({ isActive }) => `p-2 rounded-xl transition-colors ${isActive ? 'text-brand-500' : 'text-slate-400 hover:text-slate-200'}`}>
              <Heart className="w-7 h-7" />
            </NavLink>
            <NavLink to="/chat" className={({ isActive }) => `p-2 rounded-xl transition-colors ${isActive ? 'text-brand-500' : 'text-slate-400 hover:text-slate-200'}`}>
              <MessageCircle className="w-7 h-7" />
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `p-2 rounded-xl transition-colors ${isActive ? 'text-brand-500' : 'text-slate-400 hover:text-slate-200'}`}>
              <User className="w-7 h-7" />
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `p-2 rounded-xl transition-colors ${isActive ? 'text-brand-500' : 'text-slate-400 hover:text-slate-200'}`}>
              <Settings className="w-7 h-7" />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
