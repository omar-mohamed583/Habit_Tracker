import Button from "./button";
import { useHabit } from "../context/contextProvider";
import { format, isToday } from "date-fns";

type HeaderProp = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};

export default function Header({ visibleDates, onPrev, onNext }: HeaderProp) {
  const { habits } = useHabit(),
    doneHabitsToday = habits.filter((h) =>
      h.completions.some((d) => isToday(d)),
    ).length;

  return (
    <header className="mx-auto max-w-280 grid grid-cols-[1.1fr_.9fr] grid-rows-2 px-6 py-5">
      <h1 className="text-4xl leading-[normal] font-bold mb-2">
        Habit Tracker
      </h1>
      <DateComp
        visibleDates={visibleDates}
        onPrev={onPrev}
        onNext={onNext}
      />
      <p className="text-zinc-400">
        {doneHabitsToday} / {habits.length} done today
      </p>
    </header>
  );
}

function DateComp({ visibleDates, onNext, onPrev }: HeaderProp) {
  const dateInterval = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`;

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 items-center justify-items-center justify-self-end md:[grid-template-areas:'btn1_date_btn2'] [grid-template-areas:'date_date'_'btn1_btn2'] first:[grid-area:btn1] last:[grid-area:btn2]">
      <Button
        rotate="180"
        onClick={onPrev}
      >
        {null}
      </Button>
      <p className="text-zinc-400 [grid-area:date] [font-variant-numeric:tabular-nums] min-w-32 text-center">
        {dateInterval}
      </p>
      <Button
        rotate="0"
        onClick={onNext}
        disabled={visibleDates.some((d) => isToday(d))}
      >
        {null}
      </Button>
    </div>
  );
}
