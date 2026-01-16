const selectableColors = [
  "red",
  "emerald",
  "gray",
  "blue",
  "yellow",
  "orange",
  "stone",
];

type Props = { onSelectColor: (color: string) => void; selectedColor?: string };

export default function ColorPicker({ onSelectColor, selectedColor }: Props) {
  const colorClickHandler = (c: string) => {
    onSelectColor(c);
  };

  return (
    <div className="mb-4">
      <p className="text-gray-700 font-bold mb-1">Color</p>

      <div className="flex gap-1 w-full max-w-lg">
        {selectableColors.map((c) => (
          <div
            key={c}
            className={`bg-${c}-400 w-7 h-7 rounded-sm hover:bg-${c}-300 ${
              c === selectedColor ? "border-2 border-black" : ""
            }`}
            onClick={() => colorClickHandler(c)}
          ></div>
        ))}
      </div>
    </div>
  );
}

// Tailwind preloaded classes

// bg-red-700 bg-red-700/50 bg-red-400 border-red-700 hover:bg-red-300
// bg-blue-700 bg-blue-700/50 bg-blue-400 border-blue-700 hover:bg-blue-300
// bg-emerald-700 bg-emerald-700/50 bg-emerald-400 border-emerald-700 hover:bg-emerald-300
// bg-yellow-700 bg-yellow-700/50 bg-yellow-400 border-yellow-700 hover:bg-yellow-300
// bg-orange-700 bg-orange-700/50 bg-orange-400 border-orange-700 hover:bg-orange-300
// bg-stone-700 bg-stone-700/50 bg-stone-400 border-stone-700 hover:bg-stone-300
// bg-gray-700 bg-gray-700/50 bg-gray-400 border-gray-700 hover:bg-gray-300
