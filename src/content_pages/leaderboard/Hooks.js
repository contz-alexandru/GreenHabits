// src/content_pages/leaderboard/hooks.js
// Hook personalizat pentru starea și funcțiile Leaderboard

import { useState } from "react";
import { globalUsers, initialFriendsList } from "./LeaderboardData";

// Funcție pentru sortarea datelor după un câmp selectat
export function sortData(data, field) {
  return [...data].sort((a, b) => b[field] - a[field]);
}

export function useLeaderboardState() {
  const [selectedField, setSelectedField] = useState("points");
  const [friendsList, setFriendsList] = useState(initialFriendsList);
  const [showModal, setShowModal] = useState(false);
  const [newFriend, setNewFriend] = useState("");

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (newFriend.trim() === "") return;
    setFriendsList([...friendsList, {
      name: newFriend.trim(),
      points: Math.floor(Math.random() * 80),
      co2: (Math.random() * 35).toFixed(1),
      streak: Math.floor(Math.random() * 10) + 1,
    }]);
    setNewFriend("");
    setShowModal(false);
  };

  return {
    selectedField, setSelectedField,
    friendsList, setFriendsList,
    showModal, setShowModal,
    newFriend, setNewFriend,
    handleAddFriend
  };
}
