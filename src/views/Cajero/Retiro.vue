<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Retiro</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="dollar sign icon" title="Retiro">
        <div class="table">
          <div class="ui grid container">
            <div class="four wide column">
              <div>
                <sui-card class="centered raised">
                  <img src="../../assets/logo.png" />
                  <sui-card-content>
                    <sui-card-header>Daniel</sui-card-header>
                  </sui-card-content>
                </sui-card>
                <sui-card class="centered raised">
                  <sui-card-content>
                    <sui-card-header>Detalles de venta</sui-card-header>
                  </sui-card-content>
                  <sui-container text-align="center">
                    <sui-card-content extra>
                      <sui-container text-align="center">
                        <sui-button-group>
                          <sui-button
                            class="btnModal3"
                            @click.native="toggle"
                            primary
                            >Ver</sui-button
                          >
                        </sui-button-group>
                      </sui-container>
                    </sui-card-content>
                  </sui-container>
                </sui-card>
              </div>
            </div>
            <div class="twelve wide column">
              <sui-segment color="blue" raised aligned="center">
                <sui-form>
                  <sui-form-fields fields="two">
                    <sui-form-field>
                      <label>Total ventas del día</label>
                      <sui-statistic-value class="labelBordes"
                        >$5,550</sui-statistic-value
                      >
                    </sui-form-field>
                    <sui-form-field>
                      <label>Monto inicial</label>
                      <sui-statistic-value class="labelBordes"
                        >$500</sui-statistic-value
                      >
                    </sui-form-field>
                  </sui-form-fields>
                  <sui-form-fields fields="two">
                    <sui-form-field>
                      <label>Monto actual</label>
                      <sui-statistic-value class="labelBordes"
                        >$859</sui-statistic-value
                      >
                    </sui-form-field>
                    <sui-form-field>
                      <label>Total retirado</label>
                      <sui-statistic-value class="labelBordes"
                        >$300</sui-statistic-value
                      >
                    </sui-form-field>
                  </sui-form-fields>
                  <sui-form-fields fields="two">
                    <sui-form-field>
                      <label>Número de caja</label>
                      <sui-statistic-value class="labelBordes"
                        >#6</sui-statistic-value
                      >
                    </sui-form-field>
                    <sui-form-field>
                      <label>Monto a retirar</label>
                      <sui-input icon="dollar sign" />
                    </sui-form-field>
                  </sui-form-fields>
                  <hr style="margin-top: 24%" />
                  <div>
                    <sui-button class="btnModal">Aceptar</sui-button>
                    <sui-button class="btnModal2">Cancelar</sui-button>
                  </div>
                </sui-form>
              </sui-segment>
            </div>
          </div>
        </div>
      </sui-tab-pane>
    </sui-tab>
    <div>
      <sui-modal v-model="open">
        <sui-modal-header>Ventas del día</sui-modal-header>
        <sui-modal-content>
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
                  >Total</sui-table-header-cell
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
              <sui-table-row>
                <sui-table-cell text-align="center">Papas</sui-table-cell>
                <sui-table-cell text-align="center">10</sui-table-cell>
                <sui-table-cell text-align="center">$3,900</sui-table-cell>
                <sui-table-cell text-align="center">$400</sui-table-cell>
                <sui-table-cell text-align="center">$0</sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click.native="toggle"> OK </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerCajero";
import Particles from "particles.vue";
import Vue from "vue";
//import api from "../../util/api";
import VueRouter from "vue-router";
import api from "../../util/api";

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "Retiro",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      user: "",
      id: "",
    };
  },
  beforeMount() {
    this.getUserAuthenticated();
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },

    getUserAuthenticated() {
      console.log(localStorage.getItem("id"));
      let id = localStorage.getItem("id", id);
      api
        .doGet("/user/get/" + id)
        .then((response) => (this.user = response.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
</style>