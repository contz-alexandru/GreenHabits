// src/content_pages/Redeem/PopupRedeem.jsx
// Componentă popup cu blur DOAR pe background, popup-ul rămâne clar

export default function PopupRedeem({ showPopup, closePopup, redeemedReward, giftMode }) {
  if (!showPopup) return null;

  return (
    <>
      {/* OVERLAY BLUR - DOAR BACKGROUND */}
      <div
        className="fixed inset-0 z-50"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          background: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
        }}
        onClick={closePopup}
      />
    
      <div
        className="fixed inset-0 z-60 flex items-center justify-center p-4"
      >
        <div
          className="bg-bigbox rounded-2xl border border-smallbox p-8 shadow-2xl w-full max-w-md mx-auto flex flex-col items-center max-h-[90vh] overflow-auto"
          style={{
            backgroundColor: "var(--color-bigbox)",
            borderColor: "var(--color-smallbox)",
            backdropFilter: "none",
            WebkitBackdropFilter: "none"
          }}
        >
          <div className="text-4xl mb-3">{giftMode ? "🎁" : "🎉"}</div>
          <h3 className="font-bold text-2xl mb-2 text-darkgreen" style={{ color: "var(--color-darkgreen)" }}>
            {giftMode ? "Gift Sent!" : "Congratulations!"}
          </h3>
          <p className="mb-3 text-center text-lg" style={{ color: "var(--color-darkgreen)" }}>
            {giftMode
              ? <>Your reward will be gifted: <br /><span className="font-semibold">{redeemedReward?.name}</span></>
              : <>You've successfully redeemed: <br /><span className="font-semibold">{redeemedReward?.name}</span></>}
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
    </>
  );
}
