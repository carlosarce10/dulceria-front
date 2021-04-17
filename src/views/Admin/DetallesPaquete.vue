<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Detalles del paquete</h3>
      <a class="item" href="/admin/paquetes">
        <sui-button
          icon="reply"
          floated="left"
          style="background: #64b5f6"
          negative
          content="Regresar"
        />
      </a>
    </div>

    <!-- REGISTRO DE PAQUETE -->
    <sui-tab class="panel">
      <sui-tab-pane v-if="id === 0" icon="boxes" title="Productos">
        <sui-divider horizontal>PAQUETE</sui-divider>
        <sui-grid :columns="3">
          <sui-grid-row>
            <sui-grid-column>
              <label class="my-label">Nombre del paquete</label>
              <sui-input
                type="text"
                v-model="$v.nombre.$model"
                :class="status($v.nombre)"
                @keypress="letterOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.nombre.required && $v.nombre.$dirty"
              >
                El nombre del paquete no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.nombre.minLength && $v.nombre.maxLength"
              >
                El nombre del paquete debe tener entre 3 y 50 carateres
              </div>
            </sui-grid-column>
            <sui-grid-column>
              <label class="my-label">Precio</label>
              <sui-input
                type="text"
                :placeholder="getSugerido"
                v-model="$v.precio.$model"
                :class="status($v.precio)"
                @keypress="numberOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.precio.required && $v.precio.$dirty"
              >
                El precio no debe estar en blanco
              </div>
              <div class="error errorMsg" v-if="!$v.precio.minValue">
                El precio debe se mayor a 0
              </div>
            </sui-grid-column>
            <sui-grid-column>
              <label style="color: transparent" class="my-label">.</label>
              <sui-button
                v-if="detalles.length === 0"
                style="background: #64b5f6"
                disabled
                negative
                icon="pencil alternate"
                >Registrar paquete</sui-button
              >
              <sui-button
                v-if="detalles.length > 0"
                style="background: #64b5f6"
                negative
                @click="register()"
                icon="pencil alternate"
                :disabled="
                  !(
                    !$v.nombre.$invalid &&
                    $v.nombre.$dirty &&
                    !$v.precio.$invalid &&
                    $v.precio.$dirty
                  )
                "
                >Registrar paquete</sui-button
              >
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
        <sui-divider hidden />
        <sui-divider horizontal>PRODUCTOS DEL PAQUETE</sui-divider>
        <sui-container style="margin-top: 2%">
          <sui-grid :columns="3">
            <sui-grid-row>
              <sui-grid-column>
                <label class="my-label">Producto</label>
                <sui-dropdown
                  class="custom-search"
                  :options="productos"
                  placeholder="Producto"
                  search
                  selection
                  v-model="idProducto"
                />
              </sui-grid-column>
              <sui-grid-column>
                <label style="color: transparent" class="my-label">.</label>
                <sui-button
                  style="float: left; background-color: #64b5f6"
                  negative
                  circular
                  @click="addProductToDetails()"
                  icon="plus"
                />
              </sui-grid-column>
              <sui-grid-column>
                <sui-divider hidden />
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
              </sui-grid-column>
            </sui-grid-row>
          </sui-grid>
          <sui-table color="blue">
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell text-align="center"
                  >#</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Nombre</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Precio</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Cantidad</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Acciones</sui-table-header-cell
                >
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row v-for="(d, i) in filteredProducts" :key="d.id">
                <sui-table-cell text-align="center">{{ i + 1 }}</sui-table-cell>
                <sui-table-cell text-align="center">{{
                  d.product.name
                }}</sui-table-cell>
                <sui-table-cell text-align="center"
                  >${{ d.product.retailPrice }}</sui-table-cell
                >
                <sui-table-cell text-align="center">
                  <sui-input
                    style="width: 6rem"
                    min="1"
                    max="99"
                    type="number"
                    v-model="detalles[i].quantityPackage"
                  />
                </sui-table-cell>
                <sui-table-cell
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  text-align="center"
                >
                  <sui-button
                    style="background: #64b5f6"
                    negative
                    circular
                    icon="eye"
                    @click="getProduct(d.product.id)"
                    @click.native="modalProduct()"
                  />
                  <sui-button
                    negative
                    circular
                    icon="times"
                    @click="dropDetalle(d.product.id, d.product.name)"
                  />
                </sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </sui-container>
      </sui-tab-pane>

      <!-- EIDICIÓN DE PAQUETE -->
      <sui-tab-pane v-if="id !== 0" icon="boxes" title="Productos">
        <sui-divider horizontal>PAQUETE</sui-divider>
        <sui-grid :columns="3">
          <sui-grid-row>
            <sui-grid-column>
              <label class="my-label">Nombre del paquete</label>
              <sui-input
                type="text"
                v-model="$v.nombreE.$model"
                :class="status($v.nombreE)"
                @keypress="letterOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.nombreE.required && $v.nombreE.$dirty"
              >
                El nombre del paquete no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.nombreE.minLength && $v.nombreE.maxLength"
              >
                El nombre del paquete debe tener entre 3 y 50 carateres
              </div>
            </sui-grid-column>
            <sui-grid-column>
              <label class="my-label">Precio</label>
              <sui-input
                type="text"
                :placeholder="getSugeridoE"
                v-model="$v.precioE.$model"
                :class="status($v.precioE)"
                @keypress="numberOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.precioE.required && $v.precioE.$dirty"
              >
                El precio no debe estar en blanco
              </div>
              <div class="error errorMsg" v-if="!$v.precioE.minValue">
                El precio debe se mayor a 0
              </div>
            </sui-grid-column>
            <sui-grid-column>
              <label style="color: transparent" class="my-label">.</label>
              <sui-button
                v-if="detallesE.length === 0"
                style="background: #64b5f6"
                disabled
                negative
                icon="save"
                >Guardar</sui-button
              >
              <sui-button
                v-if="detallesE.length > 0"
                style="background: #64b5f6"
                negative
                @click="editar()"
                icon="save"
                :disabled="
                  !(
                    (!$v.nombreE.$invalid && $v.nombreE.$dirty) ||
                    (!$v.precioE.$invalid && $v.precioE.$dirty)
                  )
                "
                >Guardar</sui-button
              >
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
        <sui-divider hidden />
        <sui-divider horizontal>PRODUCTOS DEL PAQUETE</sui-divider>
        <sui-container style="margin-top: 2%">
          <sui-grid :columns="3">
            <sui-grid-row>
              <sui-grid-column>
                <label class="my-label">Producto</label>
                <sui-dropdown
                  class="custom-search"
                  :options="productos"
                  placeholder="Producto"
                  search
                  selection
                  v-model="idProducto"
                />
              </sui-grid-column>
              <sui-grid-column>
                <label style="color: transparent" class="my-label">.</label>
                <sui-button
                  style="float: left; background-color: #64b5f6"
                  negative
                  circular
                  @click="addProductToDetailsEdit()"
                  icon="plus"
                />
              </sui-grid-column>
              <sui-grid-column>
                <sui-divider hidden />
                <div class="ui search">
                  <div class="ui icon input">
                    <input
                      class="prompt"
                      type="text"
                      placeholder="Buscar producto"
                      v-model="searchD"
                    />
                    <i class="search icon"></i>
                  </div>
                  <div class="results"></div>
                </div>
              </sui-grid-column>
            </sui-grid-row>
          </sui-grid>
          <sui-table color="blue">
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell text-align="center"
                  >#</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Nombre</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Precio</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Cantidad</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Acciones</sui-table-header-cell
                >
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row v-for="(d, i) in filteredProductEdit" :key="d.id">
                <sui-table-cell text-align="center">{{ i + 1 }}</sui-table-cell>
                <sui-table-cell text-align="center">{{
                  d.product.name
                }}</sui-table-cell>
                <sui-table-cell text-align="center"
                  >${{ d.product.retailPrice }}</sui-table-cell
                >
                <sui-table-cell text-align="center">
                  <sui-input
                    style="width: 6rem"
                    min="1"
                    max="99"
                    type="number"
                    v-model="detallesE[i].quantityPackage"
                  />
                </sui-table-cell>
                <sui-table-cell
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  text-align="center"
                >
                  <sui-button
                    style="background: #64b5f6"
                    negative
                    circular
                    icon="eye"
                    @click="getProduct(d.product.id)"
                    @click.native="modalProduct()"
                  />
                  <sui-button
                    negative
                    circular
                    icon="times"
                    @click="dropDetalleEdit(d.product.id, d.product.name)"
                  />
                </sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </sui-container>
      </sui-tab-pane>
    </sui-tab>

    <sui-modal class="modal-small" v-model="openP">
      <sui-modal-header>Producto</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-form>
          <sui-form-field>
            <sui-segments>
              <sui-segment>
                <img
                  v-if="producto.image !== null"
                  style="margin-top: 0px; width: 100%"
                  :src="producto.image"
                />
                <img
                  v-if="producto.image === null"
                  style="margin-top: 0px; width: 100%"
                  src="../../assets/default.png"
                />
              </sui-segment>
              <sui-segment><b>Nombre:</b> {{ producto.name }}</sui-segment>
              <sui-segment
                ><b>Precio:</b> {{ producto.retailPrice }}</sui-segment
              >
              <sui-segment
                ><b>Contenido neto:</b> {{ producto.netContent }}</sui-segment
              >
              <sui-segment><b>Marca:</b> {{ producto.brand.name }}</sui-segment>
              <sui-segment
                ><b>Categoría:</b> {{ producto.category.name }}</sui-segment
              >
            </sui-segments>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="modalProduct" type="button">
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
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";
import api from "../../util/api";
import {
  required,
  minValue,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { storage } from "../../firebase";

const ref = storage.ref();

Vue.use(Particles);
export default {
  name: "DetallesPaquete",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  components: { fondo, cabecera },
  computed: {
    getSugerido() {
      let sugerido = 0;
      for (let d of this.detalles) {
        sugerido = sugerido + d.product.retailPrice * d.quantityPackage * 0.95;
      }
      return "Precio sugerido $" + sugerido;
    },
    getSugeridoE() {
      let sugerido = 0;
      for (let d of this.detallesE) {
        sugerido = sugerido + d.product.retailPrice * d.quantityPackage * 0.95;
      }
      return "Precio sugerido $" + sugerido;
    },
    filteredProducts: function () {
      return this.detalles.filter((productos) => {
        return productos.product.name
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    },
    filteredProductEdit: function () {
      return this.detallesE.filter((productos) => {
        return productos.product.name
          .toLowerCase()
          .match(this.searchD.toLowerCase());
      });
    },
  },
  mounted() {
    this.startup();
  },
  data() {
    return {
      openP: false,
      nombre: "",
      precio: "",
      quantity: [],
      detalles: [],
      productos: [],
      package: {
        name: "",
        price: "",
      },
      producto: {
        name: "",
        retailPrice: 0,
        netContent: "",
        image: "",
        brand: {
          name: "",
        },
        category: {
          name: "",
        },
      },
      nombreE: "",
      precioE: "",
      detallesE: [],
      paqueteEdit: {
        id: 0,
        name: "",
        price: "",
        detalles: [],
      },
      idProducto: 0,
      search: "",
      searchD: "",
    };
  },
  methods: {
    startup() {
      if (this.id !== 0) {
        api.doGet("/package/get/" + this.id).then((response) => {
          this.nombreE = response.data.name;
          this.precioE = response.data.price;
        });
        api.doGet("/packageDetails/find/" + this.id).then((response) => {
          this.detallesE = response.data;
        });
      }
      api.doGet("/product/list/true").then((response) => {
        for (let p of response.data) {
          let producto = {
            text: "",
            key: 0,
            value: 0,
          };

          producto.text = p.name;
          producto.key = p.id;
          producto.value = p.id;

          this.productos.push(producto);
        }
      });
    },
    modalProduct() {
      this.openP = !this.openP;
    },
    addProductToDetails() {
      if (this.idProducto !== 0) {
        let agregar = true;

        for (let d of this.detalles) {
          if (d.product.id === this.idProducto) {
            this.$swal({
              title: "¡El producto ya se encuentra en el paquete!",
              icon: "warning",
            });
            agregar = false;
            break;
          }
        }

        if (agregar) {
          api
            .doGet("/product/get/" + this.idProducto)
            .then((response) => {
              let detalle = {
                quantityPackage: 1,
                product: response.data,
              };

              this.detalles.unshift(detalle);
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
            })
            .finally(() => (this.loading = false));
        }
      }
    },
    addProductToDetailsEdit() {
      if (this.idProducto !== 0) {
        let agregar = true;

        for (let d of this.detallesE) {
          if (d.product.id === this.idProducto) {
            this.$swal({
              title: "¡El producto ya se encuentra en el paquete!",
              icon: "warning",
            });
            agregar = false;
            break;
          }
        }

        if (agregar) {
          api
            .doGet("/product/get/" + this.idProducto)
            .then((response) => {
              let detalle = {
                quantityPackage: 1,
                product: response.data,
              };

              this.detallesE.unshift(detalle);
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
            })
            .finally(() => (this.loading = false));
        }
      }
    },
    dropDetalle(idProducto, nameProduct) {
      this.$swal({
        title:
          "¿Estás seguro que desea eliminar " +
          nameProduct +
          " de este paquete?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < this.detalles.length; i++) {
            if (this.detalles[i].product.id === idProducto) {
              this.detalles.splice(i, 1);
              this.$swal({
                title: "¡El producto se ha removido exitosamente!",
                icon: "success",
              });
              break;
            }
          }
        }
      });
    },
    dropDetalleEdit(idProducto, nameProduct) {
      this.$swal({
        title:
          "¿Estás seguro que desea eliminar " +
          nameProduct +
          " de este paquete?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < this.detallesE.length; i++) {
            if (this.detallesE[i].product.id === idProducto) {
              this.detallesE.splice(i, 1);
              this.$swal({
                title: "¡El producto se ha removido exitosamente!",
                icon: "success",
              });
              break;
            }
          }
        }
      });
    },
    getProduct(id) {
      api.doGet("/product/get/" + id).then((response) => {
        this.producto = response.data;
        if (this.producto.image !== null) {
          ref
            .child("imagenes/productos/" + this.producto.image)
            .getDownloadURL()
            .then((url) => {
              this.producto.image = url;
            });
        }
      });
    },
    register() {
      this.package = {
        name: this.nombre,
        price: this.precio,
      };
      api
        .doPost("/package/save", this.package)
        .then((response) => {
          let idPa = response.data.id;

          api
            .doPost("/packageDetails/save/many/" + idPa, this.detalles)
            .then(() => {
              this.$swal({
                title: "¡Paquete registrado exitosamente!",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.push("/admin/paquetes");
                } else {
                  this.$router.push("/admin/paquetes");
                }
              });
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
            })
            .finally(() => (this.loading = false));
          this.onReset();
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
        })
        .finally(() => (this.loading = false));
    },
    editar() {
      this.package = {
        id: this.id,
        name: this.nombreE,
        price: this.precioE,
      };
      api
        .doPost("/package/save", this.package)
        .then((response) => {
          let idPa = response.data.id;

          api
            .doPost("/packageDetails/save/many/edit/" + idPa, this.detallesE)
            .then(() => {
              this.$swal({
                title: "¡Paquete actualizado exitosamente!",
                icon: "success",
              });
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
            })
            .finally(() => (this.loading = false));
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
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    numberOnly() {
      let pattern = /[0-9.]/;
      let res = event.key.match(pattern);
      if (!res) {
        event.preventDefault();
        return false;
      }
    },
    letterOnly() {
      let pattern = /^[A-Za-záéíóúÁÉÍÓÚÑñ ]+$/;
      let res = event.key.match(pattern);
      if (!res) {
        event.preventDefault();
        return false;
      }
    },
  },
  validations: {
    nombre: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50),
    },
    precio: {
      required,
      minValue: minValue(1),
    },
    nombreE: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50),
    },
    precioE: {
      required,
      minValue: minValue(1),
    },
  },
};
</script>

<style scoped>
.my-label {
  display: block;
  margin: 0 0 0.28571429rem 0;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.92857143em;
  font-weight: 700;
  text-transform: none;
}

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
