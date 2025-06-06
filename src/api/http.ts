import axios, { AxiosError } from "axios";

const token = import.meta.env.VITE_GITHUB_TOKEN;
console.log("🚀 ~ token:", token);

export const http = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const defaultMsg = "An unknown error occurred";

    if (error.response) {
      const msg = (error.response.data as any)?.message;
      return Promise.reject(new Error(msg || defaultMsg));
    }

    if (error.request) {
      return Promise.reject(new Error("No response from server"));
    }

    return Promise.reject(new Error(error.message || defaultMsg));
  }
);
