<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Descuentos</h3>
    </div>

    <sui-tab class="panel">
      <sui-tab-pane icon="shopping basket icon" title="Productos">
        <div class="table">
          <div class="ui search">
            <sui-button
              @click.native="modalDP()"
              style="background: #64b5f6"
              negative
              circular
              icon="plus"
            />
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar por producto"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="descuentosProductos.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="descuentosProductos.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Producto</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Descuento</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Comentarios</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Acciones</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="(descuento, item) in filteredDiscountP"
                  :key="descuento.id"
                >
                  <sui-table-cell text-align="center">
                    {{ item + 1 }}
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.product.name }}
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.discount }}%
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.comments }}
                  </sui-table-cell>

                  <sui-table-cell
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <sui-button
                      @click.native="getEdit(descuento.id)"
                      id="editar"
                      style="background: #64b5f6"
                      negative
                      circular
                      icon="edit"
                    />
                    <sui-button
                      id="delete"
                      v-on:click="eliminar(descuento.id)"
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
      <sui-tab-pane icon="tags icon" title="Marcas">
        <div class="table">
          <div class="ui search">
            <sui-button
              @click.native="modalDM()"
              style="background: #64b5f6"
              negative
              circular
              icon="plus"
            />
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar por producto"
                v-model="searchM"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="descuentosMarcas.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="descuentosMarcas.length > 0" color="green">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Marca</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Descuento</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Comentarios</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Acciones</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="(descuento, item) in filteredDiscountM"
                  :key="descuento.id"
                >
                  <sui-table-cell text-align="center">
                    {{ item + 1 }}
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.brand.name }}
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.discount }}%
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.comments }}
                  </sui-table-cell>

                  <sui-table-cell
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <sui-button
                      @click.native="getEdit(descuento.id)"
                      id="editar"
                      style="background: #64b5f6"
                      negative
                      circular
                      icon="edit"
                    />
                    <sui-button
                      id="delete"
                      v-on:click="eliminar(descuento.id)"
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
      <sui-tab-pane icon="table icon" title="Categorías">
        <div class="table">
          <div class="ui search">
            <sui-button
              @click.native="modalDC()"
              style="background: #64b5f6"
              negative
              circular
              icon="plus"
            />
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar por producto"
                v-model="searchC"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="descuentosCategorias.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="descuentosCategorias.length > 0" color="orange">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Categoría</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Descuento</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Comentarios</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Acciones</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="(descuento, item) in filteredDiscountC"
                  :key="descuento.id"
                >
                  <sui-table-cell text-align="center">
                    {{ item + 1 }}
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.category.name }}
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.discount }}%
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.comments }}
                  </sui-table-cell>

                  <sui-table-cell
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <sui-button
                      @click.native="getEdit(descuento.id)"
                      id="editar"
                      style="background: #64b5f6"
                      negative
                      circular
                      icon="edit"
                    />
                    <sui-button
                      id="delete"
                      v-on:click="eliminar(descuento.id)"
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
    </sui-tab>

    <!-- MODAL DE REGISTRO DE DESCUENTO PARA PRODUCTO -->

    <sui-modal class="modal-small" v-model="openP">
      <sui-modal-header>Producto - Registrar descuento</sui-modal-header>
      <sui-modal-content>
        <sui-form>
          <sui-form-field>
            <label>Producto:</label>
            <sui-dropdown
              class="custom-search"
              :options="listSelectProduct"
              placeholder="Producto"
              search
              selection
              v-model="$v.product.$model"
              :class="status($v.product)"
            />
            <div class="error errorMsg" v-if="!$v.product.required">
              Debe seleccionar un producto
            </div>
          </sui-form-field>
          <sui-form-field>
            <label>Porcentaje del descuento %:</label>
            <input
              type="number"
              v-model="$v.discountP.$model"
              :class="status($v.discountP)"
            />
            <div
              class="error errorMsg"
              v-if="!$v.discountP.required && $v.discountP.$dirty"
            >
              El descuento no debe estar en blanco
            </div>
            <div class="error errorMsg" v-if="!$v.discountP.minValue">
              El descuento debe se mayor a 0
            </div>
          </sui-form-field>
          <sui-form-field>
            <label>Comentarios:</label>
            <textarea v-model="comments"></textarea>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions style="margin-bottom: 3%">
        <sui-button negative @click.native="modalDP()" type="submit">
          Cancelar
        </sui-button>
        <sui-button
          id="registrar"
          @click="registerDP()"
          positive
          @click.native="modalDP()"
          type="submit"
          :disabled="!(!$v.$invalid && $v.$dirty)"
        >
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <!-- MODAL DE REGISTRO DE DESCUENTO PARA MARCA -->

    <sui-modal class="modal-small" v-model="openM">
      <sui-modal-header>Marca - Registrar descuento</sui-modal-header>
      <sui-modal-content>
        <sui-form>
          <sui-form-field>
            <label>Marca:</label>
            <sui-dropdown
              class="custom-search"
              :options="listSelectBrand"
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
            <label>Porcentaje del descuento %:</label>
            <input
              type="number"
              v-model="$v.discountM.$model"
              :class="status($v.discountM)"
            />
            <div
              class="error errorMsg"
              v-if="!$v.discountM.required && $v.discountM.$dirty"
            >
              El descuento no debe estar en blanco
            </div>
            <div class="error errorMsg" v-if="!$v.discountM.minValue">
              El descuento debe se mayor a 0
            </div>
          </sui-form-field>
          <sui-form-field>
            <label>Comentarios:</label>
            <textarea v-model="discount.comments"></textarea>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions style="margin-bottom: 3%">
        <sui-button negative @click.native="modalDM()" type="submit">
          Cancelar
        </sui-button>
        <sui-button
          id="registrar"
          @click="registerDM()"
          positive
          @click.native="modalDM()"
          type="submit"
        >
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <!-- MODAL DE REGISTRO DE DESCUENTO PARA CATEGORIA -->

    <sui-modal class="modal-small" v-model="openC">
      <sui-modal-header>Categoría - Registrar descuento</sui-modal-header>
      <sui-modal-content>
        <sui-form>
          <sui-form-field>
            <label>Categoría:</label>

            <sui-dropdown
              class="custom-search"
              :options="listSelectCategory"
              placeholder="Categoría"
              search
              selection
              v-model="discount.category.id"
            />
          </sui-form-field>
          <sui-form-field>
            <label>Porcentaje del descuento %:</label>
            <input type="number" v-model="discount.discount" />
          </sui-form-field>
          <sui-form-field>
            <label>Comentarios:</label>
            <textarea v-model="discount.comments"></textarea>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions style="margin-bottom: 3%">
        <sui-button negative @click.native="modalDC()" type="submit">
          Cancelar
        </sui-button>
        <sui-button
          id="registrar"
          @click="registerDC()"
          positive
          @click.native="modalDC()"
          type="submit"
        >
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <sui-modal class="modal-small" v-model="openEdit">
      <sui-modal-header>Editar descuento</sui-modal-header>
      <sui-modal-content>
        <sui-form>
          <sui-form-field v-if="discountEdit.product !== null">
            <sui-segment color="blue">
              <label>Producto: {{ discountEdit.product.name }}</label>
            </sui-segment>
          </sui-form-field>
          <sui-form-field v-if="discountEdit.brand !== null">
            <sui-segment color="green">
              <label>Marca: {{ discountEdit.brand.name }}</label>
            </sui-segment>
          </sui-form-field>
          <sui-form-field v-if="discountEdit.category !== null">
            <sui-segment color="orange">
              <label>Categoría: {{ discountEdit.category.name }}</label>
            </sui-segment>
          </sui-form-field>
          <sui-form-field>
            <label>Cantidad del descuento:</label>
            <input
              type="number"
              v-model="$v.discountP.$model"
              :class="status($v.discountP)"
            />
            <div
              class="error errorMsg"
              v-if="!$v.discountP.required && $v.discountP.$dirty"
            >
              El descuento no debe estar en blanco
            </div>
            <div class="error errorMsg" v-if="!$v.discountP.minValue">
              El descuento debe se mayor a 0
            </div>
          </sui-form-field>
          <sui-form-field>
            <label>Comentarios:</label>
            <textarea v-model="discountEdit.comments"></textarea>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions style="margin-bottom: 3%">
        <sui-button negative @click.native="toggleEdit()" type="submit">
          Cancelar
        </sui-button>
        <sui-button
          id="editar"
          @click="editar()"
          positive
          @click.native="toggleEdit()"
          type="submit"
        >
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";
import api from "../../util/api";
import { required, minValue } from "vuelidate/lib/validators";

Vue.use(Particles);
export default {
  name: "Descuentos",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      discount: {
        discount: "",
        comments: null,
        brand: { id: 0 },
        category: { id: 0 },
        product: { id: 0 },
      },
      discountEdit: {
        id: 0,
        discount: "",
        comments: "",
        brand: { id: 0 },
        category: { id: 0 },
        product: { id: 0 },
      },
      descuentosProductos: [],
      descuentosMarcas: [],
      descuentosCategorias: [],
      listCategory: [],
      listBrand: [],
      listProduct: [],
      listDiscounts: [],
      listSelectProduct: [],
      listSelectBrand: [],
      listSelectCategory: [],
      openP: false,
      openM: false,
      openC: false,
      openEdit: false,
      search: "",
      searchM: "",
      searchC: "",
      discountP: "",
      discountM: "",
      discountC: "",
      comments: "",
      brand: "",
      category: "",
      product: "",
    };
  },
  beforeMount() {
    this.getLists();
  },
  computed: {
    filteredDiscountP: function () {
      return this.descuentosProductos.filter((discount) => {
        return discount.product.name
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    },
    filteredDiscountM: function () {
      return this.descuentosMarcas.filter((discount) => {
        console.log(discount.brand.name);
        return discount.brand.name
          .toLowerCase()
          .match(this.searchM.toLowerCase());
      });
    },
    filteredDiscountC: function () {
      return this.descuentosCategorias.filter((discount) => {
        return discount.category.name
          .toLowerCase()
          .match(this.searchC.toLowerCase());
      });
    },
  },
  methods: {
    modalDP() {
      this.openP = !this.openP;
    },
    modalDM() {
      this.openM = !this.openM;
    },
    modalDC() {
      this.openC = !this.openC;
    },
    getEdit(id) {
      api
        .doGet("/discount/get/" + id)
        .then((response) => {
          console.log(response);
          this.discountEdit = response.data;
          this.discountP = response.data.discount;
          this.toggleEdit();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLists() {
      api
        .doGet("/discount/list")
        .then((listDiscounts) => {
          this.descuentosProductos = [];
          this.descuentosMarcas = [];
          this.descuentosCategorias = [];
          this.listDiscounts = listDiscounts.data;
          for (var d of this.listDiscounts) {
            if (d.product !== null) {
              this.descuentosProductos.push(d);
            }
            if (d.brand !== null) {
              this.descuentosMarcas.push(d);
            }
            if (d.category !== null) {
              this.descuentosCategorias.push(d);
            }
          }
        })
        .catch((error) => console.log(error));
      api
        .doGet("/category/list/true")
        .then((listCategory) => {
          this.listCategory = listCategory.data;
          this.listSelectCategory = [];
          for (let category of this.listCategory) {
            let c = { text: "", key: 0, value: 0 };
            c.text = category.name;
            c.key = category.id;
            c.value = category.id;
            this.listSelectCategory.push(c);
          }
        })
        .catch((error) => console.log(error));
      api
        .doGet("/brand/list/true")
        .then((listBrand) => {
          this.listBrand = listBrand.data;
          this.listSelectBrand = [];
          for (let brand of this.listBrand) {
            let b = { text: "", key: 0, value: 0 };
            b.text = brand.name;
            b.key = brand.id;
            b.value = brand.id;
            this.listSelectBrand.push(b);
          }
        })
        .catch((error) => console.log(error));
      api
        .doGet("/product/list/true")
        .then((listProduct) => {
          this.listProduct = listProduct.data;
          this.listSelectProduct = [];
          for (let myproduct of this.listProduct) {
            let p = { text: "", key: 0, value: 0 };

            p.text = myproduct.name;
            p.key = myproduct.id;
            p.value = myproduct.id;

            this.listSelectProduct.push(p);
          }
        })
        .catch((error) => console.log(error));
    },
    registerDP() {
      this.discount = {
        product: {
          id: this.product,
        },
        discount: this.discountP,
        comments: this.comments,
      };
      console.log(this.discount);
      let obj = {};
      Object.assign(obj, this.discount);
      obj.brand = null;
      obj.category = null;
      console.log("I hopeP: ", obj);
      api
        .doGet("/discount/has/product/" + this.discount.product.id)
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.$swal({
              title: "¡Este producto ya tiene un descuento!",
              icon: "warning",
            });
          } else {
            api
              .doPost("/discount/save", obj)
              .then((res) => {
                console.log(res);
                this.$swal({
                  title: "¡El descuento ha sido registrado exitosamente!",
                  icon: "success",
                });
                this.getLists();
                this.discount = {
                  discount: "",
                  comments: null,
                  brand: { id: 0 },
                  category: { id: 0 },
                  product: { id: 0 },
                };
              })
              .catch((e) => {
                this.$swal({
                  title: "Ha ocurrido un error en el servidor.",
                  text:
                    e.message +
                    " Por favor conacte, a su operador para más detalles.",
                  icon: "error",
                });
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    registerDM() {
      console.log(this.discount);
      let obj = {};
      Object.assign(obj, this.discount);
      obj.product = null;
      obj.category = null;
      console.log("I hopeM: ", obj);
      api
        .doGet("/discount/has/brand/" + this.discount.brand.id)
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.$swal({
              title: "¡Esta marca ya tiene un descuento!",
              icon: "warning",
            });
          } else {
            api
              .doPost("/discount/save", obj)
              .then((res) => {
                console.log(res);
                this.$swal({
                  title: "¡El descuento ha sido registrado exitosamente!",
                  icon: "success",
                });
                this.getLists();
                this.discount = {
                  discount: "",
                  comments: null,
                  brand: { id: 0 },
                  category: { id: 0 },
                  product: { id: 0 },
                };
              })
              .catch((e) => {
                console.log(e);
                this.$swal({
                  title: "Ha ocurrido un error en el servidor.",
                  text:
                    e.message +
                    " Por favor, conacte a su operador para más detalles.",
                  icon: "error",
                });
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    registerDC() {
      console.log(this.discount);
      let obj = {};
      Object.assign(obj, this.discount);
      obj.brand = null;
      obj.product = null;
      console.log("I hopeC: ", obj);
      api
        .doGet("/discount/has/category/" + this.discount.category.id)
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.$swal({
              title: "¡Esta categoría ya tiene un descuento!",
              icon: "warning",
            });
          } else {
            api
              .doPost("/discount/save", obj)
              .then((res) => {
                console.log(res);
                this.$swal({
                  title: "¡El descuento ha sido registrado exitosamente!",
                  icon: "success",
                });
                this.getLists();
                this.discount = {
                  discount: "",
                  comments: null,
                  brand: { id: 0 },
                  category: { id: 0 },
                  product: { id: 0 },
                };
              })
              .catch((e) => {
                this.$swal({
                  title: "Ha ocurrido un error en el servidor.",
                  text:
                    e.message +
                    " Por favor, conacte a su operador para más detalles.",
                  icon: "error",
                });
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    eliminar(id) {
      console.log(id);
      this.$swal({
        title: "¿Estás seguro de eliminar este descuento?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("/discount/del/" + id)
            .then((response) => {
              this.$swal({
                title: "¡Descuento eliminado exitosamente!",
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
    editar() {
      this.discountEdit = {
        discount: this.discountP,
      };
      api
        .doPost("/discount/save", this.discountEdit)
        .then((response) => {
          this.$swal({
            title: "¡Descuento modificado exitosamente!",
            icon: "success",
          });
          console.log(response);
          this.getLists();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleEdit() {
      this.openEdit = !this.openEdit;
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
  },
  validations: {
    discountP: { required, minValue: minValue(1) },
    discountM: { required, minValue: minValue(1) },
    product: { required },
    brand: { required },
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
  margin-bottom: 0.5%;
}
.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>
