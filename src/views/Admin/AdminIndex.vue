<template>
  <div>
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Productos</h3>
    </div>
    <div style="width: 60%; margin-left: 20%">
      <sui-divider hidden />

      <sui-tab>
        <sui-tab-pane title="Productos Activos">
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
                </div>
              </div>
            </div>
            <sui-container style="margin-top: 2%">
              <sui-table color="blue">
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-header-cell text-align="center"
                      >Producto</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Contenido neto</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Precio Mayoreo</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Precio menudeo</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Marca</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Categoría</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Acciones</sui-table-header-cell
                    >
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row
                    v-for="resultTrue in resultTrue"
                    :key="resultTrue.id"
                  >
                    <sui-table-cell text-align="center">{{
                      resultTrue.name
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultTrue.netContent
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultTrue.wholesalePrice
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultTrue.retailPrice
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultTrue.brand.name
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultTrue.category.name
                    }}</sui-table-cell>
                    <sui-table-cell
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <sui-button
                        @click.native="toggleEdit(resultTrue.id)"
                        id="editar"
                        style="background: #64b5f6"
                        negative
                        circular
                        icon="edit"
                      />
                      <sui-button
                        id="delete"
                        v-on:click="eliminar(resultTrue.id)"
                        negative
                        circular
                        icon="times"
                      />
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </sui-container>
          </div>
        </sui-tab-pane>

        <sui-tab-pane title="Productos Inactivos">
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
                      >Producto</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Contenido neto</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Precio Mayoreo</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Precio menudeo</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Marca</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Categoría</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Recuperar</sui-table-header-cell
                    >
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row
                    v-for="resultFalse in resultFalse"
                    :key="resultFalse.id"
                  >
                    <sui-table-cell text-align="center">{{
                      resultFalse.name
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultFalse.netContent
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultFalse.wholesalePrice
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultFalse.retailPrice
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultFalse.brand.name
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      resultFalse.category.name
                    }}</sui-table-cell>
                    <sui-table-cell
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <sui-button
                        id="recuperar"
                        v-on:click="recuperar(resultFalse.id)"
                        style="background: #64b5f6"
                        negative
                        circular
                        icon="redo"
                      />
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </sui-container>
          </div>
        </sui-tab-pane>
      </sui-tab>
    </div>

    <div>
      <sui-modal v-model="open">
        <sui-modal-header style="margin-bottom: 3%"
          >Registrar nuevo producto</sui-modal-header
        >
        <sui-modal-body>
          <sui-form
            style="margin-bottom: 5%; width: 50%; margin-left: 25%"
            id="formRegistro"
          >
            <sui-form-field>
              <label>Nombre del producto:</label>
              <input v-model="product.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Contenido Neto:</label>
              <input v-model="product.netContent" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio menudeo:</label>
              <input type="number" v-model="product.retailPrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio mayoreo:</label>
              <input type="number" v-model="product.wholesalePrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Marca del producto:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="product.brand.id"
              >
                <option
                  v-for="resultsBrand in resultsBrand"
                  :key="resultsBrand.id"
                  :value="resultsBrand.id"
                >
                  {{ resultsBrand.name }}
                </option>
              </select>
            </sui-form-field>
            <sui-form-field>
              <label>Categoría del producto:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="product.category.id"
              >
                <option
                  v-for="resultsCategory in resultsCategory"
                  :key="resultsCategory.id"
                  :value="resultsCategory.id"
                >
                  {{ resultsCategory.name }}
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
    </div>
    <div>
      <sui-modal v-model="openEdit">
        <sui-modal-header style="margin-bottom: 3%"
          >Modificar producto</sui-modal-header
        >
        <sui-modal-body>
          <sui-form
            style="margin-bottom: 5%; width: 50%; margin-left: 25%"
            id="formModificar"
          >
            <sui-form-field>
              <label>Nombre del producto:</label>
              <input v-model="productEdit.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Contenido Neto:</label>
              <input v-model="productEdit.netContent" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio menudeo:</label>
              <input type="number" v-model="productEdit.retailPrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio mayoreo:</label>
              <input type="number" v-model="productEdit.wholesalePrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Marca del producto:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="productEdit.brand.id"
              >
                <option
                  v-for="resultsBrand in resultsBrand"
                  :key="resultsBrand.id"
                  :value="resultsBrand.id"
                >
                  {{ resultsBrand.name }}
                </option>
              </select>
            </sui-form-field>
            <sui-form-field>
              <label>Categoría del producto:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="productEdit.category.id"
              >
                <option
                  v-for="resultsCategory in resultsCategory"
                  :key="resultsCategory.id"
                  :value="resultsCategory.id"
                >
                  {{ resultsCategory.name }}
                </option>
              </select>
            </sui-form-field>
          </sui-form>
        </sui-modal-body>
        <sui-modal-actions style="margin-bottom: 3%">
          <sui-button
            id="editar"
            v-on:click="editar()"
            positive
            @click.native="toggleEdit"
            type="submit"
          >
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
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";
import api from "../../util/api";

Vue.use(Particles);
export default {
  name: "Admin",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      product: {
        name: "",
        netContent: "",
        retailPrice: "",
        wholesalePrice: "",
        brand: { id: 0 },
        category: { id: 0 },
      },
      productEdit: {
        id: 0,
        name: "",
        netContent: "",
        retailPrice: "",
        wholesalePrice: "",
        brand: { id: 0 },
        category: { id: 0 },
      },
      open: false,
      openEdit: false,
      resultTrue: null,
      resultsCategory: null,
      resultsBrand: null,
      resultFalse: null,
      id: null,
    };
  },
  beforeMount() {
    this.getLists();
  },
  methods: {
    getLists() {
      api
        .doGet("/product/list/true")
        .then((resultTrue) => (this.resultTrue = resultTrue.data))
        .catch((error) => console.log(error));
      api
        .doGet("/product/list/false")
        .then((resultFalse) => (this.resultFalse = resultFalse.data))
        .catch((error) => console.log(error));
      api
        .doGet("/category/list/true")
        .then(
          (resultsCategory) => (this.resultsCategory = resultsCategory.data)
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      api
        .doGet("/brand/list/true")
        .then((resultsBrand) => (this.resultsBrand = resultsBrand.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    toggle() {
      this.open = !this.open;
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
    register() {
      console.log(this.product);
      api
        .doPost("/product/save", this.product)
        .then((response) => {
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    eliminar(id) {
      console.log(id);
      api
        .doDelete("/product/del/" + id)
        .then((response) => {
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    editar(id) {
      console.log(id);
      console.log(this.productEdit);
      api
        .doPost("product/save",this.productEdit)
        .then((response) => {
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      //location.reload();
    },
    recuperar(id) {
      console.log(id);
      api
        .doPut("product/put/" + id)
        .then((response) => {
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
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
