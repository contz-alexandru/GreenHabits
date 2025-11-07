import React, { useState } from "react";

const globalUsers = [
  { name: "Jane Doe", points: 142, co2: 50.8, streak: 12 },
  { name: "Andre Popescu", points: 120, co2: 41.2, streak: 8 },
  { name: "Fatima Ali", points: 118, co2: 39.9, streak: 14 },
  { name: "Samir Patel", points: 110, co2: 36.5, streak: 7 },
  { name: "Lea Müller", points: 84, co2: 27.1, streak: 5 }
];

const prizes = [1500, 1000, 500];
const prizeColors = [
  "#FFD700", "#C0C0C0", "#CD7F32"
];

const initialFriendsList = [
  { name: "Paulica", points: 73, co2: 24.8, streak: 10 },
  { name: "Andrei", points: 68, co2: 31.3, streak: 8 },
  { name: "Bianca", points: 69, co2: 20.5, streak: 7 },
  { name: "EXTRA1", points: 55, co2: 11.2, streak: 5 },
  { name: "EXTRA2", points: 51, co2: 10.1, streak: 4 }
];

function sortData(data, field) {
  return [...data].sort((a, b) => b[field] - a[field]);
}

export default function Leaderboard() {
  const [selectedField, setSelectedField] = useState("points");
  const [friendsList, setFriendsList] = useState(initialFriendsList);
  const [showModal, setShowModal] = useState(false);
  const [newFriend, setNewFriend] = useState("");

  const fields = [
    { id: "points", label: "Tasks Completed" },
    { id: "co2", label: "CO₂ Saved (kg)" },
    { id: "streak", label: "Streak" }
  ];

  const globalSorted = sortData(globalUsers, selectedField);
  const friendsSorted = sortData(friendsList, selectedField);

  function handleAddFriend(e) {
    e.preventDefault();
    if (newFriend.trim() !== "") {
      setFriendsList([...friendsList, {
        name: newFriend.trim(),
        points: Math.floor(Math.random() * 80),
        co2: (Math.random() * 35).toFixed(1),
        streak: Math.floor(Math.random() * 10) + 1
      }]);
      setNewFriend("");
      setShowModal(false);
    }
  }

  const miniCard = "flex items-center justify-between border rounded-xl px-4 py-3 shadow bg-earth border-smallbox text-base";
  const miniCardStyle = {
    backgroundColor: "var(--color-earth)",
    borderColor: "var(--color-smallbox)",
    color: "var(--color-darkgreen)",
    width: "100%",
    fontSize: "15px"
  };

  return (
    <main className="bg-fundal min-h-screen p-4 md:p-8" style={{ backgroundColor: "var(--color-fundal)" }}>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50" style={{ background: "transparent" }}>
          <form
            onSubmit={handleAddFriend}
            className="bg-bigbox rounded-2xl shadow-lg p-6 border border-smallbox w-full max-w-md"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
          >
            <h3 className="text-lg font-bold mb-3 text-darkgreen">Add a new friend</h3>
            <input
              className="w-full p-2 rounded border border-darkgreen mb-4"
              style={{ color: "var(--color-darkgreen)", borderColor: "var(--color-darkgreen)" }}
              type="text"
              autoFocus
              value={newFriend}
              onChange={e => setNewFriend(e.target.value)}
              placeholder="Enter friend's name"
              required
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded font-semibold border border-darkgreen bg-beige text-darkgreen"
                style={{ backgroundColor: "var(--color-beige)", borderColor: "var(--color-darkgreen)" }}
                onClick={() => setShowModal(false)}
              >Cancel</button>
              <button
                type="submit"
                className="px-4 py-2 rounded font-semibold border border-darkgreen"
                style={{ backgroundColor: "var(--color-darkgreen)", color: "var(--color-fundal)", borderColor: "var(--color-darkgreen)" }}
              >Add</button>
            </div>
          </form>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left: Monthly Leaderboard */}
        <section
          className="w-full md:w-1/2 flex-shrink-0 bg-bigbox rounded-2xl p-6 shadow-md border border-smallbox flex flex-col"
          style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
        >
          <h2 className="text-2xl font-extrabold mb-4" style={{ color: "var(--color-darkgreen)" }}>
            🌍 Monthly Leaderboard
          </h2>
          <p className="mb-4 text-darkgreen font-semibold flex items-center gap-2">
            <span className="p-1.5 bg-earth rounded">EcoPoint Prizes: </span>
            <span className="px-2 py-1 rounded bg-[var(--color-darkgreen)] text-fundal font-bold">1500</span>
            <span className="px-2 py-1 rounded" style={{ background: "#C0C0C0", color: "var(--color-darkgreen)" }}>1000</span>
            <span className="px-2 py-1 rounded" style={{ background: "#CD7F32", color: "var(--color-fundal)" }}>500</span>
          </p>
          <div className="flex gap-2 mb-4">
            {fields.map((field) => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`px-4 py-1.5 rounded-lg font-semibold border text-sm
                  ${selectedField === field.id
                    ? "bg-darkgreen text-fundal border-darkgreen"
                    : "bg-beige text-darkgreen border-smallbox hover:bg-earth"}`}
                style={{
                  backgroundColor: selectedField === field.id ? "var(--color-darkgreen)" : "var(--color-beige)",
                  color: selectedField === field.id ? "var(--color-fundal)" : "var(--color-darkgreen)",
                  borderColor: selectedField === field.id ? "var(--color-darkgreen)" : "var(--color-smallbox)"
                }}
              >
                {field.label}
              </button>
            ))}
          </div>
          <ol className="space-y-2 mt-2">
            {globalSorted.map((user, idx) => (
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
        {/* Right column: Friends leaderboard and Friends List */}
        <div className="w-full md:w-1/2 flex flex-col h-full gap-6 min-w-[320px]">
          {/* Both boxes flex-1: exactly same height */}
          <section
            className="rounded-2xl shadow-md border border-smallbox p-6 flex-1 flex flex-col justify-between"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
          >
            <h3 className="text-xl font-bold mb-3 text-darkgreen">Friends Leaderboard</h3>
            <ol className="space-y-2">
              {friendsSorted.slice(0, 3).map((friend, idx) => (
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
          <section
            className="rounded-2xl shadow-md border border-smallbox p-8.5 flex-1 flex flex-col justify-between"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
          >
            <h3 className="text-xl font-bold mb-4 text-darkgreen">Friends List</h3>
            <ul className="space-y-2">
              {friendsList.slice(0, 3).map((friend) => (
                <li key={friend.name} className={miniCard} style={miniCardStyle}>
                  <span>{friend.name}</span>
                  <span className="text-right text-xs" style={{ fontSize: "13px" }}>
                    {friend.points} tasks<br />
                    {friend.co2} kg CO₂<br />
                    {friend.streak} days
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="mt-5 w-full px-4 py-2 rounded-lg font-semibold border border-darkgreen bg-darkgreen text-fundal hover:bg-[#388e5f] transition"
              style={{
                backgroundColor: "var(--color-darkgreen)",
                borderColor: "var(--color-darkgreen)",
                color: "var(--color-fundal)"
              }}
              onClick={() => setShowModal(true)}
            >
              + Add Friend
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
