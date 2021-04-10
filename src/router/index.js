import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cajero from "../views/Cajero/CajeroIndex";
import Venta from "../views/Cajero/Venta";
import Consultar from "../views/Cajero/Consultar";
import Retiro from "../views/Cajero/Retiro";
import AbrirCaja from "../views/Cajero/AbrirCaja.vue";
import CerrarCaja from "../views/Cajero/CerrarCaja";
import Admin from "../views/Admin/AdminIndex.vue";
import Inventario from "../views/Admin/Inventario.vue";
import CajeroAdmin from "../views/Admin/Cajeros.vue";
import Marcas from "../views/Admin/Marcas.vue";
import Categorias from "../views/Admin/Categorias.vue";
import Ventas from "../views/Admin/Ventas.vue";
import Paquetes from "../views/Admin/Paquetes.vue";
import Descuentos from "../views/Admin/Descuentos.vue";
import DetallesPaquete from "../views/Admin/DetallesPaquete.vue";
import NotFound from "../views/NotFound.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cajero",
    name: "Cajero",
    component: Cajero,
  },{
    path:"/cajero/abrir-caja",
    name:"AbrirCaja",
    component: AbrirCaja
  },{
    path: "/cajero/venta",
    name: "Venta",
    component: Venta,
  },
  {
    path: "/cajero/consultar",
    name: "Consultar",
    component: Consultar,
  },
  {
    path: "/cajero/retiro",
    name: "Retiro",
    component: Retiro,
  },
  {
    path: "/cajero/cerrar-caja",
    name: "CerrarCaja",
    component: CerrarCaja,
  },
  {
    path: "/admin/productos",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/admin/inventario",
    name: "Inventario",
    component: Inventario,
  },
  {
    path: "/admin/cajeros",
    name: "CajeroAdmin",
    component: CajeroAdmin,
  },
  {
    path: "/admin/marcas",
    name: "Marcas",
    component: Marcas,
  },
  {
    path: "/admin/categorias",
    name: "Categorias",
    component: Categorias,
  },
  {
    path: "/admin/ventas",
    name: "Ventas",
    component: Ventas,
  },
  {
    path: "/admin/paquetes",
    name: "Paquetes",
    component: Paquetes,
  },
  {
    path: "/admin/paquete/detalles",
    name: "DetallesPaquete",
    component: DetallesPaquete,
    props: true
  },
  {
    path: "/admin/descuentos",
    name: "Descuentos",
    component: Descuentos,
  },{
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
