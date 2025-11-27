// src/content_pages/leaderboard/LeaderboardFriends.jsx
// Top 3 prieteni

export default function LeaderboardFriends({ friends, selectedField }) {
  const miniCard = "flex items-center justify-between border rounded-xl px-4 py-3 shadow bg-earth border-smallbox text-base";
  const miniCardStyle = {
    backgroundColor: "var(--color-earth)",
    borderColor: "var(--color-smallbox)",
    color: "var(--color-darkgreen)",
    width: "100%",
    fontSize: "15px"
  };

  return (
    <section
      className="rounded-2xl shadow-md border border-smallbox p-6 flex-1 flex flex-col justify-between"
      style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
    >
      <h3 className="text-xl font-bold mb-3 text-darkgreen">Friends Leaderboard</h3>
      <ol className="space-y-2">
        {friends.slice(0, 3).map((friend, idx) => (
          <li key={friend.name} className={miniCard} style={miniCardStyle}>
            <span><b>{idx + 1}.</b> {friend.name}</span>
            <span>
              {selectedField === "points" && <>{friend.points} tasks</>}
              {selectedField === "co2" && <>{friend.co2} kg CO₂</>}
              {selectedField === "streak" && <>{friend.streak} days</>}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
