// src/content_pages/leaderboard/LeaderboardGlobal.jsx
// Clasament global cu premii

import { prizes, prizeColors } from "./LeaderboardData";

export default function LeaderboardGlobal({ users, selectedField }) {
  const miniCardStyle = {
    backgroundColor: "var(--color-earth)",
    borderColor: "var(--color-smallbox)",
    color: "var(--color-darkgreen)",
    width: "100%",
    fontSize: "15px"
  };

  return (
    <section
      className="w-full md:w-1/2 flex-shrink-0 bg-bigbox rounded-2xl p-6 shadow-md border border-smallbox flex flex-col"
      style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
    >
      <h2 className="text-2xl font-extrabold mb-4" style={{ color: "var(--color-darkgreen)" }}>
        🌍 Monthly Leaderboard
      </h2>
      <p className="mb-4 text-darkgreen font-semibold flex items-center gap-2 flex-wrap">
        <span className="p-1.5 bg-earth rounded">EcoPoint Prizes: </span>
        <span className="px-2 py-1 rounded bg-[var(--color-darkgreen)] text-fundal font-bold">1500</span>
        <span className="px-2 py-1 rounded" style={{ background: "#C0C0C0", color: "var(--color-darkgreen)" }}>1000</span>
        <span className="px-2 py-1 rounded" style={{ background: "#CD7F32", color: "var(--color-fundal)" }}>500</span>
      </p>
      <ol className="space-y-2 mt-2">
        {users.map((user, idx) => (
          <li
            key={user.name}
            className="flex flex-col items-center justify-center rounded-xl px-4 py-3 border shadow bg-earth border-smallbox"
            style={miniCardStyle}
          >
            <span className="font-bold text-base text-center mb-0" style={{ width: '100%' }}>
              {idx + 1}. {user.name}
            </span>
            <span className="text-center text-[14px] font-semibold" style={{ width: '100%' }}>
              {selectedField === "points" && <>{user.points} tasks</>}
              {selectedField === "co2" && <>{user.co2} kg CO₂</>}
              {selectedField === "streak" && <>{user.streak} days</>}
            </span>
            {idx < 3 && (
              <span
                className="mt-1 px-3 py-1 rounded font-bold text-sm flex items-center justify-center mx-auto"
                style={{
                  background: prizeColors[idx],
                  color: "#232210",
                  minWidth: 100
                }}
              >
                {prizes[idx]} EcoPoints 🏅
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
