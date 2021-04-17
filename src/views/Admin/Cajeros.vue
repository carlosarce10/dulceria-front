<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Cajero</h3>
    </div>

    <div>
      <sui-divider hidden />
      <sui-tab class="panel">
        <sui-tab-pane icon="check icon" title="Usuarios Activos">
          <div class="table">
            <div class="ui search">
              <sui-button
                @click.native="toggle"
                style="background: #64b5f6"
                negative
                circular
                icon="plus"
              />
              <div class="ui icon input">
                <input
                  class="prompt"
                  type="text"
                  placeholder="Buscar usuario"
                  v-model="search"
                />
                <i class="search icon"></i>
              </div>
              <div class="results"></div>
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
                      >#</sui-table-header-cell
                    >
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
                    v-for="(user, item) in filteredUsers"
                    :key="user.id"
                  >
                    <sui-table-cell text-align="center">{{
                      item + 1
                    }}</sui-table-cell>
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
                        style="background: #ffc300"
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
          <div class="table">
            <div class="ui search">
              <div class="ui icon input">
                <input
                  class="prompt"
                  type="text"
                  placeholder="Buscar usuarios"
                  v-model="searchD"
                />
                <i class="search icon"></i>
              </div>
              <div class="results"></div>
            </div>
            <sui-container>
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
                      >#</sui-table-header-cell
                    >
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
                    v-for="(user, item) in filteredUsersDisabled"
                    :key="user.id"
                  >
                    <sui-table-cell text-align="center">{{
                      item + 1
                    }}</sui-table-cell>
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
          </div>
        </sui-tab-pane>
      </sui-tab>
    </div>

    <!-- REGISTRAR NUEVO USUARIO -->
    <div>
      <sui-modal class="modal-small" v-model="open">
        <sui-modal-header>Registrar usuario</sui-modal-header>
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <label>Nombre de usuario:</label>
              <input
                type="text"
                v-model="$v.username.$model"
                :class="status($v.username)"
                @keypress="letterOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.username.required && $v.username.$dirty"
              >
                El nombre del usuario no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.username.minLength && $v.username.maxLength"
              >
                El nombre del usuario debe tener entre 3 y 50 carateres
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Contraseña:</label>
              <input
                type="password"
                v-model="$v.password.$model"
                :class="status($v.password)"
              />
              <div
                class="error errorMsg"
                v-if="!$v.password.required && $v.password.$dirty"
              >
                La contraseña no debe estar en blanco
              </div>
              <div class="error errorMsg" v-if="!$v.password.minLength">
                La contraseña debe tener al menos 8 caracteres
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Confirma tu contraseña:</label>
              <input
                type="password"
                v-model="$v.confirmPassword.$model"
                :class="status($v.confirmPassword)"
              />
              <div
                class="error errorMsg"
                v-if="
                  !$v.confirmPassword.sameAsPassword &&
                  $v.confirmPassword.$dirty
                "
              >
                Las contraseñas no coinciden
              </div>
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button
            negative
            @click.native="toggle()"
            @click="onReset()"
            type="submit"
          >
            Cancelar
          </sui-button>
          <sui-button
            id="registrar"
            @click="register()"
            positive
            @click.native="toggle()"
            type="submit"
            :disabled="
              !(
                !$v.username.$invalid &&
                $v.username.$dirty &&
                !$v.password.$invalid &&
                $v.password.$dirty &&
                !$v.confirmPassword.$invalid &&
                $v.confirmPassword.$dirty
              )
            "
          >
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>

    <!--EDITAR NOMBRE DE USUARIO  -->
    <div>
      <sui-modal class="modal-small" v-model="openEdit">
        <sui-modal-header>Modificar usuario</sui-modal-header>
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <label>Nombre del usuario:</label>
              <input
                v-model="$v.usernameEdit.$model"
                :class="status($v.usernameEdit)"
                @keypress="letterOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.usernameEdit.required && $v.usernameEdit.$dirty"
              >
                El nombre del usuario no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.usernameEdit.minLength && $v.usernameEdit.maxLength"
              >
                El nombre del usuario debe tener entre 3 y 50 carateres
              </div>
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
            :disabled="!(!$v.usernameEdit.$invalid && $v.usernameEdit.$dirty)"
          >
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>

    <!-- EDITAR CONTRASEÑA DEL USUARIO -->
    <div>
      <sui-modal class="modal-small" v-model="openPass">
        <sui-modal-header>Modificar contraseña de usuario</sui-modal-header>
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <sui-segment color="blue">
                <label>Usuario: {{ userPass.username }}</label>
              </sui-segment>
            </sui-form-field>
            <sui-form-field>
              <label>Nueva contraseña</label>
              <input
                type="password"
                v-model="$v.passwordEdit.$model"
                :class="status($v.passwordEdit)"
              />
              <div
                class="error errorMsg"
                v-if="!$v.passwordEdit.required && $v.passwordEdit.$dirty"
              >
                La contraseña no debe estar en blanco
              </div>
              <div class="error errorMsg" v-if="!$v.passwordEdit.minLength">
                La contraseña debe tener al menos 8 caracteres
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Confirmar nueva contraseña</label>
              <input
                type="password"
                v-model="$v.confirmPasswordEdit.$model"
                :class="status($v.confirmPasswordEdit)"
              />
              <div
                class="error errorMsg"
                v-if="
                  !$v.confirmPasswordEdit.sameAsPassword &&
                  $v.confirmPasswordEdit.$dirty
                "
              >
                Las contraseñas no coinciden
              </div>
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
            :disabled="
              !(
                !$v.passwordEdit.$invalid &&
                $v.passwordEdit.$dirty &&
                !$v.confirmPasswordEdit.$invalid &&
                $v.confirmPasswordEdit.$dirty
              )
            "
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
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

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
      openPass: false,
      userPass: {
        id: 0,
        username: "",
        password: "",
        confirmPassword: "",
      },
      listaUserTrue: [],
      listaUserFalse: [],
      listaRoles: [],
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        lastLogin: "",
      },
      userEdit: {
        id: 0,
        username: "",
      },
      search: "",
      searchD: "",
      username: "",
      password: "",
      confirmPassword: "",
      usernameEdit: "",
      passwordEdit: "",
      confirmPasswordEdit: "",
    };
  },
  beforeMount() {
    this.getLists();
  },
  computed: {
    filteredUsers: function () {
      return this.listaUserTrue.filter((user) => {
        return user.username.toLowerCase().match(this.search.toLowerCase());
      });
    },
    filteredUsersDisabled: function () {
      return this.listaUserFalse.filter((user) => {
        return user.username.toLowerCase().match(this.searchD.toLowerCase());
      });
    },
  },
  methods: {
    getLists() {
      api
        .doGet("/user/list/true")
        .then((response) => {
          this.listaUserTrue = response.data;
          for (let u of this.listaUserTrue) {
            if (u.lastLogin !== null) {
              u.lastLogin = u.lastLogin.split(".")[0];
              u.lastLogin = u.lastLogin.replace("T", " ");
              u.lastLogin = u.lastLogin + " hrs.";
            }
          }
        })
        .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
        });
      api
        .doGet("/user/list/false")
        .then((response) => {
          this.listaUserFalse = response.data;
          for (let u of this.listaUserFalse) {
            if (u.lastLogin !== null) {
              u.lastLogin = u.lastLogin.split(".")[0];
              u.lastLogin = u.lastLogin.replace("T", " ");
              u.lastLogin = u.lastLogin + " hrs.";
            }
          }
        })
        .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
        });
    },
    toggle() {
      this.open = !this.open;
    },
    togglePass() {
      this.openPass = !this.openPass;
    },
    toggleEdit() {
      this.openEdit = !this.openEdit;
    },
    getUser(id) {
      api
        .doGet("/user/get/" + id)
        .then((response) => {
          this.userEdit = response.data;
          this.usernameEdit = response.data.username;
          this.idEdit = response.data.id;
        })
        .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
        });
    },
    getUserPass(id) {
      api
        .doGet("/user/get/" + id)
        .then((response) => {
          this.idPassEdit = response.data.id;
          this.userPass.username = response.data.username;
          this.usernameEditPass = response.data.username;
        })
        .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
        });
    },
    register() {
      if (this.password === this.confirmPassword) {
        this.userObj = {
          username: this.username,
          password: this.password,
        };
        api
          .doGet("/user/exists/" + this.username)
          .then((res) => {
            if (res.data) {
              this.$swal({
                title: "¡Este usuario ya está registrado!",
                icon: "warning",
              });
            } else {
              api
                .doPost("/user/save/cashier", this.userObj)
                .then(() => {
                  this.$swal({
                    title: "¡Usuario registrado exitosamente!",
                    icon: "success",
                  });
                  this.getLists();
                  this.username = "";
                  this.password = "";
                  this.confirmPassword = "";
                })
                .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
                });
            }
          })
          .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
          });
      } else {
        this.$swal({
          title: "¡Las contraseñas no coinciden!",
          icon: "warning",
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
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("/user/del/" + id)
            .then(() => {
              this.$swal({
                title: "¡Usuario eliminado exitosamente!",
                icon: "success",
              });
              this.getLists();
            })
            .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
            });
        }
      });
    },
    editar() {
      api
        .doGet("/user/exists/" + this.usernameEdit)
        .then((res) => {
          if (res.data) {
            this.$swal({
              title: "¡Este usuario ya está registrado!",
              icon: "warning",
            });
          } else {
            api
              .doPut("/user/change/" + this.usernameEdit + "/" + this.idEdit)
              .then(() => {
                this.$swal({
                  title: "¡Nombre de usuario modificado exitosamente!",
                  icon: "success",
                });
                this.getLists();
                this.usernameEdit = "";
              })
              .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
              });
          }
        })
        .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
        });
    },
    changePassword() {
      if (this.passwordEdit === this.confirmPasswordEdit) {
        this.passEdit = {
          id: this.idPassEdit,
          username: this.usernameEditPass,
          password: this.passwordEdit,
        };
        api
          .doPost("/user/change/password", this.passEdit)
          .then(() => {
            this.$swal({
              title: "¡La contraseña fue modificada exitosamente!",
              icon: "success",
            });
            this.passwordEdit = "";
            this.confirmPasswordEdit = "";
          })
          .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
          });
      } else {
        this.$swal({
          title: "¡Las contraseñas no coinciden!",
          icon: "warning",
        });
      }
    },
    recuperar(id) {

      this.$swal({
        title: "¿Estás seguro de recuperar este usuario?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doPut("/user/put/" + id)
            .then(() => {
              this.$swal({
                title: "¡Usuario recuperado!",
                icon: "success",
              });
              this.getLists();
            })
            .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
              icon: "error",
            });
          }
            });
        }
      });
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    letterOnly() {
      let pattern = /^[A-Za-záéíóúÁÉÍÓÚÑñ ]+$/;
      let res = event.key.match(pattern);
      if (!res) {
        event.preventDefault();
        return false;
      }
    },
    onReset() {
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50),
    },
    usernameEdit: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50),
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAsPassword: sameAs("password"),
    },
    passwordEdit: {
      required,
      minLength: minLength(8),
    },
    confirmPasswordEdit: {
      sameAsPassword: sameAs("passwordEdit"),
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
  margin-bottom: 5px;
}
</style>
