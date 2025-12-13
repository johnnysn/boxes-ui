import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Wrapper({
  children,
  className,
  ...restProps
}: ComponentProps<"div">) {
  return (
    <div className="w-full flex justify-center">
      <div
        className={twMerge(`w-full max-w-screen-lg`, className)}
        {...restProps}
      >
        {children}
      </div>
    </div>
  );
}
