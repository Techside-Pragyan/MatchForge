import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

import LoginPage from './pages/LoginPage';
import SwipePage from './pages/SwipePage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';

const ProfilePage = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Profile Setup</h2>
      <p className="text-slate-400">Complete your profile to start matching.</p>
    </div>
  </div>
);

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 font-sans">
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
          
          <Route path="/" element={user ? <SwipePage /> : <Navigate to="/login" />} />
          <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
