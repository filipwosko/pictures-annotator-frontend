import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

export default {
  getAllPictures() {
    return api.get("/pictures");
  },

  getPictureById(id) {
    return api.get(`/pictures/${id}`);
  },

  addPicture(command) {
    return api.post("/pictures", command, {
      headers: { "Content-Type": "application/json" }
    });
  }
};
