import { useState } from "react";

export default function AddHabitForm({ onAdd }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label htmlFor="habit-name" className="visually-hidden">
        New habit
      </label>
      <input
        id="habit-name"
        type="text"
        placeholder="Add a habit, e.g. Read 20 pages"
        value={name}
        maxLength={40}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" disabled={!name.trim()}>
        Add habit
      </button>
    </form>
  );
}
