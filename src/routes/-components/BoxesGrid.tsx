import type { BoxListItem } from "../../lib/schemas/box";

export default function BoxesGrid({ boxes }: { boxes: BoxListItem[] }) {
  return (
    <ul>
      {boxes.map((b) => (
        <li key={b.id}>{b.name}</li>
      ))}
    </ul>
  );
}
