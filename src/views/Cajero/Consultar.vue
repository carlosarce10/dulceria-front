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
                placeholder="Buscar paquete..."
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="resultTrue.length === 0">
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
                      v-if="resultTrue.image !== null"
                      style="width: 100px; height: 100px; margin: 0px"
                      :src="resultTrue.url"
                    />
                    <img
                      v-if="resultTrue.image === null"
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
                      @click.native="toggleEdit()"
                      @click="verDetalle(resultTrue.id)"
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
                  <sui-table-header-cell text-align="center"
                    >Acción</sui-table-header-cell
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
                  <sui-table-cell text-align="center"
                    ><sui-button
                      @click.native="toggle(paquetes.id)"
                      id="editar"
                      style="background: #64b5f6"
                      negative
                      circular
                      icon="eye"
                  /></sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
        </div>
      </sui-tab-pane>
    </sui-tab>
    <sui-modal class="modal-small" v-model="open">
      <sui-modal-header>{{ packages.name }}</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-form>
          <sui-form-field>
            <sui-segments raised>
              <sui-segment color="blue"
                ><b>Nombre:</b> {{ packages.name }}</sui-segment
              >
              <sui-segment><b>Precio:</b> ${{ packages.price }}</sui-segment>
            </sui-segments>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggle" type="button">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <sui-modal class="modal-small" v-model="openEdit">
      <sui-modal-header>{{ productEdit.name }}</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-form>
          <sui-form-field>
            <sui-segments raised>
              <sui-segment>
                <img
                      v-if="productEdit.image !== null"
                      style="margin-top: 0px; width: 100%"
                      :src="productEdit.image"
                />
                <img
                  v-if="productEdit.image === null"
                  style="margin-top: 0px; width: 100%"
                  src="../../assets/default.png"
                />
              </sui-segment>
              <sui-segment><b>Nombre:</b> {{ productEdit.name }}</sui-segment>
              <sui-segment
                ><b>Precio:</b> {{ productEdit.retailPrice }}</sui-segment
              >
              <sui-segment
                ><b>Contenido neto:</b>
                {{ productEdit.netContent }}</sui-segment
              >
              <sui-segment
                ><b>Marca:</b> {{ productEdit.brand.name }}</sui-segment
              >
              <sui-segment
                ><b>Categoría:</b> {{ productEdit.category.name }}</sui-segment
              >
            </sui-segments>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggleEdit" type="button">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <br /><br /><br />
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
import { storage } from "../../firebase";

const ref = storage.ref();

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
      imagenes: [],
      imagen: null,
      imagendesc: false,
      open: false,
      openEdit: false,
      loading: true,
      productos: [],
      paquetes: [],
      search: "",
      searchD: "",
      resultTrue: [],
      resultCategory: "",
      resultBrand: "",
      product: {
        name: "",
        netContent: "",
        retailPrice: "",
        wholesalePrice: "",
        image: null,
        brand: { id: 0 },
        category: { id: 0 },
      },
      productEdit: {
        id: 0,
        name: "",
        netContent: "",
        retailPrice: "",
        wholesalePrice: "",
        image: "",
        brand: { id: 0 },
        category: { id: 0 },
      },
      packages: {
        name: "",
        price: "",
      },
    };
  },
  beforeMount() {
    this.query();
  },
  computed: {
    filteredProducts: function () {
      return this.resultTrue.filter((product) => {
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
        .doGet("/product/list/true")
        .then((response) => {
          let productos = [];
          for (let p of response.data) {
            p.url = "";
            productos.push(p);
          }
          this.resultTrue = productos;
          for (let p of this.resultTrue) {
            if (p.image !== null) {
              ref
                .child("imagenes/productos/" + p.image)
                .getDownloadURL()
                .then((url) => {
                  p.url = url;
                });
            }
          }
        })
        .catch((error) => console.log(error));
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
    toggleEdit(){
      this.openEdit = !this.openEdit;
    },
    toggle(id) {
      api
        .doGet("/package/get/" + id)
        .then((response) => {
          console.log(response);
          this.packages = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.open = !this.open;
    },
    verDetalle(id) {
      api
        .doGet("/product/get/" + id)
        .then((response) => {
          this.productEdit = response.data;
          if (this.productEdit.image !== null) {
            ref
              .child("imagenes/productos/" + this.productEdit.image)
              .getDownloadURL()
              .then((url) => {
                this.productEdit.image = url;
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
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
.cards {
  width: 90%;
}
.table {
  margin-top: 6%;
}
.ui.card {
  height: 300px !important;
}
.pr img {
  width: 50%;
  height: auto;
}
.panel {
  width: 90%;
  margin-left: 5%;
}
</style>