"use client";

import { SearchBarProps } from "@/app/interfaces";

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-1 w-full shadow-sm hover:shadow-md transition-all duration-300">
    <input
      type="text"
      placeholder="Buscar productos..."
      className="bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none w-full py-2 px-2 rounded-lg focus:ring-2 focus:ring-neutral-600 dark:focus:ring-neutral-400 transition-all duration-300"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SearchBar;