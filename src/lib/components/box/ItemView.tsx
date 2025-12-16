import type { Item } from "../../schemas/item";

export default function ItemView({ item }: { item: Item }) {
  return (
    <div className="rounded px-1 py-0.5 bg-gray-800 text-white">
      {item.name}
    </div>
  );
}
