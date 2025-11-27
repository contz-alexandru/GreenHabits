// src/content_pages/Redeem/RewardCard.jsx
// Componentă card pentru o recompensă
// Prop-uri: reward, userPoints, favorites, toggleFav, claimReward, setGiftMode, setShowDetails

export default function RewardCard({ reward, userPoints, favorites, toggleFav, claimReward, setGiftMode, setShowDetails }) {
  const canRedeem = userPoints >= reward.points;
  const isFav = favorites.includes(reward.name);

  return (
    <div
      className="flex flex-col justify-between bg-earth border border-smallbox rounded-xl shadow-sm p-5 transition hover:scale-[1.025] hover:shadow-lg relative"
      style={{
        backgroundColor: "var(--color-earth)",
        borderColor: "var(--color-smallbox)",
        color: "var(--color-darkgreen)",
        opacity: canRedeem ? 1 : 0.6,
        minHeight: 200
      }}
    >
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl border-none bg-transparent hover:scale-110 transition"
        style={{ zIndex: 10 }}
        onClick={() => toggleFav(reward.name)}
        aria-label="Add/Remove favorite"
        title={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {isFav ? "★" : "☆"}
      </button>

      <div className="flex items-center gap-3 mb-2 pr-9">
        <span className="text-2xl">{reward.icon}</span>
        <span className="text-lg font-semibold">{reward.name}</span>
      </div>

      <div
        className="text-sm mb-4 pr-4"
        style={{ color: "var(--color-darkgreen)", cursor: "pointer" }}
        onClick={() => setShowDetails(reward)}
      >
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
}
