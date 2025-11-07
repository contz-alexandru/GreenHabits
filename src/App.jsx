// src/App.jsx
import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Redeem from "./pages/Redeem";
import Map from "./pages/Map";
import DailyTasks from "./pages/DailyTasks";
import 'leaflet/dist/leaflet.css';
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./components/AuthProvider";
import { db } from "./firebase/firebase_config";

console.log("Firestore conectat:", db);

function AppContent() {
  const { user, loading } = useAuth();
  const isLoggedIn = !!user;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-darkgreen text-2xl">
        Loading...
      </div>
    );
  }

  const habits = [
    { id: 1, name: "Drink water", done: false },
    { id: 2, name: "Recycle plastic", done: false },
    { id: 3, name: "Take a walk", done: false },
  ];

  const toggleHabit = (id) => {
    console.log("Habit toggled:", id);
  };

  return (
    <div className="min-h-screen bg-fundal font-sans">
      <Header />

      {isLoggedIn && (
        <nav className="flex justify-center gap-4 py-4 px-6">
          <Link to="/stats" className="bg-bigbox text-darkgreen px-6 py-2 rounded-lg font-semibold hover:bg-smallbox transition shadow-md">Stats</Link>
          <Link to="/leaderboard" className="bg-bigbox text-darkgreen px-6 py-2 rounded-lg font-semibold hover:bg-smallbox transition shadow-md">Leaderboard</Link>
          <Link to="/redeem" className="bg-bigbox text-darkgreen px-6 py-2 rounded-lg font-semibold hover:bg-smallbox transition shadow-md">Redeem</Link>
          <Link to="/daily" className="bg-bigbox text-darkgreen px-6 py-2 rounded-lg font-semibold hover:bg-smallbox transition shadow-md">Daily Tasks</Link>
          <Link to="/map" className="bg-bigbox text-darkgreen px-6 py-2 rounded-lg font-semibold hover:bg-smallbox transition shadow-md">Map</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile habits={habits} toggleHabit={toggleHabit} /> : <Navigate to="/login" />} />
        <Route path="/stats" element={isLoggedIn ? <Stats habits={habits} /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={isLoggedIn ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="/redeem" element={isLoggedIn ? <Redeem /> : <Navigate to="/login" />} />
        <Route path="/daily" element={isLoggedIn ? <DailyTasks /> : <Navigate to="/login" />} />
        <Route path="/map" element={isLoggedIn ? <Map /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/profile" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
