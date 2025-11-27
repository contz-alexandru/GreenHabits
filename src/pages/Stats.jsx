import { useState, useMemo } from "react";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval, getDay,
} from "date-fns";
import CalendarStreak from "../content_pages/Stats/Calendar&Streak";
import { ecoFactors,ecoActionsList,stableActionsForMonth,getMaxConsecutiveStreak } from "../content_pages/Stats/utils/ecoConfig";
import SustainableActions from "../content_pages/Stats/SustainableActions";
import MonthlyEcoImpact from "../content_pages/Stats/MonthlyEcoImpact";
import EcoStreakChar from "../content_pages/Stats/EcoStreakChart";

export default function Stats() {
  const now = new Date();
  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();
  const [displayedMonth, setDisplayedMonth] = useState(
    new Date(todayYear, todayMonth, 1)
  );

  function syncActionsAndEcoDays(year, month) {
    const monthStart = new Date(year, month, 1);
    const monthEnd = endOfMonth(monthStart);
    const monthDaysArr = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const daysInMonth = monthDaysArr.map(d => d.getDate());
    let ecoDays = [];
    let actions = [];
    let tab = [];
    if (year === 2025 && month === 10) {
      ecoDays = [2, 4, 5, 6, 7, 8];
      actions = ecoDays.map((d, i) => ({
        day: d,
        name: ecoActionsList[i % ecoActionsList.length],
        count: 1,
        impact: parseFloat(ecoFactors[ecoActionsList[i % ecoActionsList.length]].toFixed(2)),
      }));
      tab = ecoActionsList.slice(0, actions.length).map((name, i) => ({
        name,
        count: 1,
        impact: parseFloat(ecoFactors[name].toFixed(2)),
      }));
    } else {
      const { actions: acts, tab: tabL } = stableActionsForMonth(year, month, daysInMonth);
      ecoDays = acts.map(a => a.day);
      actions = acts.map(a => ({
        ...a,
        impact: parseFloat(ecoFactors[a.name] * a.count).toFixed(2),
      }));
      tab = tabL.map(a => ({
        ...a,
        impact: parseFloat(ecoFactors[a.name] * a.count).toFixed(2),
      }));
    }
    return { ecoDays, actions, tab, monthDays: daysInMonth };
  }

  const { ecoDays, tab, monthDays } = useMemo(
    () =>
      syncActionsAndEcoDays(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth()
      ),
    [displayedMonth]
  );

  const getLastMonthData = (date) => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return syncActionsAndEcoDays(prevMonth.getFullYear(), prevMonth.getMonth());
  }
  const currentImpact = tab.reduce((sum, act) => sum + Number(act.impact), 0);
  const prevImpact = useMemo(() =>
    getLastMonthData(displayedMonth).tab.reduce((sum, act) => sum + Number(act.impact), 0),
    [displayedMonth]
  );
  const percentDiff = prevImpact > 0 ? Math.round((currentImpact - prevImpact) / prevImpact * 100) : 0;

  const totalLunarImpact = currentImpact.toFixed(2);
  const currentStreak = getMaxConsecutiveStreak(ecoDays);

  function computeWeeklyStreaksForDisplayedMonth() {
    const startIndex = getDay(startOfMonth(displayedMonth));
    const offset = startIndex === 0 ? 7 : startIndex;
    const weeklyCounts = [0, 0, 0, 0, 0];
    for (const d of ecoDays) {
      if (!d || d < 1) continue;
      const weekIndex = Math.ceil((d + (offset - 1)) / 7);
      if (weekIndex >= 1 && weekIndex <= weeklyCounts.length) {
        weeklyCounts[weekIndex - 1] += 1;
      }
    }
    for (let i = 0; i < weeklyCounts.length; i++) {
      weeklyCounts[i] = Math.min(7, weeklyCounts[i]);
    }
    return weeklyCounts.map((count, idx) => ({
      week: `Week ${idx + 1}`,
      actions: count,
    }));
  }
  const weeklyData = computeWeeklyStreaksForDisplayedMonth();

  function prevMonth() {
    setDisplayedMonth(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1)
    );
  }
  function nextMonth() {
    const next = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() + 1,
      1
    );
    if (
      next.getFullYear() > now.getFullYear() ||
      (next.getFullYear() === now.getFullYear() &&
        next.getMonth() > now.getMonth())
    ) {
      return;
    }
    setDisplayedMonth(next);
  }

  const singleLeafIcon = (
    <span
      className="text-2xl leading-none drop-shadow-sm"
      style={{ color: "var(--color-darkgreen)" }}
      aria-hidden
    >
      🍃
    </span>
  );
  const streakDays = new Set(ecoDays);
  const isNovember2025 =
    displayedMonth.getFullYear() === 2025 && displayedMonth.getMonth() === 10;

  return (
    <main className="p-6 min-h-screen">
      <style>{`
        .earth-animated-btn {
          transition: all .19s cubic-bezier(.43,1.36,.58,.86);
          box-shadow: 0 2px 6px rgba(134,170,120,.12);
          border: 2px solid var(--color-earth) !important;
          background: var(--color-earth) !important;
          color: var(--color-darkgreen) !important;
        }
        .earth-animated-btn:hover:not(:disabled) {
          transform: scale(1.08) translateY(-2px);
          background: #c5e2b4 !important;
          border-color: #22692f !important;
          box-shadow: 0 4px 20px 0 rgba(74,109,72,.15);
        }
        .earth-animated-btn:active:not(:disabled) {
          transform: scale(.96) translateY(1.5px);
          background: var(--color-earth) !important;
          border-color: #22692f !important;
        }
        .earth-animated-btn:disabled {
          border-color: #22692f !important;
          background: var(--color-earth) !important;
          color: var(--color-darkgreen) !important;
          opacity: .5;
        }
        .impact-animated, .box-animated {
          transition: transform .22s cubic-bezier(.43,1.36,.58,.86), box-shadow .32s cubic-bezier(.43,1.36,.58,.86);
        }
        .impact-animated:hover, .box-animated:hover {
          transform: scale(1.025) translateY(-3px);
          box-shadow: 0 7px 38px 0 #5bb9743c, 0 1.5px 18px rgba(85,100,70,0.14);
        }
      `}</style>
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Calendar + streak */}
        <CalendarStreak prevMonth={prevMonth} format={format} displayedMonth={displayedMonth} nextMonth={nextMonth} now={now}
  isNovember2025={isNovember2025} singleLeafIcon={singleLeafIcon} monthDays={monthDays} currentStreak={currentStreak} ecoDays={ecoDays} streakDays={streakDays} getDay={getDay} startOfMonth={startOfMonth} />
        {/* Impact & Sustainable actions */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 mt-10">
          <SustainableActions tab={tab}/>
          {/* Monthly eco impact */}
          <MonthlyEcoImpact totalLunarImpact={totalLunarImpact}/>
        </div>
      </div>
      {/* Weekly eco streak chart */}
      <div className="w-full flex justify-center mt-10">
        <EcoStreakChar format={format} displayedMonth={displayedMonth} weeklyData={weeklyData} percentDiff={percentDiff}/>
      </div>
    </main>
  );
}