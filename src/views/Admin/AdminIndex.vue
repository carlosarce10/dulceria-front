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
                      <img style="width:100px;height:100px;margin:0px" :src="resultTrue.url">
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
                    <img style="width:100px;height:100px;margin-top:0px" :src="resultTrue.url">
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

    <div>
      <sui-modal class="modal-small" v-model="open">
        <sui-modal-header>Registrar producto</sui-modal-header>
        <sui-modal-content scrolling>
          <sui-form>
            <sui-form-field>
              <label>Nombre del producto:</label>
              <input v-model="product.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Contenido Neto:</label>
              <input v-model="product.netContent" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio menudeo:</label>
              <input type="number" v-model="product.retailPrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio mayoreo:</label>
              <input type="number" v-model="product.wholesalePrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Marca del producto:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="product.brand.id"
              >
                <option
                  v-for="resultsBrand in resultsBrand"
                  :key="resultsBrand.id"
                  :value="resultsBrand.id"
                >
                  {{ resultsBrand.name }}
                </option>
              </select>
            </sui-form-field>
            <sui-form-field>
              <label>Categoría del producto:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="product.category.id"
              >
                <option
                  v-for="resultsCategory in resultsCategory"
                  :key="resultsCategory.id"
                  :value="resultsCategory.id"
                >
                  {{ resultsCategory.name }}
                </option>
              </select>
            </sui-form-field>
            <sui-form-field>
               <label>Imágen:</label>
              <input @change="onFileSelected($event)" type="file" accept="image/*" />
            </sui-form-field>
            <br>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions style="margin-bottom: 3%">
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
        <sui-modal-header>Modificar producto</sui-modal-header>
        <sui-modal-content scrolling>
          <sui-form>
            <sui-form-field>
              <label>Nombre del producto:</label>
              <input v-model="productEdit.name" />
            </sui-form-field>
            <sui-form-field>
              <label>Contenido Neto:</label>
              <input v-model="productEdit.netContent" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio menudeo:</label>
              <input type="number" v-model="productEdit.retailPrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Precio mayoreo:</label>
              <input type="number" v-model="productEdit.wholesalePrice" />
            </sui-form-field>
            <sui-form-field>
              <label>Marca del producto:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="productEdit.brand.id"
              >
                <option
                  v-for="resultsBrand in resultsBrand"
                  :key="resultsBrand.id"
                  :value="resultsBrand.id"
                >
                  {{ resultsBrand.name }}
                </option>
              </select>
            </sui-form-field>
            <sui-form-field>
              <label>Categoría del producto:</label>
              <select
                class="ui dropdown"
                ref="seleccionado"
                v-model="productEdit.category.id"
              >
                <option
                  v-for="resultsCategory in resultsCategory"
                  :key="resultsCategory.id"
                  :value="resultsCategory.id"
                >
                  {{ resultsCategory.name }}
                </option>
              </select>
            </sui-form-field>
            <sui-form-field>
               <label>Imágen:</label>
              <input @change="onFileSelectedEdit($event)" type="file" accept="image/*" />
            </sui-form-field>
            <br>
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
import { storage } from '../../firebase';

const ref = storage.ref()

Vue.use(Particles);
export default {
  name: "Admin",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      imagenes:[],
      imagen:null,
      imagenEdit:null,
      imagendesc:false,
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
        brand: { id: 0 },
        category: { id: 0 },
      },
      open: false,
      openEdit: false,
      resultTrue: null,
      resultsCategory: null,
      resultsBrand: null,
      resultFalse: null,
      id: null,
      search: "",
      searchD: "",
    };
  },
  beforeMount() {
    this.getLists();
  },
  computed: {
    filteredProducts: function() {
      return this.resultTrue.filter((product) => {
        return product.name.toLowerCase().match(this.search.toLowerCase());
      });
    },
    filteredProductsDisabled: function() {
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
          let productos = []
          for(let p of response.data){
            p.url = "/img/default.9fda67aa.png"
            productos.push(p)
          }
          this.resultTrue = productos;
          for(let p of this.resultTrue){
            if(p.image !== null){
              ref.child('imagenes/productos/'+p.image).getDownloadURL()
              .then((url)=>{
                p.url = url
              })
            }
          }
        })
        .catch((error) => console.log(error));
      api
        .doGet("/product/list/false")
        .then((response) => {
          let productos = []
          for(let p of response.data){
            p.url = "/img/default.9fda67aa.png"
            productos.push(p)
          }
          this.resultFalse = productos;
          for(let p of this.resultFalse){
            if(p.image !== null){
              ref.child('imagenes/productos/'+p.image).getDownloadURL()
              .then((url)=>{
                p.url = url
              })
            }
          }
        })
        .catch((error) => console.log(error));
      api
        .doGet("/category/list/true")
        .then(
          (resultsCategory) => (this.resultsCategory = resultsCategory.data)
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      api
        .doGet("/brand/list/true")
        .then((resultsBrand) => (this.resultsBrand = resultsBrand.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },

    toggle() {
      this.open = !this.open;
    },
    toggleEdit(id) {
      api
        .doGet("/product/get/" + id)
        .then((response) => {
          console.log(response);
          this.productEdit = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.openEdit = !this.openEdit;
    },
    onFileSelected(event) {
      this.imagen = event.target.files[0];
      console.log(this.imagen)
    },
    onFileSelectedEdit(event) {
      this.imagenEdit = event.target.files[0];
      console.log(this.imagenEdit)
    },
    subirImagen(){
      //referencia a donde subir
      const refImg = ref.child('imagenes/productos/'+this.imagen.name)
      const metadata = { contentType: 'img/jpeg' }
      refImg.put(this.imagen, metadata)
      .then( e=> console.log(e))
    },
    subirImagenEdit(){
      //referencia a donde subir
      const refImg = ref.child('imagenes/productos/'+this.imagenEdit.name)
      const metadata = { contentType: 'img/jpeg' }
      refImg.put(this.imagenEdit, metadata)
      .then( e=> console.log(e))
    },
    register() {
      if(this.imagen !== null){
        this.subirImagen()
        this.product.image = this.imagen.name
      }
      
      api
        .doPost("/product/save", this.product)
        .then((response) => {
          this.$swal({
            title: "¡Producto registrado exitosamente!",
            icon: "success",
          })/*.then( result => {
            if(result.isConfirmed){
              location.reload();
            }
          })*/;
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    eliminar(id) {
      console.log(id);
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
            .then((response) => {
              this.$swal({
                title: "¡Producto eliminado exitosamente!",
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
      if(this.imagenEdit !== null){
        this.subirImagenEdit()
        this.productEdit.image = this.imagenEdit.name
      }
      
      api
        .doPost("product/save", this.productEdit)
        .then((response) => {
          this.$swal({
            title: "¡Producto modificado exitosamente!",
            icon: "success",
          });
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
      //location.reload();
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
            .doPut("product/put/" + id)
            .then((response) => {
              this.$swal({
                title: "¡Producto recuperado!",
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
