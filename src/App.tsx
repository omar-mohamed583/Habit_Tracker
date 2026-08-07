import { useState } from "react";
import { HabitProvider } from "./context/HabitProvider";
import Header from "./components/header";
import Main from "./components/main";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0),
    week = addWeeks(new Date(), weekOffset),
    visibleDates = eachDayOfInterval({
      start: startOfWeek(week, { weekStartsOn: 1 }),
      end: endOfWeek(week, { weekStartsOn: 1 }),
    }),
    nextWeek = () => setWeekOffset((o) => o + 1),
    prevWeek = () => setWeekOffset((o) => o - 1);

  return (
    <HabitProvider>
      <Header
        visibleDates={visibleDates}
        onNext={nextWeek}
        onPrev={prevWeek}
      />

      <Main visibleDates={visibleDates} />
    </HabitProvider>
  );
}
