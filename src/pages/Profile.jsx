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
      <section className="bg-[#b8cec1] p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-[#2d5016]">Profile</h2>
        <p className="text-[#2d5016]"><strong>Name:</strong> {user.name}</p>
        <p className="text-[#2d5016]"><strong>Email:</strong> {user.email}</p>
        <p className="text-[#2d5016]"><strong>Total Habits Completed:</strong> {user.totalHabits}</p>
        <p className="text-[#2d5016]"><strong>Current Streak:</strong> {user.streak} days</p>
      </section>

      <section className="bg-[#b8cec1] p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-[#2d5016]">Your Habits</h3>
        <ul className="space-y-2">
          {habits.map((habit) => (
            <li
              key={habit.id}
              className={`flex items-center justify-between p-3 border rounded shadow-sm transition ${
                habit.done ? "bg-[#b8cec1] line-through text-[#2d5016]" : "bg-[#d4927e]"
              }`}
            >
              <span className="text-[#2d5016]">{habit.name}</span>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  habit.done ? "bg-[#2d5016] text-white" : "bg-[#b8cec1] text-[#2d5016] hover:bg-[#2d5016] hover:text-white"
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