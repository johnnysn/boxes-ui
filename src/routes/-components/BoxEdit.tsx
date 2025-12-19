import type React from "react";
import type { BoxShort } from "../../lib/schemas/box";
import { useState } from "react";
import ColorPicker from "../../lib/components/ui/ColorPicker";
import Button from "../../lib/components/ui/Button";

type Props = {
  boxData: BoxShort | null;
  onSubmitHandler: (name: string, description: string, color: string) => void;
  onClose: () => void;
};

export default function BoxEdit({ boxData, onSubmitHandler, onClose }: Props) {
  const [name, setName] = useState(boxData ? boxData.name : "");
  const [description, setDescription] = useState(
    boxData ? boxData.description : ""
  );
  const [color, setColor] = useState(boxData ? boxData.color : "red");

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    onSubmitHandler(name, description, color.trim().toUpperCase());
  }

  return (
    <div className="mb-2 w-full md:max-w-3xl">
      <h2 className="text-lg font-bold mb-2">
        Box {boxData ? "edit" : "create"}
      </h2>

      <form onSubmit={submitHandler}>
        <div className="flex flex-col">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            name="name"
            id="inputName"
            placeholder="A label for the box"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-colors disabled:bg-gray-50"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inputDescription">Description</label>
          <textarea
            name="description"
            id="inputDescription"
            placeholder="Input a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-colors disabled:bg-gray-50"
            required
          ></textarea>
        </div>

        <ColorPicker
          onSelectColor={(c: string) => setColor(c)}
          selectedColor={color}
        />

        <div className="flex items-center justify-end gap-2">
          <Button
            text="Cancel"
            color="secondary"
            type="button"
            onClick={onClose}
          />
          <Button text="Save" color="primary" />
        </div>
      </form>
    </div>
  );
}
