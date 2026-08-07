import { createContext, useContext, type ReactNode } from "react";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

export type Context = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

export type HabitProviderProps = {
  children: ReactNode;
};

export const HabitContext = createContext<null | Context>(null);

export function useHabit() {
  const habitContext = useContext(HabitContext);

  if (habitContext == null) throw new Error('Context Error');

  return habitContext;
}
