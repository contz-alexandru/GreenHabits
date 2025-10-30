import React, { useState } from "react";

export default function Profile() {
  const user = { name: "Jane Doe", email: "jane@example.com", totalHabits: 42, streak: 7 };

  const [habits, setHabits] = useState([
    { id: 1, name: "Morning Run", done: false },
    { id: 2, name: "Read 20 Pages", done: true },
    { id: 3, name: "Meditate", done: false },
  ]);

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Total Habits Completed:</strong> {user.totalHabits}</p>
        <p><strong>Current Streak:</strong> {user.streak} days</p>
      </section>

      <section className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Habits</h3>
        <ul className="space-y-2">
          {habits.map((habit) => (
            <li
              key={habit.id}
              className={`flex items-center justify-between p-3 border rounded shadow-sm transition ${
                habit.done ? "bg-green-100 line-through text-green-600" : "bg-gray-50"
              }`}
            >
              <span>{habit.name}</span>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  habit.done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {habit.done ? "Done" : "Mark Done"}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
