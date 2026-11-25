// Format a Date as a local YYYY-MM-DD key (avoids timezone shifts from toISOString).
export function toKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Returns the 7 days (Mon–Sun) of the week, shifted by `offset` weeks from today.
export function getWeek(offset = 0) {
  const today = new Date();
  const monday = new Date(today);
  const dayIndex = (today.getDay() + 6) % 7; // Monday = 0
  monday.setDate(today.getDate() - dayIndex + offset * 7);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return {
      key: toKey(date),
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
      dayNumber: date.getDate(),
      isToday: toKey(date) === toKey(new Date()),
      isFuture: date > new Date(),
    };
  });
}

export function formatRange(week) {
  const first = new Date(week[0].key + "T00:00:00");
  const last = new Date(week[6].key + "T00:00:00");
  const opts = { month: "short", day: "numeric" };
  return `${first.toLocaleDateString(undefined, opts)} – ${last.toLocaleDateString(undefined, opts)}`;
}

// Counts consecutive completed days ending today (or yesterday if today isn't done yet).
export function getStreak(log) {
  const cursor = new Date();
  if (!log[toKey(cursor)]) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (log[toKey(cursor)]) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
