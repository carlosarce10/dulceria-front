<template>
  <div>
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Ventas</h3>
    </div>

    <sui-tab class="panel">

    <sui-tab-pane title="Todas las ventas">

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
      <sui-container style="margin-top: 2%">
        <sui-table color="blue">
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell text-align="center"
                >No. caja</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Fecha</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Total</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Cajero</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Detalles de venta</sui-table-header-cell
              >
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row v-for="venta in ventas" :key="venta.id">
              <sui-table-cell text-align="center">{{venta.cashbox.cashboxNumber}}</sui-table-cell>
              <sui-table-cell text-align="center">{{venta.date}}</sui-table-cell>
              <sui-table-cell text-align="center">${{venta.total}}</sui-table-cell>
              <sui-table-cell text-align="center">{{venta.user.username}}</sui-table-cell>
              <sui-table-cell
                ><sui-button
                  style="display: block; margin-left: auto; margin-right: auto"
                  class="btnModal"
                  @click.native="getVenta(venta.id)"
                  >Ver</sui-button
                ></sui-table-cell
              >
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </sui-container>
      <div>
        <sui-modal v-model="open">
          <sui-modal-header>Detalle de venta</sui-modal-header>
          <sui-modal-content scrolling>
            <sui-label basic size="big" >Total: {{venta.total}}</sui-label>
            <sui-label basic size="big">No. Caja: {{venta.cashbox.cashboxNumber}}</sui-label>
            <sui-label basic size="big">Cajero: {{venta.user.username}}</sui-label>
            <sui-label basic size="big">Fecha: {{venta.date}}</sui-label>
            <sui-table color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >Producto/Paquete</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Cantidad</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Subtotal</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Descuento</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Descuento de monto</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row v-for="detail in venta.details" :key="detail.id">
                  <sui-table-cell v-if="detail.product !== null" text-align="center">{{detail.product.name}}</sui-table-cell>
                  <sui-table-cell v-if="detail.packagee !== null" text-align="center">{{detail.packagee.name}}</sui-table-cell>
                  <sui-table-cell text-align="center">{{detail.quantity}}</sui-table-cell>
                  <sui-table-cell text-align="center">${{detail.subtotal}}</sui-table-cell>
                  <sui-table-cell text-align="center">{{detail.discount}}%</sui-table-cell>
                  <sui-table-cell text-align="center">${{detail.discountAmount}}</sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-modal-content>
          <sui-modal-actions>
            <sui-button positive @click.native="toggle()"> OK </sui-button>
          </sui-modal-actions>
        </sui-modal>
      </div>
    </div>

    </sui-tab-pane>

    <sui-tab-pane title="Ventas del día">
    </sui-tab-pane>

    </sui-tab>

    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";
import api from "../../util/api";

Vue.use(Particles);
export default {
  name: "Ventas",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      ventas:[],
      venta:{
        id:0,
        date:{},
        total:0,
        user:{},
        cashbox:{},
        details:[]
      }
    };
  },
  mounted(){
    this.startup();
  },
  methods: {
    startup(){
      api
        .doGet("sales/list")
        .then(response=>{
          this.ventas = response.data;
        })
        .catch(error=>{
          this.$swal(error.message);
        })
    },
    toggle() {
      this.open = !this.open;
    },
    getVenta(id) {

      api
        .doGet("sales/get/"+id)
        .then(response=>{
          console.log(response.data);
          this.venta.details = response.data.saleDetails;
          this.venta.date = response.data.sale.date;
          this.venta.total = response.data.sale.total;
          this.venta.user.username = response.data.sale.user.username;
          this.venta.cashbox.cashboxNumber = response.data.sale.cashbox.cashboxNumber;
        })
        .catch(error=>{
          this.$swal(error.message);
        })

      this.open = !this.open;
    },
  },
};
</script>

<style>
.table {
  margin-top: 6%;
}
.search {
  margin-right: 2%;
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