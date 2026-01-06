import axios, { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
}

const httpService = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

httpService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = data?.message || "Error desconocido";

    if (status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(new Error(message));
  }
);

export default httpService;
