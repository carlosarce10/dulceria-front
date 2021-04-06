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
          <sui-tab-pane icon="check icon" title="Usuarios Activos">
            <div class="table">
              <div class="search">
                <div class="ui fluid category search">
                  <div class="ui icon input">
                    <div style="margin-right: 5%">
                      <sui-button
                        @click.native="toggle()"
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
                <sui-segment basic v-if="listaUserTrue.length === 0">
                  <i style="color: #6c757d" class="massive comment icon"></i
                  ><br />
                  <small style="color: #6c757d"
                    >No se encontraron registros.</small
                  >
                </sui-segment>
                <sui-table v-if="listaUserTrue.length > 0" color="blue">
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
                      v-for="user in listaUserTrue"
                      :key="user.id"
                    >
                      <sui-table-cell text-align="center">{{
                        user.username
                      }}</sui-table-cell>
                      <sui-table-cell text-align="center">{{
                        user.lastLogin
                      }}</sui-table-cell>
                      <sui-table-cell
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <sui-button
                          @click="getUserPass(user.id)"
                          @click.native="togglePass()"
                          id="pass"
                          style="background: #FFC300"
                          negative
                          circular
                          icon="key"
                        />
                        <sui-button
                          @click="getUser(user.id)"
                          @click.native="toggleEdit()"
                          id="editar"
                          style="background: #64b5f6"
                          negative
                          circular
                          icon="edit"
                        />
                        <sui-button
                          id="delete"
                          v-on:click="eliminar(user.id)"
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
          <sui-tab-pane icon="ban icon" title="Usuarios Inactivos">
            <sui-container style="margin-top: 2%">
                <sui-segment basic v-if="listaUserFalse.length === 0">
                  <i style="color: #6c757d" class="massive comment icon"></i
                  ><br />
                  <small style="color: #6c757d"
                    >No se encontraron registros.</small
                  >
                </sui-segment>
              <sui-table v-if="listaUserFalse.length > 0" color="blue">
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
                    v-for="user in listaUserFalse"
                    :key="user.id"
                  >
                    <sui-table-cell text-align="center">{{
                      user.username
                    }}</sui-table-cell>
                    <sui-table-cell text-align="center">{{
                      user.lastLogin
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
                        v-on:click="recuperar(user.id)"
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
              <input type="text" v-model="user.username" />
            </sui-form-field>
            <sui-form-field>
              <label>Contraseña:</label>
              <input type="password" v-model="user.password" />
            </sui-form-field>
            <sui-form-field>
              <label>Confirma tu contraseña:</label>
              <input type="password" v-model="user.confirmPassword" />
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button negative @click.native="toggle()" type="submit">
            Cancelar
          </sui-button>
          <sui-button
            id="registrar"
            @click="register()"
            positive
            @click.native="toggle()"
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
          <sui-button negative @click.native="toggleEdit()" type="submit">
            Cancelar
          </sui-button>
          <sui-button
            id="editar"
            v-on:click="editar()"
            positive
            @click.native="toggleEdit()"
            type="submit"
          >
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>


    <div>
      <sui-modal class="modal-small" v-model="openPass">
        <sui-modal-header>Modificar contraseña de usuario</sui-modal-header>
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <sui-segment color="blue">
                <label>Usuario: {{userPass.username}}</label>
              </sui-segment>
            </sui-form-field>
            <sui-form-field>
              <label>Nueva contraseña</label>
              <input type="password" v-model="userPass.password"/>
            </sui-form-field>
            <sui-form-field>
              <label>Confirmar nueva contraseña</label>
              <input type="password" v-model="userPass.confirmPassword"/>
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button negative @click.native="togglePass()" type="submit">
            Cancelar
          </sui-button>
          <sui-button
            id="editar"
            v-on:click="changePassword()"
            positive
            @click.native="togglePass()"
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
  name: "CajeroAdmin",
  components: {
    fondo,
    cabecera
  },
  data() {
    return {
      open: false,
      openEdit: false,
      openPass: false,
      userPass: {
        id: 0,
        username: "",
        password: "",
        confirmPassword: ""
      },
      listaUserTrue: [],
      listaUserFalse: [],
      listaRoles: [],
      user: {
        username: "",
        password: "",
        confirmPassword:"",
        lastLogin: ""
      },
      userEdit: {
        id: 0,
        username: ""
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
        .then((response) => {
          this.listaUserTrue = response.data;
          for(let u of this.listaUserTrue){
            if(u.lastLogin !== null){
              u.lastLogin = u.lastLogin.split(".")[0];
              u.lastLogin = u.lastLogin.replace("T"," ");
              u.lastLogin = u.lastLogin + " hrs."
            }
          }
        })
        .catch((error) => console.log(error));
      api
        .doGet("/user/list/false")
        .then((response) => {
          this.listaUserFalse = response.data
          for(let u of this.listaUserFalse){
            if(u.lastLogin !== null){
              u.lastLogin = u.lastLogin.split(".")[0];
              u.lastLogin = u.lastLogin.replace("T"," ");
              u.lastLogin = u.lastLogin + " hrs."
            }
          }
        })
        .catch((error) => console.log(error));
    },
    toggle() {
      this.open = !this.open;
    },
    togglePass(){
      this.openPass = !this.openPass;
    },
    toggleEdit() {
      this.openEdit = !this.openEdit;
    },
    getUser(id){
      api
        .doGet("/user/get/" + id)
        .then((response) => {
          console.log(response);
          this.userEdit = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserPass(id){
      api
        .doGet("/user/get/" + id)
        .then((response) => {
          console.log(response);
          this.userPass.id = response.data.id;
          this.userPass.username = response.data.username;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register() {

      if(this.user.password === this.user.confirmPassword){
        api
          .doGet("/user/exists/"+this.user.username)
          .then(res=>{
            if(res.data){
              this.$swal({
                title: "¡Este usuario ya está registrado!",
                icon: "warning"
              });
            }else{
              api
                .doPost("/user/save/cashier", this.user)
                .then((response) => {
                  this.$swal({
                    title: "¡Usuario registrado exitosamente!",
                    icon: "success"
                  });
                  console.log(response);
                  this.getLists();
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loading = false));
            }
          })
          .catch(e=>{
            console.log(e);
          });
      }else{
        this.$swal({
          title: "¡Las contraseñas no coinciden!",
          icon: "warning"

        });
      }



    },
    eliminar(id) {
      this.$swal({
        title: "¿Estás seguro de eliminar este usuario?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("/user/del/" + id)
            .then((response) => {
              this.$swal({
                title: "¡Usuario eliminado exitosamente!",
                icon: "success"
              });
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
        .doGet("/user/exists/"+this.userEdit.username)
        .then(res=>{
          if(res.data){
            this.$swal({
              title: "¡Este usuario ya está registrado!",
              icon: "warning"
            });
          }else{
            api
              .doPut("/user/change/"+this.userEdit.username+"/"+this.userEdit.id)
              .then((response) => {
                this.$swal({
                  title: "¡Nombre de usuario modificado exitosamente!",
                  icon: "success"
                });
                console.log(response);
                this.getLists();
              })
              .catch((error) => console.log(error))
              .finally(() => (this.loading = false));
          }
        })
        .catch(e=>{
          console.log(e);
        });
    },
    changePassword(){
      if(this.userPass.password === this.userPass.confirmPassword){
        api
          .doPost("/user/change/password", this.userPass)
          .then(res=>{
            console.log(res);
            this.$swal({
              title: "¡La contraseña fue modificada exitosamente!",
              icon: "success"
            })
          })
          .catch(e=>{
            console.log(e);

          })
          ;

      }else{
        this.$swal({
          title: "¡Las contraseñas no coinciden!",
          icon: "warning"
        });
      }
    },
    recuperar(id) {
      console.log(id);

      this.$swal({
        title: "¿Estás seguro de recuperar este usuario?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true
      }).then(result=>{
        if(result.isConfirmed){
          api
            .doPut("/user/put/" + id)
            .then((response) => {
              this.$swal({
                title: "¡Usuario recuperado!",
                icon: "success"
              });
              console.log(response);
              this.getLists();
            })
            .catch((error) => console.log(error))
            .finally(() => (this.loading = false));
        }
      });

    }
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
