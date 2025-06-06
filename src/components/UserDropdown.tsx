import React, { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import type { GitHubUser, GitHubRepo } from "../dto/githubResponse";
import { getUserRepos } from "../api/method";
import LoadingSpinner from "./LoadingSpinner";

type UserDropdownProps = {
  user: GitHubUser;
};

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    if (!isOpen && repos.length === 0) {
      setLoading(true);
      setError(null);
      try {
        const userRepos = await getUserRepos(user.login);
        setRepos(
          userRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load repositories"
        );
      } finally {
        setLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-12 h-12 rounded-full"
          />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {user.name || user.login}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{user.login}
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {loading ? (
            <div className="p-6 flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="p-6 text-red-500 text-center">{error}</div>
          ) : (
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Repositories ({repos.length})
              </h4>
              <div className="space-y-4">
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline font-medium"
                        >
                          {repo.name}
                        </a>
                        {repo.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {repo.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {repo.language && (
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {repo.language}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {repo.stargazers_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
