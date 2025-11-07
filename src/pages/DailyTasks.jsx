import React, { useState } from "react";

const priorityTasks = [
  { text: "Riding a bike", category: "Daily Eco Habits", key: "eco" },
  { text: "Donating clothes", category: "Daily Eco Habits", key: "eco" },
  { text: "Recycling plastic", category: "Daily Eco Habits", key: "eco" },
  { text: "Planting a tree", category: "Daily Eco Habits", key: "eco" },
  { text: "Using public transport", category: "Daily Eco Habits", key: "eco" }
];

const taskCategories = [
  {
    name: "Daily Eco Habits",
    key: "eco",
    tasks: [
      "Bring a reusable water bottle",
      "Use a reusable coffee cup",
      "Turn off lights when leaving a room",
      "Unplug devices not in use",
      "Take a shorter shower under 5 min",
      "Walk, bike, or use public transport instead of driving",
      "Skip the elevator — take the stairs",
      "Avoid single-use plastic (e.g., straws, cutlery, bags)",
      "Sort and recycle household waste",
      "Open windows instead of using AC",
      "Repair a torn piece of clothing",
      "Refill or reuse a cleaning bottle",
      "Pick up litter on your street",
      "Refill your soap/shampoo instead of buying new bottles",
      "Use solid soap or shampoo bars instead of bottled ones"
      // REMOVED the 5 priority ones & will inject later.
    ]
  },
  {
    name: "Sustainable Living",
    key: "sustain",
    tasks: [
      "Avoid food waste — use leftovers creatively",
      "Buy local produce",
      "Compost food scraps",
      "Bring your own shopping bag",
      "Refuse unnecessary receipts or packaging",
      "Donate unused clothes or items",
      "Repair something instead of replacing it",
      "Switch one room to LED bulbs",
      "Write down three things you’re grateful for in nature",
      "Swap something (book, clothes, etc.) with a friend",
      "Borrow or lend a tool instead of buying one"
    ]
  },
  {
    name: "Energy Saving",
    key: "energy",
    tasks: [
      "Hang clothes to dry instead of using the dryer",
      "Turn off the tap while brushing teeth",
      "Use energy-efficient bulbs",
      "Check for leaky faucets and fix them",
      "Reduce screen brightness to save power",
      "Collect rainwater for plants",
      "Cook using a lid on pans to save energy",
      "Turn off power strips at night",
      "Set the washing machine to eco mode",
      "Work or study using only natural daylight today"
    ]
  },
  {
    name: "Nature Mindfulness",
    key: "nature",
    tasks: [
      "Plant a tree or indoor plant",
      "Share an eco tip with a friend",
      "Join or volunteer for a green community project",
      "Leave seeds or water for birds",
      "Water your home or garden plants",
      "Sketch or photograph a nature scene",
      "Catalog three plant or animal species you saw today",
      "Take a break outside during lunch and observe local wildlife"
    ]
  },
  {
    name: "Digital Sustainability",
    key: "digital",
    tasks: [
      "Unsubscribe from unused newsletters",
      "Delete unnecessary files/emails",
      "Spend 1 hour tech-free today",
      "Organize your downloads folder",
      "Update your apps instead of buying a new device",
      "Set a green wallpaper/background",
      "Batch reply to messages to save device energy"
    ]
  }
];

function getAllOtherTasks() {
  // Flat list all tasks except those in priorityTasks
  const prioTexts = new Set(priorityTasks.map(t => t.text));
  const arr = [];
  taskCategories.forEach(cat => {
    cat.tasks.forEach(task => {
      if (!prioTexts.has(task)) {
        arr.push({
          text: task,
          category: cat.name,
          key: cat.key,
          points: getRandomInt(5, 20),
          done: false,
          proof: null
        });
      }
    });
  });
  return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArr(arr, seed = 1) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const randomSeed = Math.sin(seed + i) * 10000;
    const j = Math.floor((randomSeed - Math.floor(randomSeed)) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genTodayYesterdayTasks() {
  // TODAY = always top 5 priority
  const todayTasks = priorityTasks.map(t => ({
    ...t,
    points: getRandomInt(11, 18),
    done: false,
    proof: null
  }));

  // YESTERDAY = random 5 from rest, stable per day
  let others = getAllOtherTasks();
  const todaySeed = Number(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
  const shuffled = shuffleArr(others, todaySeed + 17);
  const yesterdayTasks = shuffled.slice(0, 5).map(t => ({
    ...t,
    done: false,
    proof: null
  }));

  return { todayTasks, yesterdayTasks };
}

function ProofModal({ open, onClose, onSubmit }) {
  const [file, setFile] = useState(null);

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-bigbox rounded-2xl shadow-lg p-6 border border-smallbox w-full max-w-md"
        style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
        <h3 className="text-xl font-bold mb-4 text-darkgreen">Prove your task</h3>
        <form onSubmit={e => {
          e.preventDefault();
          onSubmit({ file });
        }}>
          <div className="mb-4">
            <label className="block text-darkgreen font-semibold mb-1">Upload Photo:</label>
            <label
              htmlFor="photo-upload"
              className="inline-block px-4 py-2 rounded-lg border border-darkgreen cursor-pointer font-semibold"
              style={{
                backgroundColor: "var(--color-fundal)",
                borderColor: "var(--color-darkgreen)",
                color: "var(--color-darkgreen)",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = "var(--color-beige)")}
              onMouseLeave={e => (e.target.style.backgroundColor = "var(--color-fundal)")}
            >
              {file ? file.name : "Choose Photo"}
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={e => setFile(e.target.files[0])}
                className="hidden"
                required
              />
            </label>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-beige border border-darkgreen text-darkgreen font-semibold"
              style={{ backgroundColor: "var(--color-beige)", borderColor: "var(--color-darkgreen)" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-darkgreen text-fundal font-semibold"
              style={{ backgroundColor: "var(--color-darkgreen)", color: "var(--color-fundal)" }}
            >
              Submit Proof
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DailyTasks() {
  const { todayTasks, yesterdayTasks } = genTodayYesterdayTasks();
  const [tasks, setTasks] = useState(todayTasks);
  const [proofIdx, setProofIdx] = useState(null);

  const handleSubmitProof = (proof) => {
    const updated = [...tasks];
    updated[proofIdx] = {
      ...updated[proofIdx],
      done: true,
      proof
    };
    setTasks(updated);
    setProofIdx(null);
  };

  return (
    <main className="min-h-screen px-8 py-6" style={{ backgroundColor: "var(--color-fundal)" }}>
      <div className="mx-auto max-w-7xl">
        <ProofModal
          open={proofIdx !== null}
          onClose={() => setProofIdx(null)}
          onSubmit={handleSubmitProof}
        />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Today's tasks */}
          <section
            className="bg-bigbox rounded-2xl shadow-md p-8 border border-smallbox flex-1"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
          >
            <h2 className="text-3xl font-extrabold mb-8" style={{ color: "var(--color-darkgreen)" }}>
              Today's Tasks <span className="text-xl"></span>
            </h2>
            <ul className="space-y-5">
              {tasks.map((task, idx) => (
                <li
                  key={idx}
                  className={`flex items-center bg-earth border border-smallbox rounded-xl shadow-sm px-6 py-5 transition w-full ${
                    task.done ? "opacity-60 line-through" : ""
                  }`}
                  style={{
                    backgroundColor: "var(--color-earth)",
                    borderColor: "var(--color-smallbox)",
                    color: "var(--color-darkgreen)"
                  }}
                >
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-1 min-w-0">
                      <span className="font-bold">{task.category}: </span>
                      {task.text}
                    </div>
                    <span
                      className="ml-0 sm:ml-6 mt-2 sm:mt-0 text-base font-semibold flex-shrink-0 flex items-center justify-end whitespace-nowrap"
                      style={{ minWidth: "120px" }}
                    >
                      Reward: {task.points}
                      <span className="ml-1" role="img" aria-label="EcoPoints">
                        🤑
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={() => !task.done && setProofIdx(idx)}
                    className="ml-4 px-4 py-2 rounded-lg font-semibold border border-darkgreen transition"
                    style={{
                      backgroundColor: !task.done ? "var(--color-fundal)" : "var(--color-smallbox)",
                      borderColor: "var(--color-darkgreen)",
                      color: "var(--color-darkgreen)"
                    }}
                    disabled={task.done}
                  >
                    {task.done ? "Done" : "Done?"}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          {/* Yesterday's tasks */}
          <section
            className="bg-bigbox rounded-2xl shadow-md p-8 border border-smallbox flex-1"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
          >
            <h2
              className="text-3xl font-extrabold mb-8 text-right"
              style={{ color: "var(--color-darkgreen)" }}
            >
              Yesterday's Tasks <span className="text-xl"></span>
            </h2>
            <ul className="space-y-5">
              {yesterdayTasks.map((task, idx) => (
                <li
                  key={idx}
                  className="flex items-center bg-earth border border-smallbox rounded-xl shadow-sm px-6 py-5 w-full"
                  style={{
                    backgroundColor: "var(--color-earth)",
                    borderColor: "var(--color-smallbox)",
                    color: "var(--color-darkgreen)"
                  }}
                >
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-1 min-w-0">
                      <span className="font-bold">{task.category}: </span>
                      {task.text}
                    </div>
                    <span
                      className="ml-0 sm:ml-6 mt-2 sm:mt-0 text-base font-semibold flex-shrink-0 flex items-center justify-end whitespace-nowrap"
                      style={{ minWidth: "120px" }}
                    >
                      Reward: {task.points}
                      <span className="ml-1" role="img" aria-label="EcoPoints">
                        🤑
                      </span>
                    </span>
                  </div>
                  <span
                    className={`font-bold ml-4 opacity-40`}
                    style={{ color: "var(--color-darkgreen)" }}
                  >
                    Not done
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
