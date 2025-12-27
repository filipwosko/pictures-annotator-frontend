import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

export default {
  create(command) {
    return api.post("/bounding-boxes", command);
  },

  modify(command) {
    return api.put("/bounding-boxes", command);
  },

  delete(id) {
    return api.delete(`/bounding-boxes/${id}`);
  }
};
