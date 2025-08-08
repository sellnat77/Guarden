import axios from "axios";

const BASE_URL = import.meta.env.VITE_GUARDEN_URL || "api-core";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define common API methods
export const _get = (url: string, config = {}) => {
  console.log(config);
  return apiClient.get(url, config);
};

export const _delete = (url: string, config = {}) => {
  return apiClient.delete(url, config);
};

export const _put = (url: string, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

export const _post = (url: string, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};
