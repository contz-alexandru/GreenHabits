export const ecoFactors = {
  "Riding a bike 🚲": 2.5,
  "Donating clothes 👕": 3.0,
  "Recycling plastic ♻️": 0.8,
  "Planting a tree 🌳": 20.0 / 12,
  "Using public transport 🚌": 1.5,
  "Composting food waste 🍂": 0.6,
};
export const ecoActionsList = Object.keys(ecoFactors);

// === DETERMINISTIC GENERATION ===
function stableMonthSeed(year, month) {
  let str = `${year}-${month}-eco`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i); hash |= 0;
  }
  return Math.abs(hash);
}
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000; return x - Math.floor(x);
}
export function stableActionsForMonth(year, month, daysArr) {
 const allTypes = ecoActionsList;
  const maxN = daysArr.length >= 30 ? 25 : daysArr.length;
  const minN = daysArr.length >= 30 ? 20 : Math.max(10, Math.floor(daysArr.length * 0.7));
  const seed = stableMonthSeed(year, month);
  const actionsN = minN + Math.floor(seededRandom(seed + 42) * (maxN - minN + 1));
  const daysPool = [...daysArr];
  let usedDays = [];
  let loopSeed = seed + 101;
  while (usedDays.length < actionsN && daysPool.length > 0) {
    const idx = Math.floor(seededRandom(loopSeed++) * daysPool.length);
    usedDays.push(daysPool[idx]);
    daysPool.splice(idx, 1);
    if (daysPool.length === 0 && usedDays.length < actionsN) {
      daysPool.push(...daysArr);
    }
  }
  let groupedActions = {};
  let loopSeed2 = seed + 303;
  usedDays.forEach((day, i) => {
    const typeIdx = Math.floor(seededRandom(loopSeed2 + i * 17) * allTypes.length);
    const type = allTypes[typeIdx];
    const key = `${day}|${type}`;
    if (!groupedActions[key])
      groupedActions[key] = { day, name: type, count: 0 };
    groupedActions[key].count += 1;
  });
  const actions = Object.values(groupedActions).sort((a, b) => a.day - b.day);
  const tabObj = {};
  actions.forEach(({ name, count }) => {
    if (!tabObj[name]) tabObj[name] = 0;
    tabObj[name] += count;
  });
  const tab = Object.entries(tabObj).map(([name, count]) => ({ name, count }));
  return { actions, tab };
}

export function getMaxConsecutiveStreak(days) {
  if (!days.length) return 0;
  const sorted = [...new Set(days)].sort((a, b) => a - b);
  let maxStreak = 1, streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i-1] + 1) {
      streak += 1;
      maxStreak = Math.max(maxStreak, streak);
    } else {
      streak = 1;
    }
  }
  return maxStreak;
}