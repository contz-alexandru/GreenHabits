// src/content_pages/Redeem/hooks.jsx
import { useState } from "react";

// Funcții mutate stare și logica pentru pagina Redeem

export function useRedeemState(initialPoints) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [redeemedReward, setRedeemedReward] = useState(null);
  const [userPoints, setUserPoints] = useState(initialPoints);
  const [claims, setClaims] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [sortFavorites, setSortFavorites] = useState(false);
  const [giftMode, setGiftMode] = useState(false);
  const [activeReview, setActiveReview] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  // Funcții mutate stare
  const claimReward = (reward, isGifted = false) => {
    setUserPoints(p => p - reward.points);
    setClaims([
      {
        ...reward,
        date: new Date(),
        status: reward.isDigital ? "claimed (digital)" : (isGifted ? "gifted" : "pending"),
        gifted: isGifted,
        feedback: null,
        reviewRating: 0,
        review: ''
      },
      ...claims
    ]);
    setRedeemedReward(reward);
    setShowPopup(true);
    setGiftMode(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setRedeemedReward(null);
    setGiftMode(false);
  };

  const openReview = idx => {
    setActiveReview(idx);
    setNewRating(0);
    setNewComment('');
  };

  const submitReview = idx => {
    setClaims(claims =>
      claims.map((claim, k) =>
        k === idx ? { ...claim, reviewRating: newRating, review: newComment, feedback: "left" } : claim
      )
    );
    setActiveReview(null);
    setNewRating(0);
    setNewComment('');
  };

  const toggleFav = name => {
    setFavorites(favs => favs.includes(name) ? favs.filter(n => n !== name) : [...favs, name]);
  };

  return {
    selectedCategory, setSelectedCategory,
    sortOrder, setSortOrder,
    currentPage, setCurrentPage,
    showPopup, setShowPopup,
    redeemedReward, setRedeemedReward,
    userPoints, setUserPoints,
    claims, setClaims,
    showDetails, setShowDetails,
    favorites, setFavorites,
    sortFavorites, setSortFavorites,
    giftMode, setGiftMode,
    activeReview, setActiveReview,
    newRating, setNewRating,
    newComment, setNewComment,

    claimReward,
    closePopup,
    openReview,
    submitReview,
    toggleFav,
  };
}

