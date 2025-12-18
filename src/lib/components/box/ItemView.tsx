import { X } from "lucide-react";
import type React from "react";

export default function ItemView({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="rounded px-1 py-0.5 bg-gray-800 text-white text-sm flex items-center justify-between gap-1.5">
      <div>{children}</div>
      <button className="cursor-pointer" aria-label="Remove" onClick={onRemove}>
        <X className="size-4" />
      </button>
    </div>
  );
}
