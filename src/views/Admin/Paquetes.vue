<template>
  <div>
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Paquetes</h3>
    </div>
      <sui-divider hidden />
      <sui-tab class="panel"> 
        <sui-tab-pane icon="check icon" title="Paquetes Activos">
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
                        @click.native="toggleEdit(listPackage.id)"
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
        <sui-tab-pane icon="ban icon" title="Paquetes Inactivos">
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
    <div>
      <sui-modal class="modal-small" v-model="open">
        <sui-modal-header style="margin-bottom: 3%"
          >Registrar paquete</sui-modal-header
        >
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <label>Nombre del paquete:</label>
              <input
                type="text"
                v-model="$v.name.$model"
                :class="status($v.name)"
              />
              <div
                class="error errorMsg"
                v-if="!$v.name.required && $v.name.$dirty"
              >
                El nombre del paquete no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.name.minLength && $v.name.maxLength"
              >
                El nombre del paquete debe tener entre 3 y 50 carateres
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Precio del paquete:</label>
              <input
                type="number"
                v-model="$v.price.$model"
                :class="status($v.price)"
              />
              <div
                class="error errorMsg"
                v-if="!$v.price.required && $v.price.$dirty"
              >
                El precio del paquete no debe estar en blanco
              </div>
              <div class="error errorMsg" v-if="!$v.price.minValue">
                El precio del paquete debe ser positivo
              </div>
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button
            type="button"
            negative
            @click.native="toggle"
            @click="onReset()"
          >
            Cancelar
          </sui-button>
          <sui-button
            id="registrar"
            @click="register"
            type="submit"
            positive
            @click.native="toggle"
            :disabled="!(!$v.$invalid && $v.$dirty)"
          >
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
    <div>
      <sui-modal v-model="openEdit">
        <sui-modal-header style="margin-bottom: 3%"
          >Modificar paquete</sui-modal-header
        >
        <sui-modal-content>
          <sui-form>
            <sui-form-field>
              <label>Name</label>
              <input v-model="packagesEdit.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio del paquete:</label>
              <input type="number" v-model="packagesEdit.price" />
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button negative @click.native="toggleEdit" type="submit">
            Cancelar
          </sui-button>
          <sui-button
            id="editar"
            type="submit"
            v-on:click="editar()"
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
import {
  required,
  minLength,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";
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
        name: "",
        price: false,
      },
      packagesEdit: {
        name: "",
        price: false,
      },
      listPackage: null,
      listPackageFalse: null,
      name: "",
      price: false,
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
      this.packages = {
        name: this.name,
        price: this.price,
      };

      api
        .doPost("package/save", this.packages)
        .then((response) => {
          this.$swal({
            title: "¡Producto registrado exitosamente!",
            icon: "success",
          });
          this.onReset();
          console.log(response);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    toggleEdit(id) {
      api
        .doGet("package/get/" + id)
        .then((res) => {
          console.log(res);
          this.packagesEdit = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.openEdit = !this.openEdit;
    },
    editar() {
      api
        .doPost("package/save", this.packagesEdit)
        .then((response) => {
          this.$swal({
            title: "¡Marca modificada exitosamente!",
            icon: "success",
          });
          console.log(response);
          this.onReset();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminar(id) {
      this.$swal({
        title: "¿Estás seguro de eliminar este producto?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("package/del/" + id)
            .then((res) => {
              this.$swal({
                title: "¡Producto eliminado exitosamente!",
                icon: "success",
              });
              console.log(res);
              this.onReset();
            })
            .catch((error) => console.log(error))
            .finally(() => (this.loading = false));
        }
      });
    },
    recuperar(id) {
      console.log(id);
      this.$swal({
        title: "¿Estás seguro de recuperar este producto?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doPut("package/put/" + id)
            .then((res) => {
              this.$swal({
                title: "¡Producto recuperado!",
                icon: "success",
              });
              this.onReset();
              console.log(res);
            })
            .catch((error) => console.log(error))
            .finally(() => (this.loading = false));
        }
      });
    },
    onReset() {
      this.name = "";
      this.price = "";
      this.obtenerDatos();
      this.obtenerDatosF();
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
    price: {
      minValue: minValue(0),
      required,
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
  margin-bottom: 2%;
}
.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>
