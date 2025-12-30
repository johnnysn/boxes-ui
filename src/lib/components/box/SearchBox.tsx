import { type ChangeEvent, useState, useEffect, useCallback } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import search from "../../../assets/search.svg";

type Props = { searchHandler: (key: string) => void };

export default function SearchBox({ searchHandler }: Props) {
  const [key, setKey] = useState("");
  const debouncedKey = useDebounce(key, 200);

  useEffect(() => {
    searchHandler(debouncedKey);
  }, [debouncedKey, searchHandler]);

  const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  }, []);

  return (
    <div className="flex items-center w-full md:w-[450px] border-2 border-x-transparent border-t-transparent border-b-primary bg-orange-100 rounded py-2 px-3 hover:bg-orange-50 focus-within:bg-orange-50 transition-colors duration-300 mb-4">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 font-medium font-sans mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Search box"
        aria-label="Search box"
        onChange={changeHandler}
      />
      <button
        className="shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
      >
        <img src={search} className="w-6" alt="Search" />
      </button>
    </div>
  );
}
