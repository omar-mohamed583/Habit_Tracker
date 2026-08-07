import { useHabit } from "../context/contextProvider";
import Habits from "./habits";

type ListProps = {
  visibleDates: Date[];
};

export default function HabitList({ visibleDates }: ListProps) {
  const { habits } = useHabit();

  if (!habits.length) {
    return <p className="text-center mt-10">No Habits Yet, Please Add One!</p>;
  } else {
    return (
      <div className="grid gap-4 mt-6">
        {habits.map((habit) => (
          <Habits
            key={habit.id}
            habit={habit}
            visibleDates={visibleDates}
          />
        ))}
      </div>
    );
  }
}
