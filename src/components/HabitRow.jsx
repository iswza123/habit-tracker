import { getStreak } from "../utils/dates.js";

export default function HabitRow({ habit, week, onToggle, onDelete }) {
  const streak = getStreak(habit.log);
  const doneThisWeek = week.filter((d) => habit.log[d.key]).length;

  return (
    <li className="habit-row">
      <div className="habit-info">
        <span className="habit-name">{habit.name}</span>
        <span className="habit-meta">
          {streak > 0 ? `${streak}-day streak` : "No streak yet"} · {doneThisWeek}/7 this week
        </span>
      </div>

      <div className="habit-days">
        {week.map((day) => {
          const done = Boolean(habit.log[day.key]);
          return (
            <button
              key={day.key}
              type="button"
              className={`day-cell ${done ? "done" : ""} ${day.isToday ? "today" : ""}`}
              disabled={day.isFuture}
              aria-pressed={done}
              aria-label={`${habit.name}, ${day.label} ${day.dayNumber}: ${done ? "done" : "not done"}`}
              onClick={() => onToggle(habit.id, day.key)}
            >
              {done ? "✓" : ""}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="delete-btn"
        aria-label={`Delete ${habit.name}`}
        onClick={() => onDelete(habit.id)}
      >
        Delete
      </button>
    </li>
  );
}
