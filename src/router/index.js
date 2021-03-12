import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cajero from "../views/Cajero/CajeroIndex";
import Venta from "../views/Cajero/Venta";
import Consultar from "../views/Cajero/Consultar";
import Retiro from "../views/Cajero/Retiro";
import CerrarCaja from "../views/Cajero/CerrarCaja";
import Admin from "../views/Admin/AdminIndex.vue";
import Inventario from "../views/Admin/Inventario.vue";
import CajeroAdmin from "../views/Admin/Cajeros.vue";
import Marcas from "../views/Admin/Marcas.vue";
import Categorias from "../views/Admin/Categorias.vue";
import Ventas from "../views/Admin/Ventas.vue";
import Paquetes from "../views/Admin/Paquetes.vue";
import Descuentos from "../views/Admin/Descuentos.vue";

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
  {
    path: "/Admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/Inventario",
    name: "Inventario",
    component: Inventario,
  },
  {
    path: "/CajeroAdmin",
    name: "CajeroAdmin",
    component: CajeroAdmin,
  },
  {
    path: "/Marcas",
    name: "Marcas",
    component: Marcas,
  },
  {
    path: "/Categorias",
    name: "Categorias",
    component: Categorias,
  },
  {
    path: "/Ventas",
    name: "Ventas",
    component: Ventas,
  },
  {
    path: "/Paquetes",
    name: "Paquetes",
    component: Paquetes,
  },
  {
    path: "/Descuentos",
    name: "Descuentos",
    component: Descuentos,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
