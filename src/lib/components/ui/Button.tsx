import type { HTMLAttributes } from "react";

type Props = {
  color?: "primary" | "sec";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  type,
  color,
  onClick,
  className,
  disabled,
}: Props & HTMLAttributes<HTMLButtonElement>) {
  const baseStyles =
    "min-w-[130px] font-semibold px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const primaryStyles =
    "bg-primary text-white hover:bg-orange-400 disabled:hover:bg-primary";
  const secStyles =
    "bg-gray-200 text-black hover:bg-gray-300 disabled:hover:bg-gray-200";

  return (
    <button
      className={`${baseStyles} ${
        color === "primary" ? primaryStyles : secStyles
      } ${className}`}
      type={type ? type : "submit"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
