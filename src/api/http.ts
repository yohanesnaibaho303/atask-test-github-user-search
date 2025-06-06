import axios, { AxiosError } from "axios";

export const http = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
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
