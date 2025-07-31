"use client";
import { SearchBarProps } from "@/app/interfaces";

const SearchBar = ({ value, onChange }: SearchBarProps) => (
<div className="flex items-center w-full bg-white dark:bg-neutral-800 rounded-xl shadow-md px-2 py-1">
    <input
      type="text"
      placeholder="Buscar productos..."
      className="bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none w-full py-2 px-3 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
      value={value}
      onChange={onChange}
    />
    {/* <button
      onClick={onSearch}
      className="ml-2 bg-black text-white hover:bg-gray-800 dark:hover:bg-white dark:hover:text-black py-2 px-4 rounded-lg transition-all duration-300"
    >
      Buscar
    </button> */}
  </div>
);

export default SearchBar;
