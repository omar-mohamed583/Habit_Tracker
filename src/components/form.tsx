import { useState, type SubmitEvent } from "react";
import Button from "./button";
import { useHabit } from "../context/contextProvider";

export default function Form() {
  const [name, setName] = useState("");
  const { addHabit } = useHabit();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    setName(""); // to clear the Input Value

    addHabit(name);
  }

  return (
    <form
      action=""
      className="flex gap-5 justify-center"
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="New Habit..."
        className="grow rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 max-w-150"
      />
      <Button
        rotate="0"
        disabled={!name.trim()}
      >
        Add Habit
      </Button>
    </form>
  );
}
