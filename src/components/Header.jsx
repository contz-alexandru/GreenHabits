import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import logoutIcon from "../assets/logout_icon.svg";

// SVG icons
import homeIcon from "../assets/home_icon.svg";
import statsIcon from "../assets/stats_icon.svg";
import tasksIcon from "../assets/tasks_icon.svg";
import redeemIcon from "../assets/redeem_icon.svg";
import userIcon from "../assets/user_icon.svg";
import leaderboardIcon from "../assets/leaderboard_icon.svg";

import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../pages/authService";

export default function Header() {
  const { user } = useAuth() || {};

  const handleLogout = () => {
    if (user) logoutUser();
  };

  const firstName = user?.displayName?.split(" ")[0] || "Profile";

  return (
    <header className="bg-[#255938] text-[#F5EFE6] py-3 px-2 sm:px-3 shadow-md">
      <div className="flex items-center justify-between w-full max-w-[95%] sm:max-w-[95%] lg:max-w-[95%] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="Green Habits Logo"
            className="h-10 sm:h-12 md:h-16 lg:h-20 transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Optional Center Tagline */}
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

        {/* Navigation Icons + Profile/Logout */}
        <div className="flex items-center gap-3">
          <nav className="flex gap-6 sm:gap-8 items-center">
  {[
    { icon: homeIcon, label: "Home", path: "/" },
    { icon: statsIcon, label: "Stats", path: "/stats" },
    { icon: tasksIcon, label: "Tasks", path: "/tasks" },
    { icon: redeemIcon, label: "Redeem", path: "/redeem" },
    { icon: leaderboardIcon, label: "Leaderboard", path: "/leaderboard" },
    { icon: userIcon, label: "Profile", path: "/profile" },
  ].map((item, idx) => (
    <Link
      key={idx}
      to={item.path}
      className="flex flex-col items-center group"
    >
      <img
        src={item.icon}
        alt={item.label}
        className="h-6 sm:h-8 md:h-9 lg:h-10 w-auto invert transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-[#F5EFE6] text-xs sm:text-sm mt-1 opacity-90 group-hover:opacity-100">
        {item.label}
      </span>
    </Link>
  ))}
</nav>


          {/* User info */}
          {user && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => (window.location.href = "/profile")}
                className="hidden sm:inline bg-[#F5EFE6] text-[#2d5016] font-bold text-sm rounded px-2 py-1 hover:opacity-90 transition"
              >
                {firstName}
              </button>

              <button
                onClick={handleLogout}
                className="bg-[#F5EFE6] rounded p-2 hover:bg-opacity-80 transition flex items-center justify-center"
              >
                <img src={logoutIcon} alt="Logout" className="w-5 h-5 sm:w-6 sm:h-6 invert" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}