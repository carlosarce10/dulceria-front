<template>
  <div class="area">
    <cabecera />
    <br/>
    <div class="funciones">
      <h3>Venta</h3>
    </div>
    <sui-tab class="panel">
      <sui-tab-pane icon="chart bar outline icon" title="Venta">
        <div class="table">
          <sui-container style="margin-top: 2%">
            <sui-segment ><!--basic v-if="ventas.length === 0"-->
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table>
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center">Nombre</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Precio</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Tipo (Menudeo/Mayoreo)</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Pieza (ml, gr, kg)</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Subtotal</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Cantidad</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Quitar Producto</sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row>
                  <sui-table-cell text-align="center">Apples</sui-table-cell>
                  <sui-table-cell text-align="center">$212</sui-table-cell>
                  <sui-table-cell text-align="center">Menudeo</sui-table-cell>
                  <sui-table-cell text-align="center">5kg</sui-table-cell>
                  <sui-table-cell text-align="center">25</sui-table-cell>
                  <sui-table-cell>
                    <div is="sui-button-group">
                      <sui-button class="btnModal">
                        <i class="plus square icon"></i>
                      </sui-button>
                      <sui-button-or />
                      <sui-button>
                        <i class="minus icon"></i>
                      </sui-button>
                    </div>
                  </sui-table-cell>
                  <sui-table-cell style="display: block; margin-left: auto; margin-right: auto; " >
                    <sui-button negative circular icon="times" />
                  </sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
        </div>
      </sui-tab-pane>
      <sui-tab-pane icon="chart bar outline icon" title="Producto">
        <div class="table">
          <div class="ui search">
            <sui-button @click.native="toggle" style="background: #64b5f6" negative circular icon="plus" />
            <div class="ui icon input">
              <input class="prompt" type="text" placeholder="Buscar producto" v-model="search" />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment>
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <div style="padding: 10px">
              
            </div>
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
import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "Venta",
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
}

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

.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>