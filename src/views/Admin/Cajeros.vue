<template>
  <div>
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Cajero</h3>
    </div>

    <div>
      <div style="width: 60%; margin-left: 20%">
        <sui-divider hidden />
        <sui-tab>
          <sui-tab-pane title="Usuarios Activos">
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
                        >Nombre de usuario</sui-table-header-cell
                      >
                      <sui-table-header-cell text-align="center"
                        >Última conexión</sui-table-header-cell
                      >
                      <sui-table-header-cell text-align="center"
                        >Acciones</sui-table-header-cell
                      >
                    </sui-table-row>
                  </sui-table-header>
                  <sui-table-body>
                    <sui-table-row
                      v-for="listaUserTrue in listaUserTrue"
                      :key="listaUserTrue.id"
                    >
                      <sui-table-cell text-align="center">{{
                        listaUserTrue.username
                      }}</sui-table-cell>
                      <sui-table-cell text-align="center">{{
                        listaUserTrue.lastLogin
                      }}</sui-table-cell>
                      <sui-table-cell
                        style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                      >
                        <sui-button
                          @click.native="toggleEdit(listaUserTrue.id)"
                          id="editar"
                          style="background: #64b5f6"
                          negative
                          circular
                          icon="edit"
                        />
                        <sui-button
                          id="delete"
                          v-on:click="eliminar(listaUserTrue.id)"
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
          <sui-tab-pane title="Usuarios Inactivos">
            <sui-container style="margin-top: 2%">
              <sui-table color="blue">
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-header-cell text-align="center"
                      >Nombre de usuario</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >última conexión</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Rol</sui-table-header-cell
                    >
                    <sui-table-header-cell text-align="center"
                      >Acciones</sui-table-header-cell
                    >
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row
                    v-for="listaUserFalse in listaUserFalse"
                    :key="listaUserFalse.id"
                  >
                    <sui-table-cell text-align="center">{{
                      listaUserFalse.username
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      listaUserFalse.lastLogin
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      listaUserFalse.role.name
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
                        v-on:click="recuperar(listaUserFalse.id)"
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
          </sui-tab-pane>
        </sui-tab>
      </div>
    </div>
    <div>
      <sui-modal class="modal-small" v-model="open">
        <sui-modal-header>Registrar usuario</sui-modal-header>
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <label>Nombre de usuario:</label>
              <input v-model="user.username" />
            </sui-form-field>
            <sui-form-field>
              <label>Contraseña:</label>
              <input type="password" v-model="user.password" />
            </sui-form-field>
            <sui-form-field>
              <label>Rol:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="user.role.id"
              >
                <option
                  v-for="listaRoles in listaRoles"
                  :key="listaRoles.id"
                  :value="listaRoles.id"
                >
                  {{ listaRoles.name }}
                </option>
              </select>
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button negative @click.native="toggle" type="submit">
            Cancelar
          </sui-button>
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
      <sui-modal class="modal-small" v-model="openEdit">
        <sui-modal-header>Modificar usuario</sui-modal-header>
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <label>Nombre del usuario:</label>
              <input v-model="userEdit.username" />
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button negative @click.native="toggleEdit" type="submit">
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
import Swal from "sweetalert2";

Vue.use(Particles);
export default {
  name: "CajeroAdmin",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      openEdit: false,
      listaUserTrue: null,
      listaUserFalse: null,
      listaRoles: null,
      user: {
        username: "",
        passrod: "",
        lastLogin: "",
        role: { id: "", name: "" },
      },
      userEdit: {
        id: 0,
        username: "",
      },
    };
  },
  beforeMount() {
    this.getLists();
  },
  methods: {
    getLists() {
      api
        .doGet("/user/list/true")
        .then((listaUserTrue) => (this.listaUserTrue = listaUserTrue.data))
        .catch((error) => console.log(error));
      api
        .doGet("/user/list/false")
        .then((listaUserFalse) => (this.listaUserFalse = listaUserFalse.data))
        .catch((error) => console.log(error));
      api
        .doGet("/role/list")
        .then((listaRoles) => (this.listaRoles = listaRoles.data))
        .catch((error) => console.log(error));
    },
    toggle() {
      this.open = !this.open;
    },
    toggleEdit(id) {
      api
        .doGet("/user/get/" + id)
        .then((response) => {
          console.log(response);
          this.userEdit = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.openEdit = !this.openEdit;
    },
    register() {
      api
        .doPost("/user/save", this.user)
        .then((response) => {
          this.$swal("¡Usuario registrado exitosamente!");
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    eliminar(id) {
      Swal.fire({
        title: "¿Estás seguro de eliminar este usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("/user/del/" + id)
            .then((response) => {
              Swal.fire("¡Usuario eliminado exitosamente!");
              console.log(response);
              this.getLists();
            })
            .catch((error) => console.log(error))
            .finally(() => (this.loading = false));
        }
      });
    },
    editar() {
      api
        .doPost("/user/save", this.userEdit)
        .then((response) => {
          this.$swal("¡Usuario modificado exitosamente!");
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
        .doPut("/user/put/" + id)
        .then((response) => {
          this.$swal("¡Usuario recuperado!");
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    showAlert() {
      // Use sweetalert2
      this.$swal("Hello Vue world!!!");
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
}
</style>
