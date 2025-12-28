import api from "./api";

export default {
  // ----- Picture -----
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
  },

  // ----- BoundingBox -----
  addBoundingBox(command) {
    // command = { pictureId, x, y, width, height, label }
    return api.post("/pictures/bounding-boxes", command, {
      headers: { "Content-Type": "application/json" }
    });
  },

  modifyBoundingBox(command) {
    // command = { id, pictureId, x, y, width, height, label }
    return api.put("/pictures/bounding-boxes", command, {
      headers: { "Content-Type": "application/json" }
    });
  },

deleteBoundingBox(pictureId, boundingBoxId) {
  // Usuń box po pictureId i boundingBoxId w URL
  return api.delete(`/pictures/${pictureId}/bounding-boxes/${boundingBoxId}`);
}
};
