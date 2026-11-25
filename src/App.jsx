import { useMemo, useState } from "react";
import AddHabitForm from "./components/AddHabitForm.jsx";
import HabitRow from "./components/HabitRow.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { formatRange, getWeek } from "./utils/dates.js";

const STARTER_HABITS = [
  { id: 1, name: "Drink 2 litres of water", log: {} },
  { id: 2, name: "Walk for 30 minutes", log: {} },
];

export default function App() {
  const [habits, setHabits] = useLocalStorage("habits-v1", STARTER_HABITS);
  const [weekOffset, setWeekOffset] = useState(0);

  const week = useMemo(() => getWeek(weekOffset), [weekOffset]);

  function addHabit(name) {
    setHabits((prev) => [...prev, { id: Date.now(), name, log: {} }]);
  }

  function deleteHabit(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  function toggleDay(id, dayKey) {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const log = { ...h.log };
        if (log[dayKey]) delete log[dayKey];
        else log[dayKey] = true;
        return { ...h, log };
      })
    );
  }

  const totalChecks = habits.reduce(
    (sum, h) => sum + week.filter((d) => h.log[d.key]).length,
    0
  );
  const possibleChecks = habits.length * week.filter((d) => !d.isFuture).length;
  const percent = possibleChecks ? Math.round((totalChecks / possibleChecks) * 100) : 0;

  return (
    <main className="app">
      <header className="app-header">
        <h1>Habit Tracker</h1>
        <p className="summary">
          {habits.length === 0
            ? "Add your first habit to get started."
            : `${percent}% of check-ins done this week`}
        </p>
      </header>

      <div className="week-nav">
        <button type="button" onClick={() => setWeekOffset((o) => o - 1)}>
          Previous week
        </button>
        <strong>{formatRange(week)}</strong>
        <button
          type="button"
          onClick={() => setWeekOffset((o) => o + 1)}
          disabled={weekOffset >= 0}
        >
          Next week
        </button>
      </div>

      <div className="grid-head" aria-hidden="true">
        <span />
        <div className="habit-days">
          {week.map((d) => (
            <span key={d.key} className={`day-head ${d.isToday ? "today" : ""}`}>
              {d.label}
              <small>{d.dayNumber}</small>
            </span>
          ))}
        </div>
        <span />
      </div>

      {habits.length === 0 ? (
        <p className="empty">No habits yet. Type one below and press Add habit.</p>
      ) : (
        <ul className="habit-list">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              week={week}
              onToggle={toggleDay}
              onDelete={deleteHabit}
            />
          ))}
        </ul>
      )}

      <AddHabitForm onAdd={addHabit} />
    </main>
  );
}
