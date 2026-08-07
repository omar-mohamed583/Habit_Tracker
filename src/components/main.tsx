import Form from "./form";
import HabitList from "./habitlist";

type CustomType = {
  visibleDates: Date[];
};

export default function Main({ visibleDates }: CustomType) {
  return (
    <main>
      <Cont visibleDates={visibleDates} />
    </main>
  );
}

function Cont({ visibleDates }: CustomType) {
  return (
    <div className="max-w-280 mx-auto px-3 py-1">
      <Form />

      <HabitList visibleDates={visibleDates} />
    </div>
  );
}
