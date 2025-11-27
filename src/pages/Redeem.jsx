import { origRewards, categoryLabels } from "../content_pages/redeem/RewardsData";
import RewardCard from "../content_pages/redeem/RewardCard";
import RedeemedList from "../content_pages/redeem/RedeemedList";
import FilterSortControls from "../content_pages/redeem/FilterSortControls";
import PopupRedeem from "../content_pages/redeem/PopupRedeem";
import DetailsModal from "../content_pages/redeem/DetailsModal";
import { useRedeemState } from "../content_pages/redeem/Hooks";

export default function Redeem() {
  // Import stare și funcții din custom hook
  const {
    selectedCategory, setSelectedCategory,
    sortOrder, setSortOrder,
    currentPage, setCurrentPage,
    showPopup, setShowPopup,
    redeemedReward,
    userPoints,
    claims,
    showDetails, setShowDetails,
    favorites,
    sortFavorites, setSortFavorites,
    giftMode,
    activeReview, setActiveReview,
    newRating, setNewRating,
    newComment, setNewComment,
    claimReward,
    closePopup,
    openReview,
    submitReview,
    toggleFav,
  } = useRedeemState(1600);

  const pageSize = 12;

  // Filtrare și sortare recompense după stare UI
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

  const progressToReward =
    sortedRewards.length > 0
      ? Math.max(0, sortedRewards[0].points - userPoints)
      : 0;

  return (
    <main className="p-6 min-h-screen relative z-10">
      <PopupRedeem showPopup={showPopup} closePopup={closePopup} redeemedReward={redeemedReward} giftMode={giftMode} />
      <DetailsModal showDetails={showDetails} setShowDetails={setShowDetails} />

      <div className="mx-auto max-w-5xl space-y-6">
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

        {claims.length > 0 && (
          <RedeemedList
            claims={claims}
            openReview={openReview}
            activeReview={activeReview}
            setActiveReview={setActiveReview}
            newRating={newRating}
            setNewRating={setNewRating}
            newComment={newComment}
            setNewComment={setNewComment}
            submitReview={submitReview}
          />
        )}

        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4" style={{ color: "var(--color-darkgreen)" }}>
          Redeem Rewards <span className="text-xl">🎁</span>
        </h2>

        <FilterSortControls
          selectedCategory={selectedCategory}
          setSelectedCategory={val => { setSelectedCategory(val); setCurrentPage(1); }}
          categoryOptions={categoryOptions}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <section
          className="bg-bigbox rounded-2xl shadow-md p-6 border border-smallbox"
          style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayRewards.map((reward, idx) => (
              <RewardCard
                key={idx}
                reward={reward}
                userPoints={userPoints}
                favorites={favorites}
                toggleFav={toggleFav}
                claimReward={claimReward}
                setGiftMode={val => val}
                setShowDetails={setShowDetails}
              />
            ))}
          </div>

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
