import { createRouter, createWebHistory } from "vue-router";

import AddPicture from "@/views/AddPicture.vue";
import PictureList from "@/views/PictureList.vue";
import PictureDetail from "@/views/PictureDetail.vue";

const routes = [
  { path: "/", redirect: "/pictures" },
  { path: "/add-picture", component: AddPicture },
  { path: "/pictures", component: PictureList },
  { path: "/pictures/:id", component: PictureDetail }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
