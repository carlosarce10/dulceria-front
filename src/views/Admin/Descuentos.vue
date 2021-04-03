<template>
  <div>
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Descuentos</h3>
    </div>

    <sui-tab class="panel">
      <sui-tab-pane title="Productos">
        <div class="table">
          <div class="search">
            <div class="ui fluid category search">
              <div class="ui icon input">
                <div style="margin-right: 5%">
                  <sui-button
                    @click.native="modalDP()"
                    style="background: #64b5f6"
                    negative
                    circular
                    icon="plus"
                  />
                </div>
              </div>
            </div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-table color="blue">
              <sui-table-header>
                <sui-table-row>
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
                  v-for="descuento in descuentosProductos"
                  :key="descuento.id"
                >
                  <sui-table-cell text-align="center">
                    {{descuento.product.name}}
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{ descuento.discount }}%
                  </sui-table-cell>
                  <sui-table-cell text-align="center">
                    {{descuento.comments}}
                  </sui-table-cell>
                  
                  <sui-table-cell
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <sui-button
                      @click.native="modalDP(descuento.id)"
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
      <sui-tab-pane title="Marcas"></sui-tab-pane>
      <sui-tab-pane title="Categorías"></sui-tab-pane>
    </sui-tab>


    <!-- MODAL DE REGISTRO DE DESCUENTO PARA PRODUCTO -->

    <sui-modal class="modal-small" v-model="openP">
      <sui-modal-header>Producto - Registrar descuento</sui-modal-header>
      <sui-modal-content>
        <sui-form>
          <sui-form-field>
            <label>Producto:</label>
            <select class="ui dropdown" ref="seleccionado" v-model="discount.product.id">
              <option v-for="product in listProduct" :key="product.id" :value="product.id">
                {{product.name}}
              </option>
            </select>
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
        <sui-button negative @click.native="modalDP()" type="submit">
          Cancelar
        </sui-button>
        <sui-button id="registrar" @click="register()" positive @click.native="modalDP()" type="submit" >
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <sui-modal class="modal-small" v-model="openEdit">
      <sui-modal-header>Editar descuento</sui-modal-header>
      <sui-modal-content>
        <sui-form>
          <sui-form-field>
            <label>Cantidad del descuento:</label>
            <input type="number" v-model="discountEdit.discount" />
          </sui-form-field>
          <sui-form-field>
            <label>Comentarios:</label>
            <textarea v-model="discountEdit.comments"></textarea>
          </sui-form-field>
          <sui-form-field>
            <label>Producto:</label>
            <select class="ui dropdown"
              ref="seleccionado"
              v-model="discountEdit.product.id"
            >
              <option
                v-for="listProduct in listProduct"
                :key="listProduct.id"
                :value="listProduct.id"
              >
               xxxx
              </option>
            </select>
          </sui-form-field>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions style="margin-bottom: 3%">
        <sui-button negative @click.native="toggleEdit" type="submit">
          Cancelar
        </sui-button>
        <sui-button
          id="editar"
          @click="editar()"
          positive
          @click.native="toggleEdit"
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
import Swal from "sweetalert2";

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
        comments: "",
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
      descuentosCategorias:[],
      listCategory: [],
      listBrand: [],
      listProduct: [],
      listDiscounts: [],
      openP: false,
      openM: false,
      openC: false,
      openEdit: false,
    };
  },
  beforeMount() {
    this.getLists();
  },

  methods: {
    modalDP(){
      this.openP = !this.openP;
    },
    modalDM(){
      this.openM = !this.openM;
    },
    modalDC(){
      this.openC = !this.openC;
    },
    getLists() {
      api
        .doGet("/discount/list")
        .then((listDiscounts) => {
          this.listDiscounts = listDiscounts.data;
          for(var d of this.listDiscounts){
            if(d.product !== null){
              this.descuentosProductos.push(d);
            }
            if(d.brand !== null){
              this.descuentosMarcas.push(d);
            }
            if(d.category !== null){
              this.descuentosCategorias.push(d);
            }            
          }
        })
        .catch((error) => console.log(error));
      api
        .doGet("/category/list/true")
        .then((listCategory) => (this.listCategory = listCategory.data))
        .catch((error) => console.log(error));
      api
        .doGet("/brand/list/true")
        .then((listBrand) => (this.listBrand = listBrand.data))
        .catch((error) => console.log(error));
      api
        .doGet("/product/list/true")
        .then((listProduct) => (this.listProduct = listProduct.data))
        .catch((error) => console.log(error));
    },
    register() {
      console.log(this.discount);
      api
        .doPost("/discount/save", this.discount)
        .then((response) => {
          this.$swal("Producto registrado exitosamente!");
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    eliminar(id) {
      console.log(id);
      Swal.fire({
        title: "Estás seguro de eliminar este descuento?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("/discount/del/" + id)
            .then((response) => {
              Swal.fire("Descuento eliminado exitosamente!");
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
        .doPost("/discount/save", this.discountEdit)
        .then((response) => {
          this.$swal("Descuento modificado exitosamente!");
          console.log(response);
          this.getLists();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggle() {
      this.open = !this.open;
    },
    toggleEdit(id) {
      api
        .doGet("/discount/get/" + id)
        .then((response) => {
          console.log(response);
          this.discountEdit = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.openEdit = !this.openEdit;
    },
  },
};
</script>

<style>
.table {
  margin-top: 6%;
}
.search {
  margin-right: 2%;
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