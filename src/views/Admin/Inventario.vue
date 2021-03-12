<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Inventario</h3>
    </div>
    <div class="table">
      <div class="search">
        <div class="ui fluid category search">
          <div class="ui icon input">
            <input
              class="prompt"
              type="text"
              placeholder="Buscar productos..."
            />
            <i class="search icon"></i>
          </div>
          <div class="results"></div>
        </div>
      </div>
      <div class="products">
        <sui-table basic>
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell>Producto</sui-table-header-cell>
              <sui-table-header-cell>Precio</sui-table-header-cell>
              <sui-table-header-cell>Agregar Producto</sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row>
              <sui-table-cell>Sabritas</sui-table-cell>
              <sui-table-cell>$50</sui-table-cell>
              <sui-table-cell>
                <sui-button class="btnModal"
                  ><i class="plus square icon"></i
                ></sui-button>
              </sui-table-cell>
            </sui-table-row>
            <sui-table-row>
              <sui-table-cell>Jumex</sui-table-cell>
              <sui-table-cell>$15</sui-table-cell>
              <sui-table-cell>
                <sui-button class="btnModal"
                  ><i class="plus square icon"></i
                ></sui-button>
              </sui-table-cell>
            </sui-table-row>
            <sui-table-row>
              <sui-table-cell>Corona</sui-table-cell>
              <sui-table-cell>$18</sui-table-cell>
              <sui-table-cell>
                <sui-button class="btnModal"
                  ><i class="plus square icon"></i
                ></sui-button>
              </sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </div>
    </div>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";

Vue.use(Particles);
export default {
  name: "Inventario",
  components: {
    fondo,
    cabecera,
  },
};
</script>

<style>
.funciones {
  color: #64b5f6;
  line-height: 50px;
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

.products {
  margin-right: 5%;
}

.search {
  margin-top: -5%;
  margin-right: 5%;
  float: right;
}

.table {
  margin-left: 5%;
  margin-top: 5%;
}
.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>