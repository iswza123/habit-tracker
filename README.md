# Habit Tracker

A small React app for tracking daily habits across a week. Built with React 18 and Vite.

## Features

- Add and delete habits
- Tick off days in a weekly grid (future days are locked)
- Streak counter and weekly progress for each habit
- Browse previous weeks
- Data saved in your browser with `localStorage`, so no backend is needed

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Scripts

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the dev server            |
| `npm run build`   | Create a production build       |
| `npm run preview` | Preview the production build    |

## Project structure

```
src/
  components/   AddHabitForm, HabitRow
  hooks/        useLocalStorage
  utils/        date helpers (week, streak)
  App.jsx       main state and layout
  index.css     styles
```

## Ideas to extend

- Edit habit names
- Weekly or monthly charts
- Dark mode
- Export / import data as JSON

## License

MIT
