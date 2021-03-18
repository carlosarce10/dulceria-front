<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Marcas</h3>
    </div>
    <div class="table">
      <div class="search">
        <div class="ui fluid category search">
          <div class="ui icon input">
            <div style="margin-right: 5%">
              <sui-button
                @click.native="toggle"
                style="background: #64b5f6"
                negative
                circular
                icon="plus"
              />
            </div>
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
                >Marca</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Precio</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Estatus</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Detalles de marca</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Acciones</sui-table-header-cell
              >
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row>
              <sui-table-cell text-align="center">Paquete 1</sui-table-cell>
              <sui-table-cell text-align="center">$350</sui-table-cell>
              <sui-table-cell text-align="center">Activo</sui-table-cell>
              <sui-table-cell
                ><sui-button
                  style="display: block; margin-left: auto; margin-right: auto"
                  class="btnModal"
                  @click.native="toggle"
                  >Ver</sui-button
                ></sui-table-cell
              >
              <sui-table-cell
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <sui-button
                  style="background: #64b5f6"
                  negative
                  circular
                  icon="edit"
                />
                <sui-button negative circular icon="times" />
              </sui-table-cell>
            </sui-table-row>
            <sui-table-row>
              <sui-table-cell text-align="center">Paquete 2</sui-table-cell>
              <sui-table-cell text-align="center">$350</sui-table-cell>
              <sui-table-cell text-align="center">Activo</sui-table-cell>
              <sui-table-cell
                ><sui-button
                  style="display: block; margin-left: auto; margin-right: auto"
                  class="btnModal"
                  @click.native="toggle"
                  >Ver</sui-button
                ></sui-table-cell
              >
              <sui-table-cell
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <sui-button
                  style="background: #64b5f6"
                  negative
                  circular
                  icon="edit"
                />
                <sui-button negative circular icon="times" />
              </sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </sui-container>
    </div>
    <div>
      <sui-modal v-model="open">
        <sui-modal-header>Detalle de la marca</sui-modal-header>
        <sui-modal-body>
          <sui-table color="blue">
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell text-align="center"
                  >Nombre</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Producto</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Total</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Descuento</sui-table-header-cell
                >
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row>
                <sui-table-cell text-align="center">10</sui-table-cell>
                <sui-table-cell text-align="center">Papas</sui-table-cell>
                <sui-table-cell text-align="center">$3,900</sui-table-cell>
                <sui-table-cell text-align="center">$400</sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </sui-modal-body>
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
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";

Vue.use(Particles);
export default {
  name: "Marcas",
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
</style>