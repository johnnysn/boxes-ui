import BoxShortView from "../../lib/components/box/BoxShortView";
import type { BoxShort } from "../../lib/schemas/box";
import type { ItemCreateData } from "../../lib/schemas/item";

export default function BoxesGrid({
  boxes,
  onDelete,
  onAddedItem,
  onDeleteItem,
}: {
  boxes: BoxShort[];
  onDelete: (id: number) => void;
  onAddedItem: (id: number, item: ItemCreateData) => void;
  onDeleteItem: (id: number) => void;
}) {
  return (
    <ul className="flex flex-wrap gap-3 w-full max-h-10/12 overflow-y-scroll">
      {boxes.map((b) => (
        <li key={b.id} className="max-w-sm">
          <BoxShortView
            box={b}
            onDelete={() => onDelete(b.id)}
            onAddedItem={(data) => onAddedItem(b.id, data)}
            onDeleteItem={onDeleteItem}
          />
        </li>
      ))}
    </ul>
  );
}
