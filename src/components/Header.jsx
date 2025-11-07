// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-green-habits.png";
import { useAuth } from "../hooks/useAuth"; // pentru autentificare reală
import { logoutUser } from "../pages/authService"; // funcția de logout din Firebase

export default function Header() {
  // user din contextul de autentificare (Firebase)
  const { user } = useAuth() || {};

  // fallback pentru testare locală (dacă nu există contextul)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoginState = () => setIsLoggedIn((prev) => !prev);
  const handleLogout = () => {
    if (user) logoutUser(); // logout real dacă user e conectat prin Firebase
    else setIsLoggedIn(false); // logout   local dacă e testare
  };

  // se consideră autentificat dacă avem user din Firebase sau dacă e activ testul local
  const loggedIn = !!user || isLoggedIn;

  return (
    <header className="bg-[#255938] text-[#F5EFE6] py-2 px-4 shadow-md relative">
      <div className="grid grid-cols-3 items-center w-full">
        {/* Logo stânga */}
        <div className="justify-self-start">
          <Link to="/" className="inline-block">
            <img
              src={logo}
              alt="Green Habits Logo"
              className="w-[200px] md:w-[300px] lg:w-[400px] h-auto transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(37,89,56,0.4)]"
            />
          </Link>
        </div>

        {/* Mesaj central */}
        <div className="justify-self-center">
          <span
            className="text-2xl font-bold tracking-wide text-center"
            style={{
              color: "beige",
              fontFamily: "Arial Black, Arial, Impact, sans-serif",
              fontWeight: 900,
              letterSpacing: "0.08em",
            }}
          >
            Track your eco-friendly habits daily!
          </span>
        </div>

        {/* Butoane dreapta */}
        <div className="flex gap-2 justify-self-end">
          {/* Buton de test login/logout */}
          {!user && (
            <button
              onClick={toggleLoginState}
              className="bg-[#d4927e] text-[#2d5016] px-3 py-1 rounded hover:opacity-90 transition font-bold text-sm"
            >
              TEST: {isLoggedIn ? "Logged In" : "Logged Out"}
            </button>
          )}

          {/* Buton Logout (vizibil dacă user autenticat sau test activ) */}
          {loggedIn && (
            <button
              onClick={handleLogout}
              className="bg-[#d4927e] text-[#2d5016] px-3 py-1 rounded hover:opacity-90 transition font-bold text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
