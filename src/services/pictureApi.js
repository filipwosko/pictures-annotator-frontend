import api from "./api";

export default {
  getAllPictures() {
    return api.get("/pictures");
  },

  getPictureById(id) {
    return api.get(`/pictures/${id}`);
  },

  addPicture(command) {
    // Wysyłamy JSON z tablicą bajtów
    return api.post("/pictures", command, {
      headers: { "Content-Type": "application/json" }
    });
  }
};
