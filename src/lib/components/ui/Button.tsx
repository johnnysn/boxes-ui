import type { HTMLAttributes } from "react";

type Props = {
  text: string;
  color?: "primary" | "sec";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  text,
  type,
  color,
  onClick,
  className,
}: Props & HTMLAttributes<HTMLDivElement>) {
  return (
    <button
      className={`${
        color === "primary"
          ? "bg-primary text-white hover:bg-orange-400"
          : "bg-gray-200 text-black hover:bg-gray-300"
      } min-w-[130px] font-semibold px-4 py-2 rounded-md transition-colors ${className}`}
      type={type ? type : "submit"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
