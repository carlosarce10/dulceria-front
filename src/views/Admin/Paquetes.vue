<template>
  <div>
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Paquetes</h3>
    </div>
    <div style="width: 60%; margin-left: 20%">
      <sui-divider hidden />
      <sui-tab>
        <sui-tab-pane title="Paquetes Activos">
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
                      >Paquete</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Precio</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Detalles de paquete</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Acciones</sui-table-header-cell
                    >
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row
                    v-for="listPackage in listPackage"
                    :key="listPackage.id"
                  >
                    <sui-table-cell text-align="center">{{
                      listPackage.name
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      listPackage.price
                    }}</sui-table-cell>
                    <sui-table-cell
                      ><sui-button
                        style="
                          display: block;
                          margin-left: auto;
                          margin-right: auto;
                        "
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
                      <sui-button
                        id="delete"
                        v-on:click="eliminar(listPackage.id)"
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
        <sui-tab-pane title="Paquetes Inactivos">
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
                      >Paquete</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Precio</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Recuperar</sui-table-header-cell
                    >
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row
                    v-for="listPackageFalse in listPackageFalse"
                    :key="listPackageFalse.id"
                  >
                    <sui-table-cell text-align="center">{{
                      listPackageFalse.name
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      listPackageFalse.price
                    }}</sui-table-cell>
                    <sui-table-cell
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                      ><sui-button
                        id="recuperar"
                        v-on:click="recuperar(listPackageFalse.id)"
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
          >Registrar paquete</sui-modal-header
        >
        <sui-modal-body>
          <sui-form
            style="margin-bottom: 5%; width: 50%; margin-left: 25%"
            id="formRegistro"
          >
            <sui-form-field>
              <label>Nombre del paquete:</label>
              <input type="text" v-model="packages.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio del paquete:</label>
              <input type="number" v-model="packages.price" />
            </sui-form-field>
          </sui-form>
        </sui-modal-body>
        <sui-modal-actions>
          <sui-button
            id="registrar"
            @click="register"
            type="submit"
            positive
            @click.native="toggle"
          >
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
    <div>
      <sui-modal v-model="openEdit">
        <sui-modal-header style="margin-bottom: 3%"
          >Editar paquete</sui-modal-header
        >
        <sui-modal-body>
          <sui-form
            style="margin-bottom: 5%; width: 50%; margin-left: 25%"
            id="formEdit"
          >
            <sui-form-field>
              <label>Nombre del paquete:</label>
              <input type="text" v-model="packages.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio del paquete:</label>
              <input type="number" v-model="packages.price" />
            </sui-form-field>
          </sui-form>
        </sui-modal-body>
        <sui-modal-actions>
          <sui-button
            id="editar"
            type="submit"
            positive
            @click.native="toggleEdit"
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
  name: "Paquetes",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      openEdit: false,
      id: null,
      loading: true,
      elegido: {},
      packages: {
        name: null,
        price: null,
      },
      listPackage: null,
      listPackageFalse: null,
    };
  },
  mounted() {
    this.obtenerDatosF();
    this.obtenerDatos();
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    obtenerDatos() {
      api
        .doGet("package/list/true")
        .then((listPackage) => (this.listPackage = listPackage.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    obtenerDatosF() {
      api
        .doGet("package/list/false")
        .then(
          (listPackageFalse) => (this.listPackageFalse = listPackageFalse.data)
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    register() {
      api
        .doPost("package/save", this.packages)
        .then((response) => {
          
          this.$swal("Se ha registrado exitosamente");
          this.onReset();
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    editar(id) {
      api
        .doPost("package/get/" + id, {
          name: this.name,
          price: this.price,
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      this.$swal("Se ha registrado exitosamente");
      this.onReset();
    },
    eliminar(id) {
      api
        .doDelete("package/del/" + id)
        .then(res=>{
          console.log(res);
          this.$swal("Se ha eliminado exitosamente");
          this.onReset();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
        
    },
    recuperar(id) {
      console.log(id);
      api
        .doPut("package/put/" + id)
        .then(res=>{
          console.log(res);
          this.$swal("Se ha recuperado exitosamente");
          this.onReset();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      
    },
    onReset() {
      this.packages.name = "";
      this.packages.price = "";
      this.obtenerDatos();
      this.obtenerDatosF();
    },
    showAlert() {},
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
