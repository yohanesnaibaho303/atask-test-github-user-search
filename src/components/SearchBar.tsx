import React, { useState } from "react";
import { Search, X } from "lucide-react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  isLoading?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState<string>("");
  console.log("query:", query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      console.log("handleSubmit ~ query.trim():", query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full p-4 pl-12 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all shadow-sm hover:shadow-md"
          placeholder="Search GitHub users..."
          value={query}
          onChange={handleChange}
          disabled={isLoading}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-14 flex items-center pr-1"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer" />
          </button>
        )}
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={`absolute right-2.5 inset-y-2.5 px-4 py-2 rounded-md 
                    ${
                      !query.trim() || isLoading
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition-colors"
                    }`}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
