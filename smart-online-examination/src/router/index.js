import { createRouter, createWebHistory } from "vue-router";
import Rasksa_router from "./Rasksa_router";
import Vathana_router from "./Vathana_router";
const routes = [
  ...Rasksa_router,
  ...Vathana_router,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
