<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Consultar</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="box icon" title="Productos">
        <div class="table">
          <div class="ui search">
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar producto"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="productos.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <div style="padding: 10px">
              <sui-card-group :items-per-row="3">
                <sui-card
                  v-for="resultTrue in filteredProducts"
                  :key="resultTrue.id"
                >
                  <sui-card-content class="pr">
                    <img
                      v-if="paquetes.image !== null"
                      style="width: 100px; height: 100px; margin: 0px"
                      :src="resultTrue.url"
                    />
                    <img
                      v-if="paquetes.image === null"
                      style="width: 100px; height: 100px; margin: 0px"
                      src="../../assets/default.png"
                    />
                  </sui-card-content>
                  <sui-card-content
                    style="
                      height: 200px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div>
                      <sui-card-header>{{ resultTrue.name }}</sui-card-header>
                      <sui-card-meta
                        >${{ resultTrue.retailPrice }} MXN</sui-card-meta
                      >
                      <sui-card-meta>{{ resultTrue.netContent }}</sui-card-meta>
                    </div>
                  </sui-card-content>
                  <sui-card-content>
                    <sui-button
                      positive
                      @click.native="toggleEdit(resultTrue.id)"
                      type="submit"
                      circular
                      style="background: #64b5f6"
                      >Ver detalle</sui-button
                    >
                  </sui-card-content>
                </sui-card>
              </sui-card-group>
            </div>
          </sui-container>
        </div>
      </sui-tab-pane>
      <sui-tab-pane icon="boxes icon" title="Paquetes">
        <div class="table">
          <div class="ui search">
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar producto"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="paquetes.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="paquetes.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Paquete</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Precio</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="(paquetes, item) in filteredPackages"
                  :key="paquetes.id"
                >
                  <sui-table-header-cell text-align="center">{{
                    item + 1
                  }}</sui-table-header-cell>
                  <sui-table-cell text-align="center">{{
                    paquetes.name
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center"
                    >${{ paquetes.price }}</sui-table-cell
                  >
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
        </div>
      </sui-tab-pane>
    </sui-tab>
    <div>
      <sui-modal class="modal-small" v-model="openEdit">
        <sui-modal-header>Detalle</sui-modal-header>
        <sui-modal-content scrolling>
          <sui-form>
            <img
              centered
              class="pr"
              style="width: 100px; height: 100px; margin: 0px"
              src="../../assets/default.png"
            />

            <sui-form-field>
              <label>Nombre del producto:</label>
              <input disabled v-model="productEdit.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Contenido Neto:</label>
              <input disabled v-model="productEdit.netContent" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio menudeo:</label>
              <input disabled type="number" v-model="productEdit.retailPrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio mayoreo:</label>
              <input
                disabled
                type="number"
                v-model="productEdit.wholesalePrice"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Marca del producto:</label>
              <input disabled type="text" v-model="productEdit.brand.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Categoría del producto:</label>
              <input disabled type="text" v-model="productEdit.category.name" />
            </sui-form-field>

            <br />
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click.native="toggleEdit" type="submit">
            OK
          </sui-button>
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
import api from "../../util/api";
import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "Consultar",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      openEdit: false,
      loading: true,
      productos: [],
      paquetes: [],
      search: "",
      searchD: "",
      resultFalse: null,
      resultCategory: "",
      resultBrand: "",
      productEdit: {
        id: 0,
        name: "",
        netContent: "",
        retailPrice: "",
        wholesalePrice: "",
        brand: { id: 0 },
        category: { id: 0 },
      },
    };
  },
  beforeMount() {
    this.query();
  },
  computed: {
    filteredProducts: function () {
      return this.productos.filter((product) => {
        return product.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
    filteredPackages: function () {
      return this.paquetes.filter((paquete) => {
        return paquete.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  methods: {
    query() {
      api
        .doGet("/brand/list/true")
        .then(
          (response) => (
            (this.resultBrand = response.data), console.log(response.data)
          )
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      api
        .doGet("/category/list/true")
        .then(
          (response) => (
            (this.resultCategory = response.data), console.log(response.data)
          )
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      api
        .doGet("/product/list/true")
        .then(
          (response) => (
            (this.productos = response.data), console.log(response.data)
          )
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      api
        .doGet("/package/list/true")
        .then(
          (response) => (
            (this.paquetes = response.data), console.log(response.data)
          )
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    toggleEdit(id) {
      api
        .doGet("/product/get/" + id)
        .then((response) => {
          console.log(response);
          this.productEdit = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.openEdit = !this.openEdit;
    },
  },
};
</script>

<style>
.funciones {
  color: #64b5f6;

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
  margin-top: 6%;
}
.search {
  margin-right: 2%;
  margin-bottom: 5px;
}
.pr img {
  width: 50%;
  height: auto;
}
</style>