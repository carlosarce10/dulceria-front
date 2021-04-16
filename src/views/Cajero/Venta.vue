<template>
  <div class="area">
    <cabecera />
    <br/>
    <div class="funciones">
      <h3>Venta</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="chart bar outline icon" title="Venta">
          <div style="float:right">
            <sui-button @click="doSale()" style="background: #64b5f6" negative circular icon="plus"/>
            <sui-input class="custom-search" icon="search" type="text" placeholder="Buscar..."  />
          </div>
          
          <sui-container style="margin-top: 5%">
            <sui-segment basic v-if="ventas.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table color="blue" v-if="ventas.length > 0">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center">#</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Fecha</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Total</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Acciones</sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row v-for="(venta, item) in filteredVentas" :key="venta.id">
                  <sui-table-cell text-align="center">{{item + 1}}</sui-table-cell>
                  <sui-table-cell text-align="center">{{venta.date}}</sui-table-cell>
                  <sui-table-cell text-align="center">${{venta.total}}</sui-table-cell>
                  <sui-table-cell style="display: flex;align-items: center;justify-content: center;">
                    <sui-button
                      style="background: #64b5f6"
                      negative
                      circular
                      icon="eye"
                      @click.native="getVenta(venta.id)"
                    />
                  </sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
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
  name: "Venta",
  components: {
    fondo,
    cabecera,
  },
  computed:{
    filteredVentas: function() {
      return this.ventas.filter((venta) => {
        return venta.date.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  methods:{
    startup(){
      let idCashbox = localStorage.getItem("idCashbox");

      api
        .doGet("/sales/list/cashbox/"+idCashbox)
        .then((response) => {
          this.ventas = response.data;
          for (let u of this.ventas) {
            u.date = u.date.split(".")[0];
            u.date = u.date.replace("T", " ");
            u.date = u.date + " hrs.";
          }
        })
    },
    doSale(){
      this.$router.push("/cajero/nueva/venta");
    }
  },
  mounted(){
    this.startup();
  },
  data() {
    return {
      search: "",
      ventas: []
    };
  },
};
</script>

<style>

.search {
  margin-top: -5%;
  margin-right: 5%;
  float: right;
}

.custom-search > input{
  border-radius: 500rem !important;
  float: right !important;
  margin-right: 0em !important;
  margin-left: 0.25em !important;
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