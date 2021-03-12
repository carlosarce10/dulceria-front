<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Consultar</h3>
    </div>
    <sui-container style="margin-top: 2%">
      <sui-table color="blue">
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell>Producto</sui-table-header-cell>
            <sui-table-header-cell>Precio</sui-table-header-cell>
            <sui-table-header-cell>Precio Mayoreo</sui-table-header-cell>
            <sui-table-header-cell>Cantidad</sui-table-header-cell>
            <sui-table-header-cell>Estatus</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row>
            <sui-table-cell>Producto 1</sui-table-cell>
            <sui-table-cell>$20</sui-table-cell>
            <sui-table-cell>$15</sui-table-cell>
            <sui-table-cell>10</sui-table-cell>
            <sui-table-cell>Activo</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>Producto 2</sui-table-cell>
            <sui-table-cell>$15</sui-table-cell>
            <sui-table-cell>$10</sui-table-cell>
            <sui-table-cell>18</sui-table-cell>
            <sui-table-cell>Activo</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>Producto 3</sui-table-cell>
            <sui-table-cell>$18</sui-table-cell>
            <sui-table-cell>$12</sui-table-cell>
            <sui-table-cell>22</sui-table-cell>
            <sui-table-cell>Activo</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>Producto 4</sui-table-cell>
            <sui-table-cell>$8</sui-table-cell>
            <sui-table-cell>$6</sui-table-cell>
            <sui-table-cell>8</sui-table-cell>
            <sui-table-cell>Activo</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </sui-container>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerCajero";
import Particles from "particles.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "Consultar",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {};
  },
};
</script>

<style>
.funciones {
  color: #64b5f6;

  width: 100%;
  text-align: left;
  margin-left: 5%;
  border-left: 3px solid #64b5f6;
  height: 45px;
}
.funciones > h3 {
  line-height: 50px;
  margin-left: 0.5%;
}
</style>