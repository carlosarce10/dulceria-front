<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Consultar</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="box icon" title="Productos">
        <div class="table">
          <div class="ui search">
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar producto"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="productos.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="productos.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Producto</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Precio</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Precio Mayoreo</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Cantidad</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Estatus</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="(product, item) in filteredProducts"
                  :key="product.id"
                >
                  <sui-table-header-cell text-align="center">{{
                    item + 1
                  }}</sui-table-header-cell>
                  <sui-table-cell text-align="center">{{
                    product.name
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center"
                    >${{ product.retailPrice }}</sui-table-cell
                  >
                  <sui-table-cell text-align="center"
                    >${{ product.wholesalePrice }}</sui-table-cell
                  >
                  <sui-table-cell text-align="center">?</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    product.status
                  }}</sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
        </div>
      </sui-tab-pane>
      <sui-tab-pane icon="boxes icon" title="Paquetes">
        <div class="table">
          <div class="ui search">
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar producto"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="paquetes.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="paquetes.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Paquete</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Precio</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="(paquetes, item) in filteredPackages"
                  :key="paquetes.id"
                >
                  <sui-table-header-cell text-align="center">{{
                    item + 1
                  }}</sui-table-header-cell>
                  <sui-table-cell text-align="center">{{
                    paquetes.name
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center"
                    >${{ paquetes.price }}</sui-table-cell
                  >
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
        </div>
      </sui-tab-pane>
    </sui-tab>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerCajero";
import Particles from "particles.vue";
import Vue from "vue";
import api from "../../util/api";
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
    return {
      loading: true,
      productos: [],
      paquetes: [],
      search: "",
    };
  },
  beforeMount() {
    this.query();
  },
  computed: {
    filteredProducts: function () {
      return this.productos.filter((product) => {
        return product.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
    filteredPackages: function () {
      return this.paquetes.filter((paquete) => {
        return paquete.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  methods: {
    query() {
      api
        .doGet("/product/list/true")
        .then(
          (response) => (
            (this.productos = response.data), console.log(response.data)
          )
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      api
        .doGet("/package/list/true")
        .then(
          (response) => (
            (this.paquetes = response.data), console.log(response.data)
          )
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
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
.table {
  margin-top: 6%;
}
.search {
  margin-right: 2%;
  margin-bottom: 5px;
}
</style>