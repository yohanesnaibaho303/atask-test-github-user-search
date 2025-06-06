import { http } from "./http";
import type { SearchUsersRequest } from "../dto/githubResquest";
import type { GitHubRepo, GitHubUser, SearchUsersResponse } from "../dto/githubResponse";

export const searchUsers = async (
  req: SearchUsersRequest
): Promise<SearchUsersResponse> => {
  const { query, page = 1, perPage = 10 } = req;

  const { data } = await http.get<SearchUsersResponse>(`/search/users`, {
    params: { q: query, page, per_page: perPage },
  });

  const detailedUsers = await Promise.all(
    data.items.map((user) => getUserDetails(user.login))
  );

  return {
    ...data,
    items: detailedUsers,
  };
};

export const getUserDetails = async (username: string): Promise<GitHubUser> => {
  const { data } = await http.get<GitHubUser>(`/users/${username}`);
  return data;
};

export const getUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  const { data } = await http.get<GitHubRepo[]>(
    `/users/${username}/repos?per_page=100`
  );
  return data;
};
