import { twMerge } from "tailwind-merge";
import type { BoxShort } from "../../schemas/box";
import { Trash2, PlusSquare, Edit } from "lucide-react";
import type { ItemCreateData } from "../../schemas/item";
import React, { useEffect, useRef, useState } from "react";
import ItemView from "./ItemView";
import GhostInput from "../ui/GhostInput";

export type BoxViewProps = {
  box: BoxShort;
  onEdit: () => void;
  onDelete: () => void;
  onAddedItem: (data: ItemCreateData) => void;
  onDeleteItem: (id: number) => void;
};

export default function BoxShortView({
  box,
  onEdit,
  onDelete,
  onAddedItem,
  onDeleteItem,
}: BoxViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const headerColor = `bg-${box.color.toLowerCase()}-700`;
  const bodyColor = `bg-${box.color.toLowerCase()}-400`;

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (isAddingItem && inputRef) {
        setNewItemName("");
        inputRef.current?.focus();
      }
    }, 200);
  }, [isAddingItem]);

  function newItemSubmit(e: React.FormEvent) {
    e.preventDefault();

    onAddedItem({ name: newItemName, boxId: 0 });
    setIsAddingItem(false);
    setNewItemName("");
  }

  return (
    <div
      className={twMerge(
        "flex flex-col rounded min-h-20 max-h-80 min-w-36",
        bodyColor
      )}
    >
      <div
        className={twMerge(
          "text-white rounded-t-md px-2 py-1 flex justify-between items-center gap-1.5",
          headerColor
        )}
      >
        <span className="text-sm font-medium">{box.label}</span>
        <div className="flex items-center gap-1">
          <button
            className="cursor-pointer"
            aria-label="Add item"
            onClick={() => setIsAddingItem(true)}
          >
            <PlusSquare className="size-4" />
          </button>
          <button
            className="cursor-pointer"
            aria-label="Edit box"
            onClick={onEdit}
          >
            <Edit className="size-4" />
          </button>
          <button
            className="cursor-pointer"
            aria-label="Delete"
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-2 py-1">
        <ul className="flex items-center flex-wrap gap-1.5">
          {isAddingItem && (
            <li>
              <ItemView onRemove={() => setIsAddingItem(false)}>
                <form onSubmit={newItemSubmit}>
                  <GhostInput
                    name="name"
                    onValueChange={(v) => setNewItemName(v)}
                    ref={inputRef}
                    value={newItemName}
                  />
                </form>
              </ItemView>
            </li>
          )}
          {box.items.map((item) => (
            <li key={item.id}>
              <ItemView onRemove={() => onDeleteItem(item.id)}>
                <span className="text-sm">{item.name}</span>
              </ItemView>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-6 text-xs py-1 px-2"></div>
    </div>
  );
}
