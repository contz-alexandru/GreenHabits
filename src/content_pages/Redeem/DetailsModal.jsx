// src/content_pages/Redeem/DetailsModal.jsx
// Componentă modal pentru detaliile unei recompense

export default function DetailsModal({ showDetails, setShowDetails }) {
  if (!showDetails) return null;

  return (
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
  );
}
