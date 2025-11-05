import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Login from "./pages/Login";

export default function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink water", done: false },
    { id: 2, name: "Recycle plastic", done: false },
    { id: 3, name: "Take a walk", done: false },
  ]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  

  return (
    <div className="min-h-screen bg-[#f5e6d3] font-sans">
      {/* Header */}
      <header className="bg-[#2d5016] text-white p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">GreenHabits 🌱</h1>
            <p className="mt-1 text-[#b8cec1]">Track your eco-friendly habits daily!</p>
          </div>
          <div className="flex gap-2">
            {/* Test Button */}
            <button 
              onClick={toggleLoginState}
              className="bg-[#d4927e] text-[#2d5016] px-4 py-2 rounded hover:opacity-90 transition font-bold"
            >
              TEST: {isLoggedIn ? 'Logged In ✓' : 'Logged Out ✗'}
            </button>
            {/* Logout Button - Only show when logged in */}
            {isLoggedIn && (
              <button 
                onClick={handleLogout}
                className="bg-[#d4927e] text-[#2d5016] px-4 py-2 rounded hover:opacity-90 transition font-bold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-6 px-4">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-[#2d5016]">
          Build Sustainable Habits
        </h2>
        <p className="text-[#2d5016] mb-6 max-w-xl mx-auto">
          Stay motivated and track your eco-friendly activities every day. Small actions lead to big impact!
        </p>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="bg-[#d4927e] text-[#2d5016] px-6 py-2 rounded hover:opacity-90 transition ml-4">Profile</Link>
            <Link to="/stats" className="bg-[#d4927e] text-[#2d5016] px-6 py-2 rounded hover:opacity-90 transition ml-4">Stats</Link>
          </>
        ) : (
          location.pathname !== '/login' && (
            <Link to="/login" className="bg-[#d4927e] text-[#2d5016] px-6 py-2 rounded hover:opacity-90 transition ml-4">Login</Link>
          )
        )}
      </section>

      {/* Routes */}
      <main className="p-6 max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile habits={habits} toggleHabit={toggleHabit} /> : <Navigate to="/login" />} />
          <Route path="/stats" element={isLoggedIn ? <Stats habits={habits} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/profile" />} />
        </Routes>
      </main>
    </div>
  );
}