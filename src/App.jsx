import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./pages/Home";


export default function App() {
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
    <div className="min-h-screen bg-fundal font-sans">
      <Header
        isLoggedIn={isLoggedIn}
        toggleLoginState={toggleLoginState}
        handleLogout={handleLogout}
      />
      
      {isLoggedIn && (
        <nav className="flex justify-center gap-4 py-4 px-6">
          <Link 
            to="/profile" 
            className="bg-bigbox text-darkgreen px-6 py-2 rounded-lg font-semibold hover:bg-smallbox transition shadow-md"
          >
            Profile
          </Link>
          <Link 
            to="/stats" 
            className="bg-bigbox text-darkgreen px-6 py-2 rounded-lg font-semibold hover:bg-smallbox transition shadow-md"
          >
            Stats
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile habits={habits} toggleHabit={toggleHabit} /> : <Navigate to="/login" />} />
        <Route path="/stats" element={isLoggedIn ? <Stats habits={habits} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/profile" />} />
      </Routes>
    </div>
  );
}