import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

api.interceptors.response.use(
  response => response,
  error => {
    let message = "Wystąpił nieznany błąd";

    if (error.response) {
      // Backend odpowiedział (400, 404, 415, 500 itd.)
      message =
        error.response.data?.message ||
        `Błąd ${error.response.status}`;
    } else if (error.request) {
      // Backend nie odpowiada
      message = "Brak połączenia z serwerem";
    }

    return Promise.reject(message);
  }
);

export default api;
