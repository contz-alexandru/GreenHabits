import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Login from "./pages/Login";

export default function App() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink water", done: false },
    { id: 2, name: "Recycle plastic", done: false },
    { id: 3, name: "Take a walk", done: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">GreenHabits 🌱</h1>
        <p className="mt-1 text-green-100">Track your eco-friendly habits daily!</p>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          Build Sustainable Habits
        </h2>
        <p className="text-green-700 mb-6 max-w-xl mx-auto">
          Stay motivated and track your eco-friendly activities every day. Small actions lead to big impact!
        </p>
        <Link to="/home" className="bg-green-600 text-black px-6 py-2 rounded hover:bg-green-700 transition ml-4">Home</Link>
        <Link to="/profile" className="bg-green-600 text-black px-6 py-2 rounded hover:bg-green-700 transition ml-4">Profile</Link>
        <Link to="/stats" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition ml-4">Stats</Link>
        <Link to="/login" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition ml-4">Login</Link>
      </section>

      {/* Habits List */}
      <section className="max-w-2xl mx-auto p-4">
        <h3 className="text-xl font-semibold mb-4">Your Habits</h3>
        <ul className="space-y-2">
          {habits.map((habit) => (
            <li
              key={habit.id}
              className={`flex items-center justify-between p-3 border rounded shadow-sm ${
                habit.done ? "bg-green-100 line-through text-green-600" : "bg-white"
              }`}
            >
              <span>{habit.name}</span>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`px-3 py-1 rounded ${
                  habit.done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {habit.done ? "Done" : "Mark Done"}
              </button>
            </li>
          ))}
        </ul>
      </section>
      {/* Routes */}
      <main className="p-6 max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home habits={habits} toggleHabit={toggleHabit} />} />
          <Route path="/profile" element={<Profile habits={habits} />} />
          <Route path="/stats" element={<Stats habits={habits} />} />
          <Route path="/login" element={<Login  />} />
        </Routes>
      </main>
    </div>
  );
}
