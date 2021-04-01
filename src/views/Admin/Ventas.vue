<template>
  <div>
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Ventas</h3>
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
      <sui-container style="margin-top: 2%">
        <sui-table color="blue">
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell text-align="center"
                >Caja</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Fecha</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Total</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Detalles de venta</sui-table-header-cell
              >
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row>
              <sui-table-cell text-align="center">#5</sui-table-cell>
              <sui-table-cell text-align="center">2021-03-11</sui-table-cell>
              <sui-table-cell text-align="center">$3,515</sui-table-cell>
              <sui-table-cell
                ><sui-button
                  style="display: block; margin-left: auto; margin-right: auto"
                  class="btnModal"
                  @click.native="toggle"
                  >Ver</sui-button
                ></sui-table-cell
              >
            </sui-table-row>
          </sui-table-body>
          <sui-table-body>
            <sui-table-row>
              <sui-table-cell text-align="center">#8</sui-table-cell>
              <sui-table-cell text-align="center">2021-03-09</sui-table-cell>
              <sui-table-cell text-align="center">$2,150</sui-table-cell>
              <sui-table-cell
                ><sui-button
                  style="display: block; margin-left: auto; margin-right: auto"
                  class="btnModal"
                  @click.native="toggle"
                  >Ver</sui-button
                ></sui-table-cell
              >
            </sui-table-row>
          </sui-table-body>
          <sui-table-body>
            <sui-table-row>
              <sui-table-cell text-align="center">#2</sui-table-cell>
              <sui-table-cell text-align="center">2021-03-03</sui-table-cell>
              <sui-table-cell text-align="center">$6,253</sui-table-cell>
              <sui-table-cell
                ><sui-button
                  style="display: block; margin-left: auto; margin-right: auto"
                  class="btnModal"
                  @click.native="toggle"
                  >Ver</sui-button
                ></sui-table-cell
              >
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </sui-container>
      <div>
        <sui-modal v-model="open">
          <sui-modal-header>Ventas del día</sui-modal-header>
          <sui-modal-body>
            <sui-table color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >Empleado</sui-table-header-cell
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
                  <sui-table-header-cell text-align="center"
                    >Producto</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row>
                  <sui-table-cell text-align="center"
                    >Diego Calderón</sui-table-cell
                  >
                  <sui-table-cell text-align="center">10</sui-table-cell>
                  <sui-table-cell text-align="center">$3,900</sui-table-cell>
                  <sui-table-cell text-align="center">$400</sui-table-cell>
                  <sui-table-cell text-align="center">$0</sui-table-cell>
                  <sui-table-cell text-align="center">Papas</sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-modal-body>
          <sui-modal-actions>
            <sui-button positive @click.native="toggle"> OK </sui-button>
          </sui-modal-actions>
        </sui-modal>
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
  name: "Ventas",
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

.table {
  margin-left: 5%;
  margin-top: 5%;
}
.search {
  margin-right: 10%;
}

.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>