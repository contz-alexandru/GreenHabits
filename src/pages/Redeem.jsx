import React, { useState } from "react";

// Extend rewards with isDigital property
const origRewards = [
  { name: "1 Month Gym Membership", description: "Enjoy unlimited gym access for a month.", points: 1000, icon: "🏋️", category: "health", isDigital: false },
  { name: "100 Ron Lidl Gift Card", description: "Perfect for your next grocery shopping trip.", points: 600, icon: "🛒", category: "giftcards", isDigital: true },
  { name: "Reusable Water Bottle", description: "Stay hydrated and reduce single-use plastic.", points: 350, icon: "🚰", category: "eco", isDigital: false },
  { name: "Plant a Tree Certificate", description: "We plant a tree in your name.", points: 500, icon: "🌳", category: "eco", isDigital: true },
  { name: "Energy Saving LED Bulb", description: "Brighten your home efficiently.", points: 200, icon: "💡", category: "gadgets", isDigital: false },
  { name: "Bus 1-Day Pass", description: "Enjoy unlimited local bus rides for 24 hours.", points: 150, icon: "🚌", category: "transportation", isDigital: true },
  { name: "100 Ron eMag Gift Card", description: "Shop electronics, gadgets & more.", points: 700, icon: "💳", category: "giftcards", isDigital: true },
  { name: "E-Book Voucher", description: "For digital learning resources.", points: 400, icon: "📚", category: "giftcards", isDigital: true },
  { name: "Local Coffee Giftcard", description: "Enjoy a coffee in the city.", points: 150, icon: "☕", category: "giftcards", isDigital: true },
  { name: "Bike Repair Kit", description: "Be ready for your next ride.", points: 350, icon: "🚴", category: "gadgets", isDigital: false },
  { name: "Bus 7-Day Pass", description: "A full week of unlimited rides.", points: 900, icon: "🚌", category: "transportation", isDigital: true },
  { name: "Solar Charger", description: "Charge your devices sustainably with the power of the sun.", points: 800, icon: "🔋", category: "eco", isDigital: false },
  { name: "Home Compost Starter Kit", description: "Kickstart your eco journey with a home compost system.", points: 400, icon: "🌱", category: "eco", isDigital: false },
  { name: "Public Transport 1-Month Pass", description: "Go green for a month with unlimited city transport.", points: 1800, icon: "🚍", category: "transportation", isDigital: true },
  { name: "Fair Trade Coffee Pack", description: "Ethically sourced coffee for your mornings.", points: 300, icon: "☕", category: "food", isDigital: false },
  { name: "Urban Garden Workshop", description: "Learn urban gardening skills in a hands-on workshop.", points: 250, icon: "🪴", category: "eco", isDigital: false },
  { name: "Sustainable Toothbrush Set", description: "Set of 4 biodegradable, bamboo toothbrushes.", points: 90, icon: "🪥", category: "eco", isDigital: false },
  { name: "Reusable Straw Set", description: "Help reduce plastic pollution with this set of 5.", points: 60, icon: "🥤", category: "eco", isDigital: false },
  { name: "Library Annual Pass", description: "Unlimited access to your local library for a year.", points: 120, icon: "📖", category: "education", isDigital: true },
  { name: "Bike Parking Membership", description: "Monthly subscription for secure city center bike parking.", points: 160, icon: "🚲", category: "transportation", isDigital: true },
  { name: "Zero Waste Starter Box", description: "Includes beeswax wraps and soap, to help you cut waste.", points: 230, icon: "📦", category: "eco", isDigital: false },
  { name: "Eco-Friendly Detergent Pack", description: "Non-toxic, refillable laundry solution.", points: 140, icon: "🧺", category: "eco", isDigital: false },
  { name: "Plant-Based Meal Voucher", description: "Try something delicious & planet-friendly.", points: 220, icon: "🥗", category: "food", isDigital: true },
  { name: "Rain Barrel Discount", description: "Save on collecting rainwater for your garden.", points: 550, icon: "💧", category: "eco", isDigital: false },
  { name: "LED Desk Lamp", description: "Efficient, bright, long-lasting desk light.", points: 180, icon: "🛋️", category: "gadgets", isDigital: false },
  { name: "Kids’ Environmental Book", description: "Inspire a child to care for the planet!", points: 110, icon: "📘", category: "education", isDigital: false },
  { name: "Secondhand Clothes Voucher", description: "Shop sustainable fashion with this voucher.", points: 135, icon: "👕", category: "clothing", isDigital: true },
  { name: "Neighborhood Cleanup Kit", description: "Gloves, bags, and guidance for a group cleanup.", points: 160, icon: "🗑️", category: "eco", isDigital: false },
  { name: "Wildlife-friendly Birdfeeder", description: "Support garden wildlife with a safe feeder.", points: 180, icon: "🐦", category: "eco", isDigital: false },
  { name: "Thermos Food Jar", description: "Keep meals warm or cold—less packaging waste!", points: 210, icon: "🥣", category: "eco", isDigital: false }
];

const categoryLabels = {
  giftcards: "Giftcards",
  transportation: "Transportation",
  health: "Health",
  eco: "Eco",
  gadgets: "Gadgets",
  clothing: "Clothing",
  food: "Food",
  education: "Education"
};

const pageSize = 12;
const initialPoints = 1600;

export default function Redeem() {
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

  // --- Rewards and UI Filtering ---
  const filteredRewards = selectedCategory === "all"
    ? origRewards
    : origRewards.filter(r => r.category === selectedCategory);

  const favFiltered = sortFavorites
    ? filteredRewards.filter(r => favorites.includes(r.name))
    : filteredRewards;

  const sortedRewards = [...favFiltered].sort((a, b) =>
    sortOrder === "asc" ? a.points - b.points : b.points - a.points
  );

  const totalPages = Math.ceil(sortedRewards.length / pageSize);
  const displayRewards = sortedRewards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label })),
  ];

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

  const progressToReward =
    sortedRewards.length > 0
      ? Math.max(0, sortedRewards[0].points - userPoints)
      : 0;

  const toggleFav = name => {
    setFavorites(favs => favs.includes(name) ? favs.filter(n => n !== name) : [...favs, name]);
  };

  return (
    <main className="p-6 min-h-screen relative z-10">
      {/* Popup on Redeem or Gift */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.12)",
              zIndex: 60
            }}
            onClick={closePopup}
          ></div>
          <div
            className="relative bg-bigbox rounded-2xl border border-smallbox p-8 shadow-2xl z-60 w-[93vw] max-w-md mx-auto flex flex-col items-center"
            style={{
              backgroundColor: "var(--color-bigbox)",
              borderColor: "var(--color-smallbox)"
            }}
          >
            <div className="text-4xl mb-3">{giftMode ? "🎁" : "🎉"}</div>
            <h3 className="font-bold text-2xl mb-2 text-darkgreen" style={{ color: "var(--color-darkgreen)" }}>
              {giftMode ? "Gift Sent!" : "Congratulations!"}
            </h3>
            <p className="mb-3 text-center text-lg" style={{ color: "var(--color-darkgreen)" }}>
              {giftMode
                ? <>Your reward will be gifted: <br />
                    <span className="font-semibold">{redeemedReward?.name}</span></>
                : <>You've successfully redeemed: <br />
                    <span className="font-semibold">{redeemedReward?.name}</span></>}
            </p>
            <p className="mb-5 text-center" style={{ color: "var(--color-darkgreen)" }}>
              {giftMode
                ? "We'll let you and your recipient know once it's on the way!"
                : `Your reward will be granted soon. Thank you for taking sustainable action!`}
            </p>
            <button
              onClick={closePopup}
              className="bg-darkgreen text-fundal px-6 py-2 rounded-lg font-bold border border-darkgreen shadow hover:opacity-90 mt-2"
              style={{
                backgroundColor: "var(--color-darkgreen)",
                color: "var(--color-fundal)"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.14)"
            }}
            onClick={() => setShowDetails(null)}
          />
          <div
            className="relative bg-bigbox rounded-2xl border border-smallbox p-8 shadow-2xl z-60 w-[95vw] max-w-md mx-auto flex flex-col items-center"
            style={{
              backgroundColor: "var(--color-bigbox)",
              borderColor: "var(--color-smallbox)"
            }}
          >
            <div className="text-5xl mb-3">{showDetails.icon}</div>
            <h3 className="font-bold text-2xl mb-2 text-darkgreen">{showDetails.name}</h3>
            <p className="mb-3 text-center text-lg">{showDetails.description}</p>
            <div className="mb-2">
              <span className="font-semibold">{showDetails.points} points</span>
              <span className="block text-xs mt-1">{showDetails.isDigital ? "Digital delivery" : "Shipped/picked up"}</span>
            </div>
            <button
              onClick={() => setShowDetails(null)}
              className="bg-darkgreen text-fundal px-5 py-2 rounded-lg font-bold border border-darkgreen shadow hover:opacity-90 mt-3"
              style={{
                backgroundColor: "var(--color-darkgreen)", color: "var(--color-fundal)"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl space-y-6">
        {/* --- USER POINTS and PROGRESS --- */}
        <div className="flex flex-row justify-between gap-3 items-center">
          <div className="flex-1">
            <div className="font-bold text-xl mb-0.5" style={{ color: "var(--color-darkgreen)" }}>Your Points: {userPoints}</div>
            <div className="text-xs" style={{ color: "#398c4f" }}>
              {progressToReward <= 0
                ? "You can claim any reward in the list below!"
                : <>You need <span className="font-bold">{progressToReward}</span> more points for your next best reward.</>
              }
            </div>
          </div>
          <button
            className="px-3 py-1 rounded bg-beige border border-smallbox text-darkgreen font-semibold shadow ml-2"
            style={{ backgroundColor: "var(--color-beige)", color: "var(--color-darkgreen)", borderColor: "var(--color-smallbox)" }}
            onClick={() => setSortFavorites(fav => !fav)}
          >
            {sortFavorites ? "Show All" : "Show Favorites Only"}
          </button>
        </div>

        {/* --- REDEEMED CLAIMS & HISTORY --- */}
        {claims.length > 0 && (
          <section className="bg-bigbox border border-smallbox rounded-2xl p-5 shadow mb-4">
            <h4 className="font-extrabold text-darkgreen mb-3" style={{ color: "var(--color-darkgreen)" }}>My Redeemed Rewards</h4>
            <ul className="divide-y">
              {claims.map((claim, idx) => (
                <li key={idx} className="flex flex-col md:flex-row md:items-center gap-2 py-3">
                  <div className="flex items-center gap-3 w-full md:w-1/2">
                    <span className="text-xl">{claim.icon}</span>
                    <span className="font-semibold">{claim.name}</span>
                  </div>
                  <div className="text-xs italic text-darkgreen"> {claim.status} </div>
                  <div className="flex-1">
                    {/* Optional: Gifted label */}
                    {claim.gifted && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mr-2">
                        Gifted
                      </span>
                    )}
                    {/* Review UI */}
                    {claim.feedback === "left" ? (
                      <span className="ml-2 text-sm text-emerald-900">Thank you for your {claim.reviewRating}★ review!</span>
                    ) : (
                      <button
                        className="ml-2 text-xs px-3 py-1 rounded border shadow font-semibold bg-beige border-smallbox text-darkgreen hover:bg-emerald-100"
                        style={{ backgroundColor: "var(--color-beige)", color: "var(--color-darkgreen)", borderColor: "var(--color-smallbox)" }}
                        onClick={() => openReview(idx)}
                      >Leave Review</button>
                    )}
                  </div>
                  {/* Review Modal */}
                  {activeReview === idx && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center">
                      <div
                        className="fixed inset-0"
                        style={{
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          background: "rgba(255,255,255,0.18)"
                        }}
                        onClick={() => setActiveReview(null)}
                      />
                      <div className="relative bg-bigbox rounded-2xl border border-smallbox p-7 shadow-2xl z-70 w-full max-w-sm mx-auto flex flex-col items-center">
                        <h3 className="font-bold text-lg mb-2 text-darkgreen">Leave a Review</h3>
                        {/* Star rating */}
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map(s => (
                            <span
                              key={s}
                              style={{ fontSize: "2rem", cursor: "pointer", color: s <= newRating ? "#e8ae11" : "#ddd" }}
                              onClick={() => setNewRating(s)}
                            >★</span>
                          ))}
                        </div>
                        <textarea
                          className="w-full mb-3 rounded border border-smallbox p-2"
                          placeholder="Share your thoughts..."
                          value={newComment}
                          onChange={e => setNewComment(e.target.value)}
                          rows={3}
                        />
                        <button
                          onClick={() => submitReview(idx)}
                          disabled={newRating === 0}
                          className="bg-darkgreen text-fundal px-5 py-2 rounded-lg font-bold border border-darkgreen shadow hover:opacity-90"
                        >Submit Review</button>
                        <button
                          className="mt-2 text-xs border-none text-darkgreen underline"
                          onClick={() => setActiveReview(null)}
                        >Cancel</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4" style={{ color: "var(--color-darkgreen)" }}>
          Redeem Rewards <span className="text-xl">🎁</span>
        </h2>
        {/* Filter + Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-3">
          {/* Category */}
          <div className="w-full md:w-auto">
            <select
              className="bg-bigbox border border-smallbox rounded-lg px-4 py-2 text-darkgreen font-semibold"
              style={{
                backgroundColor: "var(--color-bigbox)",
                borderColor: "var(--color-smallbox)",
                color: "var(--color-darkgreen)",
              }}
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {/* Sort */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <label className="text-md font-semibold" style={{ color: "var(--color-darkgreen)" }}>Sort by points:</label>
            <button
              className="ml-1 px-4 py-2 rounded-lg border border-darkgreen bg-beige font-bold transition hover:bg-smallbox"
              style={{
                backgroundColor: "var(--color-beige)",
                borderColor: "var(--color-darkgreen)",
                color: "var(--color-darkgreen)",
              }}
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            >
              {sortOrder === "desc" ? "Highest → Lowest" : "Lowest → Highest"}
            </button>
          </div>
        </div>
        {/* Card Grid */}
        <section
  className="bg-bigbox rounded-2xl shadow-md p-6 border border-smallbox"
  style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {displayRewards.map((reward, idx) => {
      const canRedeem = userPoints >= reward.points;
      const isFav = favorites.includes(reward.name);
      return (
        <div
          key={idx}
          className="flex flex-col justify-between bg-earth border border-smallbox rounded-xl shadow-sm p-5 transition hover:scale-[1.025] hover:shadow-lg relative"
          style={{
            backgroundColor: "var(--color-earth)",
            borderColor: "var(--color-smallbox)",
            color: "var(--color-darkgreen)",
            opacity: canRedeem ? 1 : 0.6,
            minHeight: 200
          }}
        >
          {/* Wishlist star button - right, vertically centered */}
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl border-none bg-transparent hover:scale-110 transition"
            style={{ zIndex: 10 }}
            onClick={() => toggleFav(reward.name)}
            aria-label="Add/Remove favorite"
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >{isFav ? "★" : "☆"}</button>
          
          <div className="flex items-center gap-3 mb-2 pr-9">
            <span className="text-2xl">{reward.icon}</span>
            <span className="text-lg font-semibold">{reward.name}</span>
          </div>
          <div className="text-sm mb-4 pr-4" style={{ color: "var(--color-darkgreen)", cursor: "pointer" }} onClick={() => setShowDetails(reward)}>
            {reward.description}
          </div>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-base font-bold" style={{ color: "var(--color-darkgreen)" }}>
              {reward.points} points
            </span>
            <div className="flex gap-2">
              <button
                className="bg-darkgreen text-fundal px-4 py-2 rounded-lg font-semibold border border-darkgreen transition hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-darkgreen)",
                  borderColor: "var(--color-darkgreen)",
                  color: "var(--color-fundal)",
                }}
                disabled={!canRedeem}
                onClick={() => claimReward(reward, false)}
              >
                Redeem
              </button>
              <button
                className="bg-emerald-900 text-fundal px-3 py-2 rounded-lg font-semibold border border-emerald-900 transition hover:opacity-90"
                style={{
                  backgroundColor: "#235d3a",
                  borderColor: "#235d3a",
                  color: "var(--color-fundal)",
                }}
                disabled={!canRedeem || reward.isDigital}
                onClick={() => { setGiftMode(true); claimReward(reward, true); }}
                title={reward.isDigital ? "Cannot gift digital rewards" : "Gift/donate to a friend"}
              >
                Gift
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 w-full">
              <button
                className="px-3 py-1 rounded border font-semibold"
                style={{ backgroundColor: "var(--color-beige)", borderColor: "var(--color-darkgreen)", color: "var(--color-darkgreen)" }}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <div className="flex justify-center items-center gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-8 h-8 flex items-center justify-center rounded font-bold border ${currentPage === idx + 1 ? "bg-earth" : "bg-beige"} transition`}
                    style={{
                      backgroundColor: currentPage === idx + 1 ? "var(--color-earth)" : "var(--color-beige)",
                      borderColor: "var(--color-darkgreen)",
                      color: "var(--color-darkgreen)",
                    }}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <button
                className="px-3 py-1 rounded border font-semibold"
                style={{ backgroundColor: "var(--color-beige)", borderColor: "var(--color-darkgreen)", color: "var(--color-darkgreen)" }}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
export { origRewards };
