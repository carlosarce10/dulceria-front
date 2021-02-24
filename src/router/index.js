import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CajeroIndex from "../views/Cajero/CajeroIndex";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/CajeroIndex",
    name: "CajeroIndex",
    component: CajeroIndex,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
