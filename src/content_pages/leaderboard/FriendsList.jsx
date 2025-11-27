// src/content_pages/leaderboard/FriendsList.jsx
// Lista prieteni + buton Add Friend

import React from "react";

export default function FriendsList({ friends, selectedField, onAddFriendClick }) {
  const miniCard = "flex items-center justify-between border rounded-xl px-4 py-3 shadow bg-earth border-smallbox text-base";
  const miniCardStyle = {
    backgroundColor: "var(--color-earth)",
    borderColor: "var(--color-smallbox)",
    color: "var(--color-darkgreen)",
    width: "100%",
    fontSize: "15px"
  };

  return (
    <section
      className="rounded-2xl shadow-md border border-smallbox p-6 flex-1 flex flex-col justify-between"
      style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
    >
      <h3 className="text-xl font-bold mb-4 text-darkgreen">Friends List</h3>
      
      {/* SCROLLBAR - TOȚI PRIETENII */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-6 scrollbar-thin scrollbar-thumb-darkgreen scrollbar-track-bigbox max-h-64">
        {friends.map((friend) => (
          <li key={friend.name} className={miniCard} style={miniCardStyle}>
            <span>{friend.name}</span>
            <span className="text-right text-xs" style={{ fontSize: "13px" }}>
              {friend.points} tasks<br />
              {friend.co2} kg CO₂<br />
              {friend.streak} days
            </span>
          </li>
        ))}
      </div>

      {/* INFO câți prieteni ai */}
      <p className="text-sm text-darkgreen mb-4 text-center opacity-80">
        Total: {friends.length} friends
      </p>

      {/* BUTON ADD FRIEND */}
      <button
        className="w-full px-4 py-2 rounded-lg font-semibold border border-darkgreen bg-darkgreen text-fundal hover:bg-[#388e5f] transition"
        style={{
          backgroundColor: "var(--color-darkgreen)",
          borderColor: "var(--color-darkgreen)",
          color: "var(--color-fundal)"
        }}
        onClick={onAddFriendClick}
      >
        + Add Friend
      </button>
    </section>
  );
}
