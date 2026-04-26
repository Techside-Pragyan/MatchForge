import { motion } from 'framer-motion';
import { Search, MoreVertical, Send, Image as ImageIcon } from 'lucide-react';
import Navbar from '../components/Navbar';

const MOCK_MATCHES = [
  { id: '1', name: 'Sarah', lastMessage: 'Hey! How are you?', time: '2m ago', online: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Emma', lastMessage: 'That sounds like fun!', time: '1h ago', online: false, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
];

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto w-full pt-16 pb-20 md:pb-0 overflow-hidden">
        {/* Sidebar - Match List */}
        <div className="w-full md:w-80 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search matches"
                className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {MOCK_MATCHES.map((match) => (
              <div key={match.id} className="p-4 flex items-center gap-3 hover:bg-slate-900 cursor-pointer transition-colors border-b border-slate-900/50">
                <div className="relative">
                  <img src={match.avatar} alt={match.name} className="w-12 h-12 rounded-full object-cover" />
                  {match.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-white font-semibold truncate">{match.name}</h3>
                    <span className="text-[10px] text-slate-500">{match.time}</span>
                  </div>
                  <p className="text-slate-400 text-xs truncate">{match.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col bg-slate-900/30 backdrop-blur-sm">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-3">
              <img src={MOCK_MATCHES[0].avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="text-white font-bold">{MOCK_MATCHES[0].name}</h3>
                <span className="text-xs text-emerald-500">Online</span>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%]">
                Hey! I saw you like photography too. What camera do you use?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-brand-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%]">
                Hi Sarah! I'm mostly using a Fujifilm X-T4 lately. It's great for street photography.
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-slate-900/50 border-t border-slate-800">
            <div className="flex items-center gap-3 bg-slate-800 rounded-2xl px-4 py-2">
              <button className="text-slate-400 hover:text-white transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm"
              />
              <button className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white hover:bg-brand-600 transition-colors shadow-lg">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View Placeholder */}
        <div className="md:hidden flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
          <MessageCircle className="w-16 h-16 mb-4 opacity-20" />
          <p>Select a match to start chatting</p>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
