<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Inventario</h3>
    </div>
    <div class="table">
      <div class="search">
        <div
          style="margin-top: 1%; margin-bottom: 1%"
          class="ui fluid category search"
        >
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
      <div class="products">
        <sui-table basic>
          <sui-table-header>
            <sui-table-row>
              <sui-table-header-cell text-align="center"
                >Producto</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Lote</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Fecha de caducidad</sui-table-header-cell
              >
              <sui-table-header-cell text-align="center"
                >Cantidad en existencia</sui-table-header-cell
              >
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row v-for="listStock in listStock" :key="listStock.id">
              <sui-table-cell text-align="center">{{
                listStock.product.name
              }}</sui-table-cell>
              <sui-table-cell text-align="center">{{
                listStock.batch
              }}</sui-table-cell>
              <sui-table-cell text-align="center">{{
                listStock.dateExpire
              }}</sui-table-cell>
              <sui-table-cell text-align="center">{{
                listStock.quantityStock
              }}</sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
      </div>
      <div>
        <sui-modal v-model="open">
          <sui-modal-header style="margin-bottom: 3%"
            >Registro nuevo lote</sui-modal-header
          >
          <sui-modal-body>
            <sui-form
              style="margin-bottom: 5%; width: 50%; margin-left: 25%"
              id="formRegistro"
            >
              <sui-form-field>
                <label>Producto:</label>
                <select
                  class="ui dropdown"
                  ref="seleccionado"
                  v-model="stock.product.id"
                >
                  <option
                    v-for="listProduct in listProduct"
                    :key="listProduct.id"
                    :value="listProduct.id"
                  >
                    {{ listProduct.name }}
                  </option>
                </select>
              </sui-form-field>
              <sui-form-field>
                <label>Cantidad:</label>
                <input type="number" v-model="stock.quantityStock" />
              </sui-form-field>
              <sui-form-field>
                <label>Fecha de expiración:</label>
                <input type="date" v-model="stock.dateExpire" />
              </sui-form-field>
              <sui-form-field>
                <label>Número de lote:</label>
                <input type="number" v-model="stock.batch" />
              </sui-form-field>
            </sui-form>
          </sui-modal-body>
          <sui-modal-actions style="margin-bottom: 3%">
            <sui-button
              id="registrar"
              @click="register"
              positive
              @click.native="toggle"
              type="submit"
            >
              OK
            </sui-button>
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
import api from "../../util/api";

Vue.use(Particles);
export default {
  name: "Inventario",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      stock: {
        batch: "",
        dateExpire: "",
        quantityStock: "",
        product: { id: 0 },
      },
      listStock: null,
      listProduct: null,
      open: false,
    };
  },
  beforeMount() {
    this.getLists();
  },
  methods: {
    getLists() {
      api
        .doGet("/stock/list")
        .then((listStock) => (this.listStock = listStock.data))
        .catch((error) => console.log(error));

      api
        .doGet("/product/list/true")
        .then((listProduct) => (this.listProduct = listProduct.data))
        .catch((error) => console.log(error));
    },
    register() {
      console.log(this.stock);
      api
        .doPost("/stock/save", this.stock)
        .then((response) => {
          this.stock.push(response.data);
          window.location.reload();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
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
  margin-top: 5%;
}
.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>