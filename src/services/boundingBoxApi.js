import api from "./api";

export default {
  create(data) {
    return api.post("/bounding-boxes", data);
  },

  modify(data) {
    return api.put("/bounding-boxes", data);
  },

  delete(id) {
    return api.delete(`/bounding-boxes/${id}`);
  }
};
