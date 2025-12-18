import { twMerge } from "tailwind-merge";
import type { BoxShort } from "../../schemas/box";

export type BoxViewProps = {
  box: BoxShort;
};

export default function BoxShortView({ box }: BoxViewProps) {
  const headerColor = `bg-${box.color.toLowerCase()}-700`;
  const bodyColor = `bg-${box.color.toLowerCase()}-400`;

  return (
    <div
      className={twMerge(
        "flex flex-col rounded min-h-20 max-h-80 w-full max-w-56",
        bodyColor
      )}
    >
      <div className={twMerge("text-white rounded-t-md px-2", headerColor)}>
        {box.name}
      </div>

      <div className="flex-1 px-2 py-1">Items</div>

      <div className="h-6 text-xs py-1 px-2">Footer</div>
    </div>
  );
}
