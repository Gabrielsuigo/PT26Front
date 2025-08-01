"use client";

import { SearchBarProps } from "@/app/interfaces";

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="flex items-center bg-white dark:bg-neutral-800 rounded-xl px-3 py-1 w-full shadow-md transition-colors duration-300">
    <input
      type="text"
      placeholder="Buscar productos..."
      className="bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none w-full py-2 px-2 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SearchBar;