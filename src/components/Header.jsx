import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

// SVG icons
import homeIcon from "../assets/home_icon.svg";
import statsIcon from "../assets/stats_icon.svg";
import tasksIcon from "../assets/tasks_icon.svg";
import redeemIcon from "../assets/redeem_icon.svg";
import userIcon from "../assets/user_icon.svg";
import leaderboardIcon from "../assets/leaderboard_icon.svg";
import mapIcon from "../assets/map_icon.svg";

import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../pages/authService";

export default function Header() {
  const { user } = useAuth() || {};

  const handleLogout = () => {
    if (user) logoutUser();
  };

  const firstName = user?.displayName?.split(" ")[0] || "Profile";

  // 🔹 Link-uri vizibile doar după login (fără Profile)
  const loggedInLinks = [
    { icon: homeIcon, label: "Home", path: "/" },
    { icon: tasksIcon, label: "Tasks", path: "/tasks" },
    { icon: redeemIcon, label: "Redeem", path: "/redeem" },
    { icon: mapIcon, label: "Map", path: "/map" },
    { icon: leaderboardIcon, label: "Leaderboard", path: "/leaderboard" },
    { icon: statsIcon, label: "Stats", path: "/stats" },
  ];

  // 🔹 Link-uri pentru utilizatori neautentificați
  const guestLinks = [
    { icon: homeIcon, label: "Home", path: "/" },
    { icon: userIcon, label: "Profile", path: "/profile" },
  ];

  return (
    <header className="bg-[#255938] text-[#F5EFE6] py-3 px-2 sm:px-3 shadow-md">
      <div className="flex items-center justify-between w-full max-w-[95%] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="Green Habits Logo"
            className="h-10 sm:h-12 md:h-16 lg:h-20 transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Tagline */}
        <div className="hidden md:block text-center flex-1">
          <span
            className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide"
            style={{
              fontFamily: "Arial Black, Arial, Impact, sans-serif",
              fontWeight: 900,
              letterSpacing: "0.08em",
            }}
          >
            Track your eco-friendly habits daily!
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <nav className="flex gap-6 sm:gap-8 items-center">
            {/* 🔹 Dacă e logat — afișăm toate linkurile (fără Profile) */}
            {user
              ? loggedInLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="flex flex-col items-center group"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-5 sm:h-6 md:h-7 lg:h-8 w-auto invert transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-[#F5EFE6] text-xs sm:text-sm mt-1 opacity-90 group-hover:opacity-100">
                      {item.label}
                    </span>
                  </Link>
                ))
              : // 🔹 Dacă NU e logat — doar Home și Profile
                guestLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="flex flex-col items-center group"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-5 sm:h-6 md:h-7 lg:h-8 w-auto invert transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-[#F5EFE6] text-xs sm:text-sm mt-1 opacity-90 group-hover:opacity-100">
                      {item.label}
                    </span>
                  </Link>
                ))}

            {/* 🔹 Iconița Profile — doar după login, la dreapta de tot */}
            {user && (
              <Link to="/profile" className="flex flex-col items-center group">
                <img
                  src={userIcon}
                  alt="Profile"
                  className="h-2 sm:h-2 md:h-2 lg:h-8 w-auto invert transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-[#F5EFE6] text-xs sm:text-sm mt-1 opacity-90 group-hover:opacity-100">
                  {firstName}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
