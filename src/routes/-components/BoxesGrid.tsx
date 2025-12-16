import BoxShortView from "../../lib/components/box/BoxShortView";
import type { BoxShort } from "../../lib/schemas/box";

export default function BoxesGrid({ boxes }: { boxes: BoxShort[] }) {
  return (
    <ul className="flex flex-wrap gap-3 w-full">
      {boxes.map((b) => (
        <li key={b.id} className="w-full max-w-56">
          <BoxShortView box={b} />
        </li>
      ))}
    </ul>
  );
}
