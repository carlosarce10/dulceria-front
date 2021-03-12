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
          <sui-card
            style="
              margin-top: 7%;
              position: relative !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            "
          >
            <label style="margin-top: 5%; margin-bottom: -5%"
              >Detalles de venta</label
            ><br />
            <sui-button class="btnModal3" @click.native="toggle"
              >Ver</sui-button
            >
          </sui-card>
        </div>
      </div>
      <div class="nine wide column fondoForm">
        <sui-form>
          <sui-form-fields fields="two">
            <sui-form-field>
              <label>Total ventas del día</label>
              <sui-input icon="dollar sign" disabled />
            </sui-form-field>
            <sui-form-field>
              <label>Monto inicial</label>
              <sui-input icon="dollar sign" disabled />
            </sui-form-field>
          </sui-form-fields>
          <sui-form-fields fields="two">
            <sui-form-field>
              <label>Monto actual</label>
              <sui-input icon="dollar sign" disabled />
            </sui-form-field>
            <sui-form-field>
              <label>Total retirado</label>
              <sui-input icon="dollar sign" disabled />
            </sui-form-field>
          </sui-form-fields>
          <hr />
          <div>
            <sui-button class="btnModal">Aceptar</sui-button>
            <sui-button class="btnModal2">Cancelar</sui-button>
          </div>
        </sui-form>
      </div>
    </div>
    <div>
      <sui-modal v-model="open">
        <sui-modal-header>Ventas del día</sui-modal-header>
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
hr {
  margin-top: 22%;
}
</style>