<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Descuentos</h3>
    </div>
    <sui-container style="margin-top: 2%">
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
          </div>
        </div>
      </div>
      <sui-table color="blue">
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell text-align="center"
              >Descuento</sui-table-header-cell
            >
            <sui-table-header-cell text-align="center"
              >Comentarios</sui-table-header-cell
            >
            <sui-table-header-cell text-align="center"
              >Marca</sui-table-header-cell
            >
            <sui-table-header-cell text-align="center"
              >Categoría</sui-table-header-cell
            >
            <sui-table-header-cell text-align="center"
              >Producto</sui-table-header-cell
            >
            <sui-table-header-cell text-align="center"
              >Acciones</sui-table-header-cell
            >
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row
            v-for="listDiscounts in listDiscounts"
            :key="listDiscounts.id"
          >
            <sui-table-cell text-align="center">{{
              listDiscounts.discount
            }}</sui-table-cell>
            <sui-table-cell text-align="center">{{
              listDiscounts.comments
            }}</sui-table-cell>
            <sui-table-cell text-align="center">{{
              listDiscounts.brand.name
            }}</sui-table-cell>
            <sui-table-cell text-align="center">{{
              listDiscounts.category.name
            }}</sui-table-cell>
            <sui-table-cell text-align="center">{{
              listDiscounts.product.name
            }}</sui-table-cell>
            <sui-table-cell
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <sui-button
                @click.native="toggleEdit"
                id="editar"
                style="background: #64b5f6"
                negative
                circular
                icon="edit"
              />
              <sui-button
                id="delete"
                v-on:click="eliminar(listDiscounts.id)"
                negative
                circular
                icon="times"
              />
            </sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </sui-container>
    <sui-modal v-model="open">
      <sui-modal-header style="margin-bottom: 3%"
        >Registrar nuevo descuento</sui-modal-header
      >
      <sui-modal-body>
        <sui-form
          style="margin-bottom: 5%; width: 50%; margin-left: 25%"
          id="formRegistro"
        >
          <sui-form-field>
            <label>Cantidad del descuento:</label>
            <input type="number" v-model="discount.discount" />
          </sui-form-field>
          <sui-form-field>
            <label>Comentarios:</label>
            <textarea v-model="discount.comments"></textarea>
          </sui-form-field>
          <sui-form-field>
            <label>Marca:</label>
            <select
              class="ui dropdown"
              ref="seleccionado"
              v-model="discount.brand.id"
            >
              <option
                v-for="listBrand in listBrand"
                :key="listBrand.id"
                :value="listBrand.id"
              >
                {{ listBrand.name }}
              </option>
            </select>
          </sui-form-field>
          <sui-form-field>
            <label>Categoría:</label>
            <select
              class="ui dropdown"
              ref="seleccionado"
              v-model="discount.category.id"
            >
              <option
                v-for="listCategory in listCategory"
                :key="listCategory.id"
                :value="listCategory.id"
              >
                {{ listCategory.name }}
              </option>
            </select>
          </sui-form-field>
          <sui-form-field>
            <label>Producto:</label>
            <select
              class="ui dropdown"
              ref="seleccionado"
              v-model="discount.product.id"
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
  name: "Descuentos",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      discount: {
        discount: "",
        comments: "",
        brand: { id: 0 },
        category: { id: 0 },
        product: { id: 0 },
      },
      listCategory: null,
      listBrand: null,
      listProduct: null,
      listDiscounts: null,
      open: false,
    };
  },
  beforeMount() {
    this.getLists();
  },

  methods: {
    getLists() {
      api
        .doGet("/discount/list")
        .then((listDiscounts) => (this.listDiscounts = listDiscounts.data))
        .catch((error) => console.log(error));
      api
        .doGet("/category/list/true")
        .then((listCategory) => (this.listCategory = listCategory.data))
        .catch((error) => console.log(error));
      api
        .doGet("/brand/list/true")
        .then((listBrand) => (this.listBrand = listBrand.data))
        .catch((error) => console.log(error));
      api
        .doGet("/product/list/true")
        .then((listProduct) => (this.listProduct = listProduct.data))
        .catch((error) => console.log(error));
    },
    register() {
      console.log(this.discount);
      api
        .doPost("/discount/save", this.discount)
        .then((response) => {
          this.discount.push(response.data);
          window.location.reload();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    eliminar(id) {
      console.log(id);
      api
        .doDelete("/discount/del/" + id)
        .then((response) => {
          this.discount.push(response.data);
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