import { useState, useEffect, useCallback } from "react";
import { searchUsers } from "./api/method";
import type { GitHubUser } from "./dto/githubResponse";
import type { SearchUsersRequest } from "./dto/githubResquest";

import { Github } from "lucide-react";
import SearchBar from "./components/SearchBar";
import UserDropdown from "./components/UserDropdown";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import Pagination from "./components/Pagination";

const AppContentContainer = () => {
  //#region States
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const perPage = 10;

  //#endregion

  //#region Handler, side effects
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    const request: SearchUsersRequest = {
      query,
      page: currentPage,
      perPage,
    };

    try {
      const res = await searchUsers(request);
      setUsers(res.items);
      setTotalCount(res.total_count);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      setUsers([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [query, currentPage, perPage]);

  useEffect(() => {
    if (query) fetchUsers();
  }, [query, currentPage, fetchUsers]);

  const handleSearch = (text: string) => {
    setQuery(text);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.min(Math.ceil(totalCount / perPage), 100);

  //#endregion

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Github className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold">GitHub User Search</h1>
          </div>

          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : users.length > 0 ? (
            <>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Found {totalCount.toLocaleString()}{" "}
                {totalCount === 1 ? "user" : "users"} matching "{query}"
              </p>

              <div className="space-y-4">
                {users.map((user) => (
                  <UserDropdown key={user.id} user={user} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : query ? (
            <p className="text-center text-gray-600 dark:text-gray-400 py-12">
              No users found matching "{query}"
            </p>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Enter a username or keyword to search for GitHub users
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                Try searching for "cat", "puppy", or your favorite developer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppContentContainer;
