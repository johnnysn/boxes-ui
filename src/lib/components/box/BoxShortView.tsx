import { twMerge } from "tailwind-merge";
import type { BoxShort } from "../../schemas/box";
import { Trash2, PlusSquare } from "lucide-react";
import type { ItemCreateData } from "../../schemas/item";
import React, { useEffect, useRef, useState } from "react";
import ItemView from "./ItemView";

export type BoxViewProps = {
  box: BoxShort;
  onDelete: () => void;
  onAddedItem: (data: ItemCreateData) => void;
  onDeleteItem: (id: number) => void;
};

export default function BoxShortView({
  box,
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
        inputRef.current?.focus();
      }
    }, 200);
  }, [isAddingItem]);

  function newItemSubmit(e: React.FormEvent) {
    e.preventDefault();

    onAddedItem({ name: newItemName });
    setIsAddingItem(false);
    setNewItemName("");
  }

  return (
    <div
      className={twMerge(
        "flex flex-col rounded min-h-20 max-h-80 min-w-40",
        bodyColor
      )}
    >
      <div
        className={twMerge(
          "text-white rounded-t-md px-2 flex justify-between items-center",
          headerColor
        )}
      >
        <span>{box.name}</span>
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
                  <input
                    type="text"
                    ref={inputRef}
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm"
                  />
                </form>
              </ItemView>
            </li>
          )}
          {box.items.map((item) => (
            <li key={item.id}>
              <ItemView onRemove={() => onDeleteItem(item.id)}>
                {item.name}
              </ItemView>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-6 text-xs py-1 px-2">Footer</div>
    </div>
  );
}
