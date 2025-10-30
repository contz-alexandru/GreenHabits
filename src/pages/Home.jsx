import React, { useState } from "react";

export default function Home() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink water", done: false },
    { id: 2, name: "Recycle plastic", done: false },
    { id: 3, name: "Take a walk", done: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Home</h2>
      <ul className="space-y-2">
        {habits.map(habit => (
          <li
            key={habit.id}
            className={`flex justify-between items-center p-3 rounded shadow-sm ${
              habit.done ? "bg-darkgreen-100 line-through text-green-600" : "bg-white"
            }`}
          >
            {habit.name}
            <button
              onClick={() => toggleHabit(habit.id)}
              className={`px-3 py-1 rounded ${
                habit.done ? "bg-lightgreen-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {habit.done ? "Done" : "Mark Done"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
