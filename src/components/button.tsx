import type { ReactNode } from "react";

type ButtonProps = {
  rotate: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  rotate,
  children,
  disabled = false,
  onClick = () => undefined,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-violet-600 rounded-md px-2 py-1 active:bg-violet-200 cursor-pointer hover:bg-violet-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-violet-600 ${rotate === "180" ? "rotate-180" : ""}`}
    >
      {children || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      )}
    </button>
  );
}
