<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Cerrar caja</h3>
    </div>
    <br />
    <br />
    <div class="ui grid container">
      <div class="four wide column">
        <div>
          <sui-card>
            <img src="../../assets/logo.png" />
            <sui-card-content>
              <sui-card-header>Daniel Beltrán</sui-card-header>
            </sui-card-content>
          </sui-card>
        </div>
      </div>
      <div class="nine wide column">
        <sui-form>
          <sui-form-fields fields="two">
            <sui-form-field>
              <label>Total ventas del día</label>
              <sui-input icon="dollar sign" focus />
            </sui-form-field>
            <sui-form-field>
              <label>Monto inicial</label>
              <sui-input icon="dollar sign" focus />
            </sui-form-field>
          </sui-form-fields>
          <sui-form-fields fields="two">
            <sui-form-field>
              <label>Monto actual</label>
              <sui-input icon="dollar sign" focus />
            </sui-form-field>
            <sui-form-field>
              <label>Total retirado</label>
              <sui-input icon="dollar sign" focus />
            </sui-form-field>
          </sui-form-fields>
        </sui-form>
      </div>
    </div>
    <br />
    <br />
    <div class="ui two column centered grid">
      <div class="row">
        <div class="column">
          <sui-table celled>
            <sui-table-header>
              <sui-table-row text-align="center">
                <sui-table-header-cell>Producto</sui-table-header-cell>
                <sui-table-header-cell>Cantidad Vendida</sui-table-header-cell>
                <sui-table-header-cell>Subtotal</sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row text-align="center">
                <sui-table-cell>Boing Mango</sui-table-cell>
                <sui-table-cell>15</sui-table-cell>
                <sui-table-cell>$150</sui-table-cell>
              </sui-table-row>
              <sui-table-row text-align="center">
                <sui-table-cell>Doritos</sui-table-cell>
                <sui-table-cell>26</sui-table-cell>
                <sui-table-cell>$350</sui-table-cell>
              </sui-table-row>
              <sui-table-row text-align="center">
                <sui-table-cell>Donas</sui-table-cell>
                <sui-table-cell>10</sui-table-cell>
                <sui-table-cell>$150</sui-table-cell>
              </sui-table-row>
            </sui-table-body>
            <sui-table-footer full-width>
              <sui-table-row>
                <sui-table-header-cell colspan="2"
                  >Total:</sui-table-header-cell
                >
                <sui-table-header-cell colspan="4" text-align="center">
                  $1500
                </sui-table-header-cell>
              </sui-table-row>
            </sui-table-footer>
          </sui-table>
        </div>
      </div>
    </div>
    <div class="ui grid">
      <div class="five wide column">
        <sui-button floated="right" negative content="Cancelar" />
      </div>
      <div class="seven wide column">
        <sui-button floated="right" positive content="Cerrar Caja" />
      </div>
    </div>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/header";
import Particles from "particles.vue";
import Vue from "vue";
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
    return {};
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
</style>