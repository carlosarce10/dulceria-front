<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Productos</h3>
    </div>

    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="check icon" title="Productos Activos">
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
                placeholder="Buscar producto"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="resultTrue.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <div style="padding: 10px">
              <sui-card-group :items-per-row="3">
                <sui-card
                  v-for="resultTrue in filteredProducts"
                  :key="resultTrue.id"
                >
                  <sui-card-content class="pr">
                    <img
                      v-if="resultTrue.image !== null"
                      style="width: 100px; height: 100px; margin: 0px"
                      :src="resultTrue.url"
                    />
                    <img
                      v-if="resultTrue.image === null"
                      style="width: 100px; height: 100px; margin: 0px"
                      src="../../assets/default.png"
                    />
                  </sui-card-content>
                  <sui-card-content
                    style="
                      height: 200px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div>
                      <sui-card-header>{{ resultTrue.name }}</sui-card-header>
                      <sui-card-meta
                        >${{ resultTrue.retailPrice }} MXN</sui-card-meta
                      >
                      <sui-card-meta>{{ resultTrue.netContent }}</sui-card-meta>
                    </div>
                  </sui-card-content>
                  <sui-card-content>
                    <sui-button
                      positive
                      @click.native="toggleEdit(resultTrue.id)"
                      type="submit"
                      circular
                      style="background: #64b5f6"
                      >Editar</sui-button
                    >
                    <sui-button
                      negative
                      type="button"
                      circular
                      v-on:click="eliminar(resultTrue.id)"
                      >Eliminar</sui-button
                    >
                  </sui-card-content>
                </sui-card>
              </sui-card-group>
            </div>
          </sui-container>
        </div>
      </sui-tab-pane>

      <sui-tab-pane icon="ban icon" title="Productos Inactivos">
        <div class="table">
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
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="resultFalse.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <div style="padding: 10px" v-if="resultFalse.length > 0">
              <sui-card-group :items-per-row="3">
                <sui-card
                  v-for="resultTrue in filteredProductsDisabled"
                  :key="resultTrue.id"
                >
                  <sui-card-content class="pr">
                    <img
                      v-if="resultTrue.image !== null"
                      style="width: 100px; height: 100px; margin-top: 0px"
                      :src="resultTrue.url"
                    />
                    <img
                      v-if="resultTrue.image === null"
                      style="width: 100px; height: 100px; margin-top: 0px"
                      src="../../assets/default.png"
                    />
                  </sui-card-content>
                  <sui-card-content
                    style="
                      height: 200px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div>
                      <sui-card-header>{{ resultTrue.name }}</sui-card-header>
                      <sui-card-meta
                        >${{ resultTrue.retailPrice }} MXN</sui-card-meta
                      >
                      <sui-card-meta>{{ resultTrue.netContent }}</sui-card-meta>
                    </div>
                  </sui-card-content>
                  <sui-card-content>
                    <sui-button
                      positive
                      id="recuperar"
                      v-on:click="recuperar(resultTrue.id)"
                      type="submit"
                      circular
                      style="background: #64b5f6"
                      >Recuperar</sui-button
                    >
                  </sui-card-content>
                </sui-card>
              </sui-card-group>
            </div>
          </sui-container>
        </div>
      </sui-tab-pane>
    </sui-tab>

    <!-- REGISTRAR NUEVO PRODUCTO -->
    <div>
      <sui-modal class="modal-small" v-model="open">
        <sui-modal-header>Registrar producto</sui-modal-header>
        <sui-modal-content scrolling>
          <sui-form>
            <sui-form-field>
              <label>Nombre del producto:</label>
              <input
                v-model="$v.name.$model"
                :class="status($v.name)"
                @keypress="letterOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.name.required && $v.name.$dirty"
              >
                El nombre del prodcto no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.name.minLength && $v.name.maxLength"
              >
                El nombre del producto debe tener entre 3 y 50 carateres
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Contenido Neto:</label>
              <input
                v-model="$v.netContent.$model"
                :class="status($v.netContent)"
              />
              <div
                class="error errorMsg"
                v-if="!$v.netContent.required && $v.netContent.$dirty"
              >
                El contenido no debe estar en blanco
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Precio menudeo:</label>
              <input
                type="text"
                v-model="$v.retailPrice.$model"
                :class="status($v.retailPrice)"
                @keypress="numberOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.retailPrice.required && $v.retailPrice.$dirty"
              >
                El precio por menudeo no debe estar en blanco
              </div>
              <div class="error errorMsg" v-if="!$v.retailPrice.minValue">
                El precio por menudeo debe ser mayor a 0
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Precio mayoreo:</label>
              <input
                type="text"
                v-model="$v.wholesalePrice.$model"
                :class="status($v.wholesalePrice)"
                @keypress="numberOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.wholesalePrice.required && $v.wholesalePrice.$dirty"
              >
                El precio por mayoreo no debe estar en blanco
              </div>
              <div class="error errorMsg" v-if="!$v.wholesalePrice.minValue">
                El precio por mayoreo debe ser mayor a 0
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Marca del producto:</label>
              <sui-dropdown
                class="custom-search"
                :options="listaSelectBrand"
                placeholder="Marca"
                search
                selection
                v-model="$v.brand.$model"
                :class="status($v.brand)"
              />
              <div class="error errorMsg" v-if="!$v.brand.required">
                Debe seleccionar una marca
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Categoría del producto:</label>
              <sui-dropdown
                class="custom-search"
                :options="listaSelectCategory"
                placeholder="Categoría"
                search
                selection
                v-model="$v.category.$model"
                :class="status($v.category)"
              />
              <div class="error errorMsg" v-if="!$v.category.required">
                Debe seleccionar una categoria
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Imágen:</label>
              <input
                @change="onFileSelected($event)"
                type="file"
                accept="image/*"
              />
            </sui-form-field>
            <br />
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions style="margin-bottom: 3%">
          <sui-button
            negative
            @click.native="toggle"
            @click="onReset()"
            type="submit"
          >
            Cancelar
          </sui-button>
          <sui-button
            id="registrar"
            @click="register"
            positive
            @click.native="toggle"
            type="submit"
            :disabled="
              !(
                !$v.name.$invalid &&
                $v.name.$dirty &&
                !$v.netContent.$invalid &&
                $v.netContent.$dirty &&
                !$v.retailPrice.$invalid &&
                $v.retailPrice.$dirty &&
                !$v.wholesalePrice.$invalid &&
                $v.wholesalePrice.$dirty &&
                !$v.brand.$invalid &&
                !$v.category.$invalid
              )
            "
          >
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>

    <!-- EDITAR PRODUCTO -->
    <div>
      <sui-modal class="modal-small" v-model="openEdit">
        <sui-modal-header>Modificar producto</sui-modal-header>
        <sui-modal-content scrolling>
          <sui-form>
            <sui-form-field>
              <label>Nombre del producto:</label>
              <input
                v-model="$v.nameEdit.$model"
                :class="status($v.nameEdit)"
                @keypress="letterOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.nameEdit.required && $v.nameEdit.$dirty"
              >
                El nombre de la categoría no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.nameEdit.minLength && $v.nameEdit.maxLength"
              >
                El nombre de la categoría debe tener entre 3 y 50 carateres
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Contenido Neto:</label>
              <input
                v-model="$v.netContentEdit.$model"
                :class="status($v.netContentEdit)"
              />
              <div
                class="error errorMsg"
                v-if="!$v.netContentEdit.required && $v.netContentEdit.$dirty"
              >
                El contenido no debe estar en blanco
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Precio menudeo:</label>
              <input
                type="text"
                v-model="$v.retailPriceEdit.$model"
                :class="status($v.retailPriceEdit)"
                @keypress="numberOnly"
              />
              <div
                class="error errorMsg"
                v-if="!$v.retailPriceEdit.required && $v.retailPriceEdit.$dirty"
              >
                El precio por menudeo no debe estar en blanco
              </div>
              <div class="error errorMsg" v-if="!$v.retailPriceEdit.minValue">
                El precio por menudeo debe ser mayor a 0
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Precio mayoreo:</label>
              <input
                type="text"
                v-model="$v.wholesalePriceEdit.$model"
                :class="status($v.wholesalePriceEdit)"
                @keypress="numberOnly"
              />
              <div
                class="error errorMsg"
                v-if="
                  !$v.wholesalePriceEdit.required &&
                  $v.wholesalePriceEdit.$dirty
                "
              >
                El precio por mayoreo no debe estar en blanco
              </div>
              <div
                class="error errorMsg"
                v-if="!$v.wholesalePriceEdit.minValue"
              >
                El precio por mayoreo debe ser mayor a 0
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Marca del producto:</label>
              <sui-dropdown
                class="custom-search"
                :options="listaSelectBrand"
                placeholder="Marca"
                search
                selection
                v-model="$v.brandEdit.$model"
                :class="status($v.brandEdit)"
              />
              <div class="error errorMsg" v-if="!$v.brandEdit.required">
                Debe seleccionar una marca
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Categoría del producto:</label>
              <sui-dropdown
                class="custom-search"
                :options="listaSelectCategory"
                placeholder="Categoría"
                search
                selection
                v-model="$v.categoryEdit.$model"
                :class="status($v.categoryEdit)"
              />
              <div class="error errorMsg" v-if="!$v.categoryEdit.required">
                Debe seleccionar una Categoría
              </div>
            </sui-form-field>
            <sui-form-field>
              <label>Imágen:</label>
              <input
                @change="onFileSelectedEdit($event)"
                type="file"
                accept="image/*"
              />
            </sui-form-field>
            <br />
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
            :disabled="
              !(
                (!$v.nameEdit.$invalid && $v.nameEdit.$dirty) ||
                (!$v.netContentEdit.$invalid && $v.netContentEdit.$dirty) ||
                (!$v.retailPriceEdit.$invalid && $v.retailPriceEdit.$dirty) ||
                (!$v.wholesalePriceEdit.$invalid &&
                  $v.wholesalePriceEdit.$dirty &&
                  !$v.brandEdit.$invalid &&
                  !$v.categoryEdit.$invalid)
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
import { storage } from "../../firebase";
import {
  required,
  minLength,
  maxLength,
  minValue,
} from "vuelidate/lib/validators";

const ref = storage.ref();

Vue.use(Particles);
export default {
  name: "Admin",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      imagenes: [],
      imagen: null,
      imagenEdit: null,
      imagendesc: false,
      product: {
        name: "",
        netContent: "",
        retailPrice: "",
        wholesalePrice: "",
        image: null,
        brand: { id: 0 },
        category: { id: 0 },
      },
      productEdit: {
        id: 0,
        name: "",
        netContent: "",
        retailPrice: "",
        wholesalePrice: "",
        image: null,
        brand: { id: 0 },
        category: { id: 0 },
      },
      open: false,
      openEdit: false,
      resultTrue: null,
      resultsCategory: null,
      resultsBrand: null,
      resultFalse: null,
      listaSelectBrand: [],
      listaSelectCategory: [],
      id: null,
      search: "",
      searchD: "",
      name: "",
      netContent: "",
      retailPrice: "",
      wholesalePrice: "",
      brand: "",
      category: "",
      nameEdit: "",
      netContentEdit: "",
      retailPriceEdit: "",
      wholesalePriceEdit: "",
      brandEdit: "",
      categoryEdit: "",
    };
  },
  beforeMount() {
    this.getLists();
  },
  computed: {
    filteredProducts: function () {
      return this.resultTrue.filter((product) => {
        return product.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
    filteredProductsDisabled: function () {
      return this.resultFalse.filter((product) => {
        return product.name.toLowerCase().match(this.searchD.toLowerCase());
      });
    },
  },
  methods: {
    getLists() {
      api
        .doGet("/product/list/true")
        .then((response) => {
          let productos = [];
          for (let p of response.data) {
            p.url = "";
            productos.push(p);
          }
          this.resultTrue = productos;
          for (let p of this.resultTrue) {
            if (p.image !== null) {
              ref
                .child("imagenes/productos/" + p.image)
                .getDownloadURL()
                .then((url) => {
                  p.url = url;
                });
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
        .doGet("/product/list/false")
        .then((response) => {
          let productos = [];
          for (let p of response.data) {
            p.url = "";
            productos.push(p);
          }
          this.resultFalse = productos;
          for (let p of this.resultFalse) {
            if (p.image !== null) {
              ref
                .child("imagenes/productos/" + p.image)
                .getDownloadURL()
                .then((url) => {
                  p.url = url;
                });
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
        .doGet("/category/list/true")
        .then((resultsCategory) => {
          this.resultsCategory = resultsCategory.data;
          this.listaSelectCategory = [];
          for (let category of this.resultsCategory) {
            let c = { text: "", key: 0, value: 0 };
            c.text = category.name;
            c.key = category.id;
            c.value = category.id;
            this.listaSelectCategory.push(c);
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
        .doGet("/brand/list/true")
        .then((resultsBrand) => {
          this.resultsBrand = resultsBrand.data;
          this.listaSelectBrand = [];
          for (let brand of this.resultsBrand) {
            let b = { text: "", key: 0, value: 0 };
            b.text = brand.name;
            b.key = brand.id;
            b.value = brand.id;
            this.listaSelectBrand.push(b);
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
    toggleEdit(id) {
      api
        .doGet("/product/get/" + id)
        .then((response) => {
          this.productEdit = response.data;
          this.productEditId = response.data.id;
          this.nameEdit = response.data.name;
          this.netContentEdit = response.data.netContent;
          this.retailPriceEdit = response.data.retailPrice;
          this.wholesalePriceEdit = response.data.wholesalePrice;
          this.brandEdit = response.data.brand.id;
          this.categoryEdit = response.data.category.id;
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

      this.openEdit = !this.openEdit;
    },
    onFileSelected(event) {
      this.imagen = event.target.files[0];
    },
    onFileSelectedEdit(event) {
      this.imagenEdit = event.target.files[0];
    },
    subirImagen() {
      const refImg = ref.child("imagenes/productos/" + this.imagen.name);
      const metadata = { contentType: "img/jpeg" };
      refImg.put(this.imagen, metadata);
    },
    subirImagenEdit() {
      const refImg = ref.child("imagenes/productos/" + this.imagenEdit.name);
      const metadata = { contentType: "img/jpeg" };
      refImg.put(this.imagenEdit, metadata);
    },
    register() {
      let MyImagen = null
      if (this.imagen !== null) {
        this.subirImagen();
        MyImagen = this.imagen.name;
      }
      this.product = {
        name: this.name,
        netContent: this.netContent,
        retailPrice: this.retailPrice,
        wholesalePrice: this.wholesalePrice,
        image: MyImagen,
        brand: {
          id: this.brand,
        },
        category: {
          id: this.category,
        },
      };
      console.log("ESTE PRODUCTO ",this.product)
      api
        .doPost("/product/save", this.product)
        .then(() => {
          this.$swal({
            title: "¡Producto registrado exitosamente!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            } else {
              location.reload();
            }
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
            .doDelete("/product/del/" + id)
            .then(() => {
              this.$swal({
                title: "¡Producto eliminado exitosamente!",
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
      let MyImagen = null
      if (this.imagenEdit !== null) {
        this.subirImagenEdit();
        MyImagen = this.imagenEdit.name;
      }
      this.productEdit = {
        id: this.productEditId,
        name: this.nameEdit,
        netContent: this.netContentEdit,
        retailPrice: this.retailPriceEdit,
        wholesalePrice: this.wholesalePriceEdit,
        image: MyImagen,
        brand: {
          id: this.brandEdit,
        },
        category: {
          id: this.categoryEdit,
        },
      };
      api
        .doPost("product/save", this.productEdit)
        .then(() => {
          this.$swal({
            title: "¡Producto modificado exitosamente!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            } else {
              location.reload();
            }
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
    },
    recuperar(id) {
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
            .doPut("product/put/" + id)
            .then(() => {
              this.$swal({
                title: "¡Producto recuperado!",
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
    letterOnly() {
      let pattern = /^[A-Za-záéíóúÁÉÍÓÚÑñ ]+$/;
      let res = event.key.match(pattern);
      if (!res) {
        event.preventDefault();
        return false;
      }
    },
    numberOnly() {
      let pattern = /[0-9.]/;
      let res = event.key.match(pattern);
      if (!res) {
        event.preventDefault();
        return false;
      }
    },
    onReset() {
      this.name = "";
      this.netContent = "";
      this.retailPrice = "";
      this.wholesalePrice = "";
      this.brand = "";
      this.category = "";
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
    netContent: {
      required,
    },
    retailPrice: {
      required,
      minValue: minValue(1),
    },
    wholesalePrice: {
      required,
      minValue: minValue(1),
    },
    brand: {
      required,
    },
    category: {
      required,
    },
    nameEdit: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50),
    },
    netContentEdit: {
      required,
    },
    retailPriceEdit: {
      required,
      minValue: minValue(1),
    },
    wholesalePriceEdit: {
      required,
      minValue: minValue(1),
    },
    brandEdit: {
      required,
    },
    categoryEdit: {
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

.panel {
  width: 90%;
  margin-left: 5%;
}
.table {
  margin-top: 6%;
}
.search {
  margin-right: 2%;
  margin-bottom: 5px;
}
.cards {
  width: 90%;
}

.ui.card {
  height: 300px !important;
}
.pr img {
  width: 50%;
  height: auto;
}
</style>
