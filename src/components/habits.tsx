import {
  format,
  isFuture,
  isSameDay,
  subDays,
} from "../../../node_modules/date-fns";
import { useHabit, type Habit } from "../context/contextProvider";

type HabitWrapper = {
  habit: Habit;
  visibleDates: Date[];
};

export default function Habits({ habit, visibleDates }: HabitWrapper) {
  const { toggleHabit, deleteHabit } = useHabit(),
    daysStreak = getStreak(habit.completions);

  return (
    <div className="rounded-xl bg-zinc-800 grid p-4 px-5 gap-3">
      <div className="flex gap-4 content-center items-center mb-2">
        <h3 className="text-2xl leading-[normal] font-medium max-w-[70%] truncate">
          {habit.name}
        </h3>
        {daysStreak !== 0 && (
          <span
            className="text-amber-400 inline-block ms-3"
            title={`${daysStreak} Days Streak`}
          >
            🔥 {daysStreak}
          </span>
        )}

        <button
          className="p-1 ms-auto transition-colors hover:bg-zinc-400/20 rounded-md cursor-pointer"
          aria-label="Delete Habit"
          onClick={() => deleteHabit(habit.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-rose-400"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {visibleDates.map((date) => (
          <button
            key={date.toISOString()}
            className={`py-2 px-3 grow [&.active]:bg-violet-600 bg-zinc-700 grid gap-2 text-lg leading-[normal] rounded-md justify-items-center justify-center [&.active]:shadow-xl [&.active]:shadow-violet-700/40 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300 animate-grow ${habit.completions.some((d) => isSameDay(date, d)) ? "active" : ""}`}
            disabled={isFuture(date)}
            onClick={() => toggleHabit(habit.id, date)}
          >
            <span>{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function getStreak(completions: Date[]) {
  let streak = 0,
    date = new Date();

  while (completions.some((d) => isSameDay(date, d))) {
    streak++;
    date = subDays(date, 1);
  }

  return streak;
}
