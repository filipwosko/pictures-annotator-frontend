import axios from "axios";

// Względna ścieżka, żeby requesty szły przez proxy devServer
const api = axios.create({
  baseURL: "/api"
});

// Interceptor odpowiedzi – obsługa błędów
api.interceptors.response.use(
  response => response,
  error => {
    let message = "Wystąpił nieznany błąd";

    if (error.response) {
      // próbujemy odczytać message niezależnie od Content-Type
      try {
        const data = typeof error.response.data === "string"
          ? JSON.parse(error.response.data)
          : error.response.data;
        message = data?.message || `Błąd ${error.response.status}`;
      } catch {
        message = `Błąd ${error.response.status}`;
      }
    } else if (error.request) {
      message = "Brak połączenia z serwerem";
    }

    return Promise.reject(message);
  }
);

export default api;
