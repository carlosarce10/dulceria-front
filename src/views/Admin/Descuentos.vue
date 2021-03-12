<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Descuentos</h3>
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
                >Nombre</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Tipo</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Descuento</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Comentarios</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Acciones</sui-table-header-cell
              >
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row>
              <sui-table-cell text-align="center">Barcel</sui-table-cell>
              <sui-table-cell text-align="center">Marca</sui-table-cell>
              <sui-table-cell text-align="center">10%</sui-table-cell>
              <sui-table-cell text-align="center"
                >Descuento por fecha de caducidad</sui-table-cell
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
              <sui-table-cell text-align="center">Chetos</sui-table-cell>
              <sui-table-cell text-align="center">Producto</sui-table-cell>
              <sui-table-cell text-align="center">15%</sui-table-cell>
              <sui-table-cell text-align="center"
                >Descuento por el día del niño</sui-table-cell
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
        <sui-modal-header>Agregar nuevo descuento</sui-modal-header>
        <sui-modal-body>
          <sui-form>
            <sui-form-field>
              <sui-form-fields fields="two">
                <sui-form-field>
                  <label style="margin-left: 2%">Tipo</label>
                  <sui-dropdown
                    placeholder="Seleccione opción"
                    selection
                    :options="opciones"
                    v-model="Opciones"
                  />
                </sui-form-field>
                <sui-form-field>
                  <label style="margin-left: 2%">Producto</label>
                  <sui-dropdown
                    placeholder="Seleccione opción"
                    selection
                    :options="opciones"
                    v-model="Opciones"
                  />
                </sui-form-field>
              </sui-form-fields>
              <sui-form-fields fields="two">
                <sui-form-field>
                  <label style="margin-left: 2%">Agregar descuento</label>
                  <input type="number" name="" placeholder="Descuento" />
                </sui-form-field>
                <sui-form-field>
                  <label>Agregar comentario</label>
                  <input placeholder="Comentario" />
                </sui-form-field>
              </sui-form-fields>
            </sui-form-field>
          </sui-form>
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
  name: "Descuentos",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      Opciones: null,
      opciones: [
        { value: "marca", text: "Marca" },
        { value: "producto", text: "Producto" },
        { value: "paquete", text: "Paquete" },
      ],
    };
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