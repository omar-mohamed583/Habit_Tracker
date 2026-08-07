import { isSameDay } from "date-fns";
import { HabitContext, type Habit, type HabitProviderProps } from "./contextProvider";
import { useLocalStorage } from "../hooks/localStorage";

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>('Habits', []);

  function addHabit(name: string) {
    const newHabit: Habit = { id: crypto.randomUUID(), name, completions: [] };
    setHabits([...habits, newHabit]);
  }

  function deleteHabit(id: string) {
    setHabits((curr) => curr.filter((val) => val.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((hbts) =>
      hbts.map((hbt) => {
        if (hbt.id !== id) return hbt;

        const alreadyDone = hbt.completions.some((d) => isSameDay(d, date)),
          completions = alreadyDone
            ? hbt.completions.filter((d) => !isSameDay(d, date))
            : [...hbt.completions, date];

        return { ...hbt, completions };
      }),
    );
  }

  return (
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>
      {children}
    </HabitContext>
  );
}
