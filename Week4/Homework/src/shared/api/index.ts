import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosApi = axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosApi.interceptors.response.use(
  (res) => {
    const data = res.data.data !== undefined ? res.data.data : res;
    return data;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
