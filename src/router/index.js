import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cajero from "../views/Cajero/CajeroIndex";
import Venta from "../views/Cajero/Venta";
import Consultar from "../views/Cajero/Consultar";
import Retiro from "../views/Cajero/Retiro";
import CerrarCaja from "../views/Cajero/CerrarCaja";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Cajero",
    name: "Cajero",
    component: Cajero,
  },

  {
    path: "/Venta",
    name: "Venta",
    component: Venta,
  },
  {
    path: "/Consultar",
    name: "Consultar",
    component: Consultar,
  },
  {
    path: "/Retiro",
    name: "Retiro",
    component: Retiro,
  },
  {
    path: "/CerrarCaja",
    name: "CerrarCaja",
    component: CerrarCaja,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
