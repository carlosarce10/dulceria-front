<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Productos</h3>
    </div>
    <div style="width: 60%; margin-left: 20%">
      <sui-divider hidden />

      <sui-tab>
        <sui-tab-pane title="Productos Activos">
          <div style="justify-content: center; align-content: center">
            <sui-card-group :items-per-row="4">
              <sui-card v-for="result in result" :key="result.id">
                <sui-dimmer-dimmable>
                  <sui-dimmer>
                    <sui-button inverted>Add Friend</sui-button>
                  </sui-dimmer>
                </sui-dimmer-dimmable>
                <sui-card-content>
                  <sui-card-header>{{ result.name }}</sui-card-header>
                  <sui-card-meta>{{ result.retailPrice }}</sui-card-meta>
                  <sui-card-meta>{{ result.wholesalePrice }}</sui-card-meta>
                </sui-card-content>
              </sui-card>
            </sui-card-group>
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
                      >Categoría</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Recuperar</sui-table-header-cell
                    >
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row v-for="resultF in resultF" :key="resultF.id">
                    <sui-table-cell text-align="center">{{
                      resultF.name
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
                        v-on:click="recuperar(resultF.id)"
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
    <div style="margin-right: 50%; margin-top: 2%">
      <sui-button
        @click.native="toggle"
        style="background: #64b5f6"
        negative
        circular
        icon="plus"
      />
    </div>
    <div>
      <sui-modal v-model="open">
        <sui-modal-header style="margin-bottom: 3%"
          >Registrar nueva categoría</sui-modal-header
        >
        <sui-modal-body>
          <sui-form
            style="margin-bottom: 5%; width: 50%; margin-left: 25%"
            id="formRegistro"
          >
            <sui-form-field>
              <label>Nombre del producto:</label>
              <input v-model="name" />
            </sui-form-field>
            <sui-form-field>
              <label>Contenido Neto:</label>
              <input v-model="netContent" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio menudeo:</label>
              <input v-model="retailPrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio mayoreo:</label>
              <input v-model="wholesalePrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Marca del producto:</label>
              <sui-dropdown placeholder="Marcas..." selection v-model="brand" />
            </sui-form-field>
            <sui-form-field>
              <label>Categoría del producto:</label>
              <sui-dropdown
                placeholder="Categoría..."
                selection
                v-model="category"
              />
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
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";
import axios from "axios";

Vue.use(Particles);
export default {
  name: "Admin",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      name: "",
      netContent: "",
      retailPrice: "",
      wholesalePric: "",
      brand: null,
      category: null,
      open: false,
      result: null,
      results: null,
      resultss: null,
      resultF: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/product/list/true")
      .then((result) => (this.result = result.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8080/product/list/false")
      .then((resultF) => (this.resultF = resultF.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8080/category/list/true")
      .then((results) => (this.results = results.data))
      .catch((error) => console.log(error))
      .finally(() => (this.loading = false));
    axios
      .get("http://localhost:8080/brand/list/true")
      .then((resultss) => (this.resultss = resultss.data))
      .catch((error) => console.log(error))
      .finally(() => (this.loading = false));
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    register() {
      axios
        .post("http://localhost:8080/product/save", {
          name: this.name,
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));

      location.reload();
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
