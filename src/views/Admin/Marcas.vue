<template>
  <div>
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Marcas</h3>
    </div>

    <div style="width: 60%; margin-left: 20%">
      <sui-divider hidden />
      <sui-tab>
        <sui-tab-pane title="Marcas Activas">
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
            <sui-container style="margin-top: 2%">
              <sui-table color="blue">
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-header-cell text-align="center"
                      >Marca</sui-table-header-cell
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
        <sui-tab-pane title="Marcas Inactivas">
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
                      >Marca</sui-table-header-cell
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
          >Registrar nueva marca</sui-modal-header
        >
        <sui-modal-body>
          <sui-form
            style="margin-bottom: 5%; width: 50%; margin-left: 25%"
            id="formRegistro"
          >
            <sui-form-field>
              <label>Nombre de la marca:</label>
              <input v-model="name" />
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
          >Modificar marca</sui-modal-header
        >
        <sui-modal-body>
          <sui-form
            style="margin-bottom: 5%; width: 50%; margin-left: 25%"
            id="formModificar"
          >
            <sui-form-field>
              <label>Nombre de la marca:</label>
              <input v-model="marcaEdit.name" />
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
  name: "Marcas",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      openEdit: false,
      resultTrue: null,
      resultFalse: null,
      resultEdit: null,
      //id: null,
      loading: true,
      name: "",
      marcaEdit:{
        id:0,
        name:""
      }
    };
  },
  beforeMount() {
    this.getLists();
  },
  methods: {
    getLists() {
      api
        .doGet("/brand/list/true")
        .then((resultTrue) => (this.resultTrue = resultTrue.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));

      api
        .doGet("/brand/list/false")
        .then((resultFalse) => (this.resultFalse = resultFalse.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    toggle() {
      this.open = !this.open;
    },
    toggleEdit(id) {
      api
        .doGet("/brand/get/"+id)
        .then(response => {
          console.log(response);
          this.marcaEdit = response.data;
        }).catch(error=>{
          console.log(error);
        })


      this.openEdit = !this.openEdit;
    },
    editar(){
      api
        .doPost("brand/save",this.marcaEdit)
        .then(response=>{
          console.log(response);
          this.getLists();
        })
        .catch(error=>{
          console.log(error);
        });
    },
    register() {
      api
        .doPost("brand/save/", {
          name: this.name,
        })
        .then((response) => {
          this.resultTrue.push(response.data);
          window.location.reload();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      //this.$router.push("/Marcas");
      //location.reload();
    },
    getId(id) {
      api
        .doGet("/brand/get/" + id)
        .then((resultEdit) => (this.resultEdit = resultEdit.data))
        .catch((error) => console.log(error));
    },
    eliminar(id) {
      console.log(id);
      api
        .doDelete("brand/del/" + id)
        .then((response) => {
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    recuperar(id) {
      console.log(id);
      api
        .doPut("brand/put/" + id)
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