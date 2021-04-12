<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Cerrar caja</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="lock icon" title="Cerrar Caja">
        <div class="table">
          <div class="ui grid container">
            <div class="four wide column">
              <div>
                <sui-card class="centered raised">
                  <img src="../../assets/logo.png" />
                  <sui-card-content>
                    <sui-card-header>Daniel Beltrán</sui-card-header>
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
                  <hr style="margin-top: 36%" />
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
                  >SUbtotal</sui-table-header-cell
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

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "CerrarCaja",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return { open: false };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
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
.fondoForm {
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(165, 165, 165, 0.726);
  margin-top: 1%;
  margin-bottom: 1%;
}

.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
}
.btnModal2 {
  background-color: red !important;
  color: white !important;
}

.btnModal3 {
  background-color: #64b5f6 !important;
  color: white !important;
  width: 25% !important;
  margin-bottom: 5% !important;
}

.labelBordes {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(165, 165, 165, 0.445);
  padding-top: 2.5%;
  padding-bottom: 2.5%;
}
</style>