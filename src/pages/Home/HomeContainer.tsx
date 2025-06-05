import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { Github } from "lucide-react";

const AppContentContainer = () => {
  const [query, setQuery] = useState<string>("");
  console.log("AppContentContainer ~ isi state query:", query);

  const handleSearch = (searchQuery: string) => {
    console.log("handleSearch ~ isi diterima homesearchQuery:", searchQuery);
    setQuery(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Github className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold">GitHub User Search</h1>
          </div>

          <SearchBar onSearch={handleSearch} isLoading={false} />
        </div>
      </div>
    </div>
  );
};

export default AppContentContainer;
