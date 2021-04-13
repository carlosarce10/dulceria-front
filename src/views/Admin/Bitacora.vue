<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Bitacora</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="clipboard list icon" title="Bitácora">
        <div class="table">
          <div class="ui search">
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar movimiento"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-table striped color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Acción</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Fecha</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Datos nuevos</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Datos antiguos</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Usuario que modificó</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Tabla afectada</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row>
                  <sui-table-cell text-align="center">1</sui-table-cell>
                  <sui-table-cell text-align="center">DELETE</sui-table-cell>
                  <sui-table-cell text-align="center"
                    >2021-01-08</sui-table-cell
                  >
                  <sui-table-cell text-align="center"></sui-table-cell>
                  <sui-table-cell text-align="center"
                    >Takis Fuego</sui-table-cell
                  >
                  <sui-table-cell text-align="center"
                    >fanicadenas</sui-table-cell
                  >
                  <sui-table-cell text-align="center">user</sui-table-cell>
                </sui-table-row>
                <sui-table-row>
                  <sui-table-cell text-align="center">1</sui-table-cell>
                  <sui-table-cell text-align="center">DELETE</sui-table-cell>
                  <sui-table-cell text-align="center"
                    >2021-01-08</sui-table-cell
                  >
                  <sui-table-cell text-align="center"></sui-table-cell>
                  <sui-table-cell text-align="center"
                    >Takis Fuego</sui-table-cell
                  >
                  <sui-table-cell text-align="center"
                    >fanicadenas</sui-table-cell
                  >
                  <sui-table-cell text-align="center">user</sui-table-cell>
                </sui-table-row>
                <sui-table-row>
                  <sui-table-cell text-align="center">1</sui-table-cell>
                  <sui-table-cell text-align="center">DELETE</sui-table-cell>
                  <sui-table-cell text-align="center"
                    >2021-01-08</sui-table-cell
                  >
                  <sui-table-cell text-align="center"></sui-table-cell>
                  <sui-table-cell text-align="center"
                    >Takis Fuego</sui-table-cell
                  >
                  <sui-table-cell text-align="center"
                    >fanicadenas</sui-table-cell
                  >
                  <sui-table-cell text-align="center">user</sui-table-cell>
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

<script >
import fondo from "../../components/fondo";
import cabecera from "../../components/headerCajero";
import Particles from "particles.vue";
import Vue from "vue";
import VueRouter from "vue-router";
//import api from "../../util/api";

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "Bitacora",
  components: {
    fondo,
    cabecera,
  },
};
</script>

<style scoped>
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
.panel {
  width: 90%;
  margin-left: 5%;
}
</style>