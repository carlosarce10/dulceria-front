<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Categorías</h3>
    </div>

    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="check icon" title="Categorías Activas">
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
            <sui-segment basic v-if="categoriasTrue.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="categoriasTrue.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
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
                  v-for="(categoria, item) in categoriasTrue"
                  :key="categoria.id"
                >
                  <sui-table-cell text-align="center">{{
                    item + 1
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    categoria.name
                  }}</sui-table-cell>
                  <sui-table-cell
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <sui-button
                      @click.native="toggleEdit(categoria.id)"
                      id="editar"
                      style="background: #64b5f6"
                      negative
                      circular
                      icon="edit"
                    />
                    <sui-button
                      id="delete"
                      v-on:click="eliminar(categoria.id)"
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
      <sui-tab-pane icon="ban icon" title="Categorías Inactivas">
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
            <sui-segment basic v-if="categoriasFalse.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="categoriasFalse.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
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
                  v-for="(categoria, item) in categoriasFalse"
                  :key="categoria.id"
                >
                  <sui-table-cell text-align="center">{{
                    item + 1
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    categoria.name
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
                      v-on:click="recuperar(categoria.id)"
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

    <div>
      <sui-modal class="modal-small" v-model="open">
        <sui-modal-header>Registrar nueva categoría</sui-modal-header>
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <label>Nombre de la categoría:</label>
              <input v-model="$v.name.$model" :class="status($v.name)" />
              <div
                class="error errorMsg"
                v-if="!$v.name.required && $v.name.$dirty"
              >
                El nombre de la categoría no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.name.minLength && $v.name.maxLength"
              >
                El nombre de la categoría debe tener entre 3 y 50 carateres
              </div>
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button negative @click.native="toggle" type="button">
            Cancelar
          </sui-button>
          <sui-button
            id="registrar"
            @click="register"
            positive
            @click.native="toggle"
            type="submit"
            :disabled="!(!$v.$invalid && $v.$dirty)"
          >
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
    <div>
      <sui-modal class="modal-small" v-model="openEdit">
        <sui-modal-header>Modificar categoría</sui-modal-header>
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <label>Nombre de la marca:</label>
              <input v-model="categoriaEdit.name" />
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button negative @click.native="toggleEdit" type="button">
            Cancelar
          </sui-button>
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
Vue.use(Particles);
export default {
  name: "Categorias",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      openEdit: false,
      categoriasTrue: [],
      categoriasFalse: [],
      id: null,
      loading: true,
      name: "",
      categoriaEdit: {
        id: 0,
        name: "",
      },
    };
  },
  beforeMount() {
    this.getLists();
  },
  methods: {
    getLists() {
      api
        .doGet("/category/list/true")
        .then((response) => (this.categoriasTrue = response.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));

      api
        .doGet("/category/list/false")
        .then((response) => (this.categoriasFalse = response.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    toggle() {
      this.open = !this.open;
    },
    toggleEdit(id) {
      api
        .doGet("/category/get/" + id)
        .then((response) => {
          console.log(response);
          this.categoriaEdit = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.openEdit = !this.openEdit;
    },
    editar() {
      api
        .doPost("/category/save", this.categoriaEdit)
        .then((response) => {
          this.$swal({
            title: "¡Categoría modificada exitosamente!",
            icon: "success",
          });
          console.log(response);
          this.getLists();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register() {
      api
        .doPost("/category/save", {
          name: this.name,
        })
        .then((response) => {
          this.$swal({
            title: "¡Categoría registrada exitosamente!",
            icon: "success",
          });
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    eliminar(id) {
      console.log(id);
      this.$swal({
        title: "¿Estás seguro de eliminar esta categoría?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("/category/del/" + id)
            .catch((error) => console.log(error))
            .then((response) => {
              this.$swal({
                title: "¡Categoría eliminada exitosamente!",
                icon: "success",
              });
              console.log(response);
              this.getLists();
            })
            .finally(() => (this.loading = false));
        }
      });
    },
    recuperar(id) {
      console.log(id);
      this.$swal({
        title: "¿Estás seguro de recuperar esta categoría?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doPut("/category/put/" + id)
            .then((response) => {
              this.$swal({
                title: "¡Categoría recuperada!",
                icon: "success",
              });
              console.log(response);
              this.getLists();
            })
            .catch((error) => console.log(error))
            .finally(() => (this.loading = false));
        }
      });
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50),
    },
  },
};
</script>

<style scoped>
.funciones {
  color: #64b5f6;
  line-height: 50px;
  width: 100%;
  text-align: left;
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
  margin-bottom: 2%;
}
</style>
