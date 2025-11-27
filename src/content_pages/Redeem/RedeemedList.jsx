// src/content_pages/Redeem/RedeemedList.jsx
// Componentă pentru lista recompenselor răscumpărate

export default function RedeemedList({
  claims,
  openReview,
  activeReview,
  setActiveReview,
  newRating,
  setNewRating,
  newComment,
  setNewComment,
  submitReview
}) {
  return (
    <section className="bg-bigbox border border-smallbox rounded-2xl p-5 shadow mb-4">
      <h4 className="font-extrabold text-darkgreen mb-3" style={{ color: "var(--color-darkgreen)" }}>
        My Redeemed Rewards
      </h4>
      <ul className="divide-y">
        {claims.map((claim, idx) => (
          <li key={idx} className="flex flex-col md:flex-row md:items-center gap-2 py-3">
            <div className="flex items-center gap-3 w-full md:w-1/2">
              <span className="text-xl">{claim.icon}</span>
              <span className="font-semibold">{claim.name}</span>
            </div>
            <div className="text-xs italic text-darkgreen"> {claim.status} </div>
            <div className="flex-1">
              {claim.gifted && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mr-2">
                  Gifted
                </span>
              )}
              {claim.feedback === "left" ? (
                <span className="ml-2 text-sm text-emerald-900">Thank you for your {claim.reviewRating}★ review!</span>
              ) : (
                <button
                  className="ml-2 text-xs px-3 py-1 rounded border shadow font-semibold bg-beige border-smallbox text-darkgreen hover:bg-emerald-100"
                  style={{ backgroundColor: "var(--color-beige)", color: "var(--color-darkgreen)", borderColor: "var(--color-smallbox)" }}
                  onClick={() => openReview(idx)}
                >
                  Leave Review
                </button>
              )}
            </div>

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
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <span
                        key={s}
                        style={{ fontSize: "2rem", cursor: "pointer", color: s <= newRating ? "#e8ae11" : "#ddd" }}
                        onClick={() => setNewRating(s)}
                      >
                        ★
                      </span>
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
                  >
                    Submit Review
                  </button>
                  <button
                    className="mt-2 text-xs border-none text-darkgreen underline"
                    onClick={() => setActiveReview(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
