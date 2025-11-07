// src/components/Header.jsx
import React from "react";
import { useAuth } from "../hooks/useAuth"; // dacă folosești AuthContext pentru login/logout real
import { logoutUser } from "../pages/authService";

export default function Header() {
  const { user } = useAuth(); // user = obiectul Firebase, logout = funcția

  return (
    <header className="bg-[#255938] text-[#F5EFE6] p-6 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">GreenHabits</h1>
          <p className="mt-1 text-[#F5EFE6]">Track your eco-friendly habits daily!</p>
        </div>
        <div className="flex gap-2">
          {user && (
            <button
              onClick={logoutUser}
              className="bg-[#d4927e] text-[#2d5016] px-4 py-2 rounded hover:opacity-90 transition font-bold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
