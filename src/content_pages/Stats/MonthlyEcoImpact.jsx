export default function MonthlyEcoImpact({totalLunarImpact}){
    return (
        <div className="flex-1 flex flex-col items-center justify-center rounded-2xl shadow-md p-7 border border-smallbox shadow-lg relative overflow-hidden impact-animated box-animated"
            style={{
              background: "var(--color-earth)",
              color: "var(--color-darkgreen)",
              borderColor: "var(--color-smallbox)",
              minHeight: 260,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <img
              src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/fcc94e40-fdab-4e36-88fc-fa8eee56d902.png"
              alt="CO2 eco leaf"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.21,
                zIndex: 1,
                pointerEvents: "none",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.09))"
              }}
            />
            <span className="text-xl font-bold mb-3 z-10" style={{ letterSpacing: "0.01em" }}>Your Ecological Impact This Month</span>
            <span className="text-5xl font-extrabold mb-3 z-10 flex gap-2 items-center" style={{ color: "var(--color-darkgreen)" }}>
              {totalLunarImpact} kg CO₂
              <span className="text-3xl" aria-label="Earth">🌍</span>
            </span>
            <span className="text-lg font-semibold text-center mt-1 z-10" style={{ color: "var(--color-darkgreen)", lineHeight: 1.35 }}>
              You have saved <b>{totalLunarImpact} kg CO₂</b> through your sustainable actions this month!
            </span>
            <span className="uppercase tracking-wide mt-4 text-[1.1rem] font-medium z-10"
              style={{ color: '#357d55', letterSpacing: '0.05em' }}>
            </span>
          </div>
    )
}