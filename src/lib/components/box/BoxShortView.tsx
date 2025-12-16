import type { BoxShort } from "../../schemas/box";

export type BoxViewProps = {
  box: BoxShort;
};

export default function BoxShortView({ box }: BoxViewProps) {
  return (
    <div className="flex flex-col rounded min-h-20 max-h-80 bg-gray-500 w-full max-w-56">
      <div className="bg-gray-900 text-white rounded-t-md px-2">{box.name}</div>

      <div className="flex-1 px-2 py-1">Items</div>

      <div className="h-6 text-xs py-1 px-2">Footer</div>
    </div>
  );
}
