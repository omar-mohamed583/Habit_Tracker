import { parseISO } from "date-fns";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, val: T) {
  const [storedVal, setStoredVal] = useState<T>(() => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data, dateReviver);
    }

    return val;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedVal));
  }, [storedVal, key]);

  return [storedVal, setStoredVal] as const;
}

function dateReviver(key: string, value: unknown) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return parseISO(value)
  }

  return value
}