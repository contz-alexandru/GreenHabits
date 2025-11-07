import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

export default function Stats() {
  // paleta / tematica (folosim variabile CSS unde e nevoie)
  const ecoHabits = [
    { name: "Riding a bike 🚲" },
    { name: "Donating clothes 👕" },
    { name: "Recycling plastic ♻️" },
    { name: "Planting a tree 🌳" },
    { name: "Using public transport 🚌" },
    { name: "Composting food waste 🍂" },
  ];

  // zile exemplu pentru luna curentă (poți înlocui cu date reale)
  const exampleEcoDaysForCurrent = [1, 3, 5, 6, 9, 12, 14, 18, 19, 20, 21, 25, 28];

  // date curente (azi)
  const now = new Date();
  const todayNum = now.getDate();

  // state: luna afișată în calendar (1st day of month)
  const [displayedMonth, setDisplayedMonth] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );

  // helper: sintetizez ecoDays pentru o lună diferită (deterministic, demo)
  // am extins pentru a include zile în săptămânile 3 și 4
  function synthesizeEcoDaysForMonth(monthDate) {
    // demo: week1 -> 5 zile (1..5), week2 -> 6 zile (8..13),
    // week3 -> 3 zile (15..17), week4 -> 2 zile (22..23)
    return [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 15, 16, 17, 22, 23];
  }

  // build days for the displayed month
  const monthDays = eachDayOfInterval({
    start: startOfMonth(displayedMonth),
    end: endOfMonth(displayedMonth),
  });

  // calculez offset pentru primul element în grid (0 = Sunday .. 6 = Saturday)
  const startIndex = getDay(startOfMonth(displayedMonth)); // 0 (Sun) .. 6 (Sat)
  const offset = startIndex === 0 ? 7 : startIndex; // transform Sunday(0) -> 7 pentru grid care începe cu Mon

  const isViewingCurrentMonth =
    displayedMonth.getMonth() === now.getMonth() &&
    displayedMonth.getFullYear() === now.getFullYear();

  // ecoDays folosite pentru afișare (dacă vizualizăm luna curentă, nu arătăm zile după azi)
  const ecoDaysForMonth = isViewingCurrentMonth
    ? exampleEcoDaysForCurrent.filter((d) => d <= todayNum)
    : synthesizeEcoDaysForMonth(displayedMonth);

  const ecoSet = new Set(ecoDaysForMonth);

  // calculez streak curent în luna afișată (consecutive zile până la cea mai recentă eco-day <= azi când e luna curentă,
  // sau până la ultima zi evidențiată pentru lunile demo)
  const lastEcoDay =
    ecoDaysForMonth.length > 0 ? Math.max(...ecoDaysForMonth.filter(Boolean)) : 0;
  let currentStreak = 0;
  let tmp = lastEcoDay;
  while (tmp > 0 && ecoSet.has(tmp)) {
    currentStreak += 1;
    tmp -= 1;
  }
  const streakDays = new Set();
  for (let i = 0; i < currentStreak; i++) {
    streakDays.add(lastEcoDay - i);
  }

  // afișăm STRICT o singură frunză în boxa de streak (nu una pentru fiecare zi)
  const singleLeafIcon = (
    <span
      className="text-2xl leading-none drop-shadow-sm"
      style={{ color: "var(--color-darkgreen)" }}
      aria-hidden
    >
      🍃
    </span>
  );

  // funcție care calculează numărul de zile (streak-uri) per săptămână pentru chart
  function computeWeeklyStreaksForDisplayedMonth() {
    // calculăm indexul curent de săptămână pentru displayedMonth doar când e luna curentă
    // formula: weekIndex = Math.ceil((dayNum + (offset - 1)) / 7)
    const weeklyCounts = [0, 0, 0, 0]; // 4 săptămâni (poți extinde la 5 dacă vrei)
    for (const d of ecoDaysForMonth) {
      // ignore invalid days
      if (!d || d < 1) continue;
      const weekIndex = Math.ceil((d + (offset - 1)) / 7); // 1..5
      if (weekIndex >= 1 && weekIndex <= 4) {
        weeklyCounts[weekIndex - 1] += 1;
      }
    }

    if (isViewingCurrentMonth) {
      const currentWeekIndex = Math.ceil((todayNum + (offset - 1)) / 7);
      // setăm săptămânile ce vin după săptămâna curentă la 0 (n-am ajuns acolo încă)
      for (let i = currentWeekIndex; i < weeklyCounts.length; i++) {
        weeklyCounts[i] = 0;
      }
      // capăm valorile la 7 și păstrăm ce e
      for (let i = 0; i < weeklyCounts.length; i++) {
        weeklyCounts[i] = Math.min(7, weeklyCounts[i]);
      }
    } else {
      // pentru lunile demo: vrem valori mai consistente (inclusiv pentru săptămânile 3-4)
      for (let i = 0; i < weeklyCounts.length; i++) {
        weeklyCounts[i] = Math.min(7, weeklyCounts[i]);
      }
      // dacă synthesize a dat 0 pentru unele, le lăsăm (sunt valori demo)
    }

    // transform în format pentru recharts
    return weeklyCounts.map((count, idx) => ({
      week: `Week ${idx + 1}`,
      actions: count,
    }));
  }

  // weekly data calculat din funcție (se va recalcula la fiecare render când displayedMonth se schimbă)
  const weeklyData = computeWeeklyStreaksForDisplayedMonth();

  // handlers pentru butoane lună
  function prevMonth() {
    setDisplayedMonth(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1)
    );
  }
  function nextMonth() {
    // nu permite navigarea în viitor dincolo de luna curentă
    const next = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
    if (
      next.getFullYear() > now.getFullYear() ||
      (next.getFullYear() === now.getFullYear() && next.getMonth() > now.getMonth())
    ) {
      return;
    }
    setDisplayedMonth(next);
  }

  // stiluri pentru butoane (folosesc variabile CSS din paleta ta)
  const navBtnClass =
    "px-3 py-1 rounded-md font-semibold shadow-sm border transition disabled:opacity-50";

  return (
    <main className="p-6 bg-fundal min-h-screen" style={{ backgroundColor: "var(--color-fundal)" }}>
      <div className="mx-auto max-w-5xl space-y-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-darkgreen text-center" style={{ color: "var(--color-darkgreen)" }}>
          Eco Statistics <span className="text-xl">🌿</span>
        </h2>

        {/* Eco Habits */}
        <section className="bg-bigbox rounded-2xl shadow-md p-4 sm:p-6 border border-smallbox" style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-darkgreen text-center" style={{ color: "var(--color-darkgreen)" }}>
            Popular Eco Habits
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ecoHabits.map((habit, index) => (
              <li
                key={index}
                className="flex items-center gap-3 bg-earth border border-smallbox rounded-lg p-3 hover:bg-smallbox hover:text-darkgreen transition duration-200"
                style={{ backgroundColor: "var(--color-earth)", borderColor: "var(--color-smallbox)", color: "var(--color-darkgreen)" }}
              >
                <span className="text-base sm:text-lg font-semibold" style={{ color: "var(--color-darkgreen)" }}>
                  {habit.name}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Monthly Calendar + Streak (calendar mic) */}
        <section className="bg-bigbox rounded-2xl shadow-md p-4 sm:p-6 border border-smallbox" style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-between mb-4">
              {/* left: prev / month / next */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevMonth}
                  className={`${navBtnClass}`}
                  style={{ background: "var(--color-darkgreen)", borderColor: "var(--color-darkgreen)", color: "var(--color-fundal)" }}
                  aria-label="Previous month"
                >
                  ◀
                </button>

                {/* month heading are acum o lățime minimă fixă ca să nu sară textul */}
                <h3
                  className="text-xl sm:text-2xl font-extrabold text-center"
                  style={{ color: "var(--color-darkgreen)", minWidth: "10rem" }}
                >
                  {format(displayedMonth, "MMMM yyyy")}
                </h3>

                <button
                  onClick={nextMonth}
                  className={`${navBtnClass}`}
                  style={{ background: "var(--color-darkgreen)", borderColor: "var(--color-darkgreen)", color: "var(--color-fundal)" }}
                  aria-label="Next month"
                  disabled={
                    displayedMonth.getFullYear() === now.getFullYear() &&
                    displayedMonth.getMonth() === now.getMonth()
                  }
                >
                  ▶
                </button>
              </div>

              {/* Streak box: fix width, nu se micșorează sau mută */}
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 shadow-sm"
                style={{
                  backgroundColor: "var(--color-bigbox)",
                  border: `1px solid var(--color-smallbox)`,
                  width: "11rem", // lățime fixă pentru a nu se mișca
                  flexShrink: 0,
                }}
              >
                <div className="flex items-center">
                  <div className="text-lg mr-2" style={{ color: "var(--color-darkgreen)" }}>{singleLeafIcon}</div>
                  <div className="text-sm text-left" style={{ color: "var(--color-darkgreen)" }}>
                    <div className="font-semibold">{currentStreak} day{currentStreak !== 1 ? "s" : ""}</div>
                    <div className="text-xs" style={{ color: "var(--color-darkgreen)" }}>Current Streak</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center font-bold mb-2 text-darkgreen text-xs sm:text-sm" style={{ color: "var(--color-darkgreen)" }}>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {monthDays.map((day) => {
                const dayNum = day.getDate();
                const isEcoDay = ecoSet.has(dayNum); // doar zile evidențiate (pentru luna curentă sunt deja filtrate <= today)
                const isInStreak = streakDays.has(dayNum);

                // stiluri pentru celule compacte, folosind numai culori din paletă
                const baseClasses =
                  "w-full aspect-square flex items-center justify-center rounded-lg text-xs sm:text-sm transition-all";
                const ecoStyle = isEcoDay
                  ? { backgroundColor: "var(--color-earth)", color: "var(--color-darkgreen)", fontWeight: 700, boxShadow: "0 6px 10px rgba(0,0,0,0.06)" }
                  : { backgroundColor: "var(--color-smallbox)", color: "var(--color-darkgreen)" };

                // nu folosi ring-uri Tailwind cu nuanțe în afara paletei; folosim boxShadow inline pentru consistență
                const streakStyle = isInStreak
                  ? { boxShadow: `0 0 0 3px var(--color-darkgreen)`, transform: "scale(1.03)" }
                  : undefined;

                return (
                  <div
                    key={dayNum}
                    className={baseClasses}
                    style={{
                      gridColumnStart: dayNum === 1 ? offset : undefined,
                      ...(ecoStyle || {}),
                      ...(streakStyle || {}),
                    }}
                    title={isEcoDay ? "Eco day — good job!" : undefined}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span className="z-10" style={{ color: "var(--color-darkgreen)" }}>{dayNum}</span>

                      {/* frunza mică în colțul din dreapta jos pentru zilele eco */}
                      {isEcoDay && (
                        <span
                          className={`absolute right-1 bottom-1 z-20`}
                          style={{ fontSize: isInStreak ? "1.05rem" : "0.85rem", color: "var(--color-darkgreen)" }}
                          aria-hidden
                        >
                          🍃
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Weekly Chart — full-bleed (ocupă toată lățimea ecranului) */}
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 mt-6">
        <section className="bg-bigbox rounded-2xl shadow-md p-4 sm:p-6 border-t border-smallbox" style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl sm:text-2xl font-bold text-darkgreen" style={{ color: "var(--color-darkgreen)" }}>
                Weekly Eco Actions
              </h3>
              <div className="text-sm" style={{ color: "var(--color-darkgreen)" }}>
                {isViewingCurrentMonth ? "Showing until current week" : "Sample data"}
              </div>
            </div>

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 12, right: 8, left: 8, bottom: 6 }}
                  barGap={8}
                  barCategoryGap="30%"
                >
                  <CartesianGrid stroke="var(--color-beige)" strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fill: "var(--color-darkgreen)", fontWeight: 700 }} />
                  <YAxis tick={{ fill: "var(--color-darkgreen)", fontWeight: 700 }} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.03)" }}
                    contentStyle={{
                      backgroundColor: "var(--color-bigbox)",
                      borderRadius: "8px",
                      border: "1px solid var(--color-smallbox)",
                      color: "var(--color-darkgreen)",
                    }}
                  />
                  <Legend />
                  {/* barSize reduce lățimea coloanelor; stroke adaugă contur darkgreen */}
                  <Bar
                    dataKey="actions"
                    name="Streak days"
                    fill="var(--color-earth)"
                    stroke="var(--color-darkgreen)"
                    strokeWidth={2}
                    radius={[10, 10, 6, 6]}
                    barSize={28} // mai îngust
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}