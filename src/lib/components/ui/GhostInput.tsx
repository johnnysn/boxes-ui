import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type GhostInputProps = ComponentProps<"input"> & {
  onValueChange: (v: string) => void;
};

const GhostInput = forwardRef<HTMLInputElement, GhostInputProps>(
  ({ className, value, defaultValue, onValueChange, ...props }, ref) => {
    const currentText = value || defaultValue || "";
    const sharedStyles =
      "font-inherit px-1 py-0 col-start-1 row-start-1 bg-transparent";

    return (
      <div className={twMerge("inline-grid items-center align-top", className)}>
        {/* span invisível. Serve para aumentar espaço da div */}
        <span
          className={twMerge(
            sharedStyles,
            "invisible whitespace-pre overflow-hidden border border-transparent"
          )}
        >
          {currentText || " "}
        </span>

        <input
          {...props}
          value={value}
          defaultValue={defaultValue}
          size={1}
          ref={ref}
          className={twMerge(
            sharedStyles,
            "w-full min-w-[1em] border-none focus:ring-0 rounded outline-none text-sm"
          )}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </div>
    );
  }
);

export default GhostInput;
