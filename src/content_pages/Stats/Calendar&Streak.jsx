export default function CalendarStreak({prevMonth,format,displayedMonth,nextMonth,now,
  isNovember2025,singleLeafIcon,monthDays,currentStreak,ecoDays,streakDays,getDay,startOfMonth  
}){
  
  return (
    <section className="bg-bigbox rounded-2xl shadow-md p-4 sm:p-20 border border-smallbox box-animated"
          style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
          <div className="mx-auto" style={{ maxWidth: "30rem" }}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <button
                  onClick={prevMonth}
                  className="earth-animated-btn"
                  aria-label="Previous month"
                >
                  {"<"}
                </button>
                <h3
                  className="text-xl sm:text-2xl font-extrabold text-center"
                  style={{
                    color: "var(--color-darkgreen)",
                    minWidth: "15rem",
                  }}
                >
                  {format(displayedMonth, "MMMM yyyy")}
                </h3>
                <button
                  onClick={nextMonth}
                  className="earth-animated-btn"
                  aria-label="Next month"
                  disabled={
                    displayedMonth.getFullYear() === now.getFullYear() &&
                    displayedMonth.getMonth() === now.getMonth()
                  }
                  style={isNovember2025 ? { borderColor: "#22692f" } : {}}
                >
                  {">"}
                </button>
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 shadow-sm"
                style={{
                  backgroundColor: "var(--color-bigbox)",
                  border: "1px solid var(--color-smallbox)",
                  width: "13rem",
                  flexShrink: 0,
                }}
              >
                <div className="flex items-center">
                  <div className="text-lg mr-2" style={{ color: "var(--color-darkgreen)" }}>
                    {singleLeafIcon}
                  </div>
                  <div className="text-sm text-left" style={{ color: "var(--color-darkgreen)" }}>
                    <div className="font-semibold">
                      Current Streak {currentStreak} {currentStreak === 1 ? "day" : "days"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center font-bold mb-2 text-darkgreen text-xs sm:text-sm"
              style={{ color: "var(--color-darkgreen)" }}>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {monthDays.map((d, idx) => {
                const isEcoDay = ecoDays.includes(d);
                const isInStreak = streakDays.has(d);
                const baseClasses =
                  "w-full aspect-square flex items-center justify-center rounded-lg text-xs sm:text-sm transition-all";
                const ecoStyle = isEcoDay
                  ? {
                    backgroundColor: "var(--color-earth)",
                    color: "var(--color-darkgreen)",
                    fontWeight: 700,
                    boxShadow: "0 6px 10px rgba(0,0,0,0.06)",
                  }
                  : {
                    backgroundColor: "var(--color-smallbox)",
                    color: "var(--color-darkgreen)",
                  };
                const streakStyle = isInStreak
                  ? {
                    boxShadow: "0 0 0 3px var(--color-darkgreen)",
                    transform: "scale(1.03)",
                  }
                  : undefined;
                return (
                  <div
                    key={d + '-' + idx}
                    className={baseClasses}
                    style={{
                      gridColumnStart: idx === 0 ? getDay(startOfMonth(displayedMonth)) || 7 : undefined,
                      ...(ecoStyle || {}),
                      ...(streakStyle || {}),
                    }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span className="z-10" style={{ color: "var(--color-darkgreen)" }}>
                        {d}
                      </span>
                      {isEcoDay && (
                        <span
                          className="absolute right-1 bottom-1 z-20"
                          style={{
                            fontSize: isInStreak ? "1.05rem" : "0.85rem",
                            color: "var(--color-darkgreen)",
                          }}
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
  )

}