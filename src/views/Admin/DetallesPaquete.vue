<template>
  <div class="area">
      <cabecera />
      <br />
      <div class="funciones">
          <h3>Detalles del paquete</h3>
          <a class="item" href="/admin/paquetes">
            <sui-button floated="left" style="background: #64b5f6" negative content="Regresar" />
          </a>
      </div>
      <sui-tab class="panel">
          <sui-tab-pane v-if="id===0" icon="boxes" title="Productos">
              <sui-divider horizontal>PAQUETE</sui-divider>
            <sui-grid :columns="3">
                <sui-grid-row>
                    <sui-grid-column>
                        <label class="my-label">Nombre del paquete</label>
                        <sui-input type="text" v-model="nombre" />
                    </sui-grid-column>
                    <sui-grid-column>
                        <label class="my-label">Precio</label>
                        <sui-input type="text" :placeholder="getSugerido" v-model="precio"/>
                    </sui-grid-column>
                    <sui-grid-column>
                        <label style="color:transparent;" class="my-label">.</label>
                        <sui-button v-if="detalles.length === 0" style="background: #64b5f6" disabled negative>Registrar paquete</sui-button>
                        <a class="item" href="/admin/paquetes">
                        <sui-button v-if="detalles.length > 0" style="background: #64b5f6" negative @click="register()" >Registrar paquete</sui-button>
                        </a>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-divider hidden/>
            <sui-divider horizontal>PRODUCTOS</sui-divider>
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
                                <label style="color:transparent;" class="my-label">.</label>
                                <sui-button style="float:left;background-color:#64b5f6" negative circular @click="addProductToDetails()" icon="plus"/>
                            </sui-grid-column>
                            <sui-grid-column>
                                <label style="color:transparent;" class="my-label">.</label>
                                <sui-input placeholder="Buscar..." class="c-radius" icon="search"/>
                            </sui-grid-column>
                        </sui-grid-row>
                    </sui-grid>
                <sui-table color="blue">
                    <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell text-align="center">#</sui-table-header-cell>
                        <sui-table-header-cell text-align="center">Nombre</sui-table-header-cell>
                        <sui-table-header-cell text-align="center">Precio</sui-table-header-cell>
                        <sui-table-header-cell text-align="center">Cantidad</sui-table-header-cell>
                        <sui-table-header-cell text-align="center">Acciones</sui-table-header-cell>
                    </sui-table-row>
                    </sui-table-header>
                    <sui-table-body>
                    <sui-table-row v-for="(d,i) in detalles" :key="d.id">
                        <sui-table-cell text-align="center">{{i+1}}</sui-table-cell>
                        <sui-table-cell text-align="center">{{d.product.name}}</sui-table-cell>
                        <sui-table-cell text-align="center">${{d.product.retailPrice}}</sui-table-cell>
                        <sui-table-cell  text-align="center">
                            <sui-input style="width: 6rem;" min="1" max="99" type="number" v-model="detalles[i].quantityPackage"/>
                        </sui-table-cell>
                        <sui-table-cell style="display: flex;align-items: center;justify-content: center;" text-align="center">
                            <sui-button style="background: #64b5f6" negative circular icon="eye" @click="getProduct(d.product.id)" @click.native="modalProduct()"/>
                            <sui-button negative circular icon="times" @click="dropDetalle(d.product.id, d.product.name)"/>
                        </sui-table-cell>
                    </sui-table-row>
                    </sui-table-body>
                </sui-table>
                </sui-container>
            
          </sui-tab-pane>
          <sui-tab-pane v-if="id!==0" icon="boxes" title="Productos">
              <sui-divider horizontal>PAQUETE</sui-divider>
            <sui-grid :columns="3">
                <sui-grid-row>
                    <sui-grid-column>
                        <label class="my-label">Nombre del paquete</label>
                        <sui-input type="text" v-model="paqueteEdit.name" />
                    </sui-grid-column>
                    <sui-grid-column>
                        <label class="my-label">Precio</label>
                        <sui-input type="text" :placeholder="getSugerido" v-model="paqueteEdit.price"/>
                    </sui-grid-column>
                    <sui-grid-column>
                        <label style="color:transparent;" class="my-label">.</label>
                        <sui-button v-if="paqueteEdit.detalles.length === 0" style="background: #64b5f6" disabled negative>Editar paquete</sui-button>
                        <a class="item" href="/admin/paquetes">
                        <sui-button v-if="paqueteEdit.detalles.length > 0" style="background: #64b5f6" negative @click="editar()" >Editar paquete</sui-button>
                        </a>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-divider hidden/>
            <sui-divider horizontal>PRODUCTOS</sui-divider>
                <sui-container  style="margin-top: 2%">
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
                                <label style="color:transparent;" class="my-label">.</label>
                                <sui-button style="float:left;background-color:#64b5f6" negative circular @click="addProductToDetailsEdit()" icon="plus"/>
                            </sui-grid-column>
                            <sui-grid-column>
                                <label style="color:transparent;" class="my-label">.</label>
                                <sui-input placeholder="Buscar..." class="c-radius" icon="search"/>
                            </sui-grid-column>
                        </sui-grid-row>
                    </sui-grid>
                <sui-table color="blue">
                    <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell text-align="center">#</sui-table-header-cell>
                        <sui-table-header-cell text-align="center">Nombre</sui-table-header-cell>
                        <sui-table-header-cell text-align="center">Precio</sui-table-header-cell>
                        <sui-table-header-cell text-align="center">Cantidad</sui-table-header-cell>
                        <sui-table-header-cell text-align="center">Acciones</sui-table-header-cell>
                    </sui-table-row>
                    </sui-table-header>
                    <sui-table-body>
                    <sui-table-row v-for="(d,i) in paqueteEdit.detalles" :key="d.id">
                        <sui-table-cell text-align="center">{{i+1}}</sui-table-cell>
                        <sui-table-cell text-align="center">{{d.product.name}}</sui-table-cell>
                        <sui-table-cell text-align="center">${{d.product.retailPrice}}</sui-table-cell>
                        <sui-table-cell  text-align="center">
                            <sui-input style="width: 6rem;" min="1" max="99" type="number" v-model="d.quantityPackage"/>
                        </sui-table-cell>
                        <sui-table-cell style="display: flex;align-items: center;justify-content: center;" text-align="center">
                            <sui-button style="background: #64b5f6" negative circular icon="eye" @click="getProduct(d.product.id)" @click.native="modalProduct()"/>
                            <sui-button negative circular icon="times" @click="dropDetalleEdit(d.product.id, d.product.name,d.id)"/>
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
                    <img style="margin-top: 0px;width: 100%;" src="https://mk0lanoticiapwmx1x6a.kinstacdn.com/wp-content/uploads/2019/11/dulce-adiccion.jpeg"/>
                </sui-segment>
                <sui-segment><b>Nombre:</b> {{producto.name}}</sui-segment>
                <sui-segment><b>Precio:</b> {{producto.retailPrice}}</sui-segment>
                <sui-segment><b>Contenido neto:</b> {{producto.netContent}}</sui-segment>
                <sui-segment><b>Marca:</b> {{producto.brand.name}}</sui-segment>
                <sui-segment><b>Categoría:</b> {{producto.category.name}}</sui-segment>
              </sui-segments>
            </sui-form-field>
          </sui-form>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button
            positive
            @click.native="modalProduct"
            type="button"
          >
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
      <br><br><br>
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
    name:"DetallesPaquete",
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    components:{fondo,cabecera},
    computed:{
        getSugerido(){
            let sugerido = 0;
            for(let d of this.detalles){
                sugerido = sugerido + (d.product.retailPrice*d.quantityPackage);
            }
            return "Precio sugerido $"+sugerido;
        }
    },
    mounted(){
        this.startup();
    },
    data(){
        return{
            openP: false,
            nombre:"",
            precio:"",
            quantity: [],
            detalles: [],
            productos: [],
            package:{
                name:"",
                price:""
            },
            producto:{
                name:"",
                retailPrice:0,
                netContent:"",
                brand: {
                    name: ""
                },
                category: {
                    name: ""
                }
            },
            paqueteEdit:{
                id:0,
                name:"",
                price:"",
                detalles: []
            },
            idProducto: 0
        }
    },
    methods:{
        startup(){
            if(this.id !== 0){
                api.doGet("/package/get/"+this.id).then(response=>{
                    this.paqueteEdit.id = response.data.id;
                    this.paqueteEdit.name = response.data.name;
                    this.paqueteEdit.price = response.data.price;    
                })
                api.doGet("/packageDetails/find/"+this.id).then(response=>{
                    this.paqueteEdit.detalles = response.data;
                })
            }
            api
                .doGet("/product/list/true").then(response=>{
                    for(let p of response.data){
                        let producto = {
                            text: "",
                            key: 0,
                            value: 0
                        };

                        producto.text = p.name;
                        producto.key = p.id;
                        producto.value = p.id;

                        this.productos.push(producto);
                    }
                })
            
        },
        modalProduct(){
            this.openP = !this.openP;
        },
        addProductToDetails(){
            console.log(this.idProducto);
            if(this.idProducto !== 0){

                let agregar = true;

                for(let d of this.detalles){
                    if(d.product.id === this.idProducto){
                        this.$swal({
                            title: "¡El producto ya se encuentra en el paquete!",
                            icon: "warning"
                        });
                        agregar = false;
                        break;
                    } 
                }

                if(agregar){
                    api
                        .doGet("/product/get/"+this.idProducto)
                        .then(response=>{
                            let detalle = {
                                quantityPackage: 1,
                                product: response.data
                            };
                            
                            this.detalles.unshift(detalle);
                        }).catch((error) => console.log(error)).finally(() => (this.loading = false));
                }
            }
        },addProductToDetailsEdit(){
            console.log(this.idProducto);
            if(this.idProducto !== 0){

                let agregar = true;

                for(let d of this.paqueteEdit.detalles){
                    if(d.product.id === this.idProducto){
                        this.$swal({
                            title: "¡El producto ya se encuentra en el paquete!",
                            icon: "warning"
                        });
                        agregar = false;
                        break;
                    } 
                }

                if(agregar){
                    api
                        .doGet("/product/get/"+this.idProducto)
                        .then(response=>{
                            let detalle = {
                                quantityPackage: 1,
                                product: response.data
                            };
                            
                            this.paqueteEdit.detalles.unshift(detalle);
                        }).catch((error) => console.log(error)).finally(() => (this.loading = false));
                }
            }
        },
        dropDetalle(idProducto, nameProduct){
            this.$swal({
                title: "¿Estás seguro que desea eliminar "+nameProduct+" de este paquete?",
                icon: "question",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
                reverseButtons: true
            }).then(result=>{
                if(result.isConfirmed){
                    for(let i = 0; i<this.detalles.length; i++){
                        if(this.detalles[i].product.id === idProducto){
                            this.detalles.splice(i, 1);
                            this.$swal({
                                title: "¡El producto se ha removido exitosamente!",
                                icon: "success"
                            });
                            break;
                        }
                    }
                }
            });


        },dropDetalleEdit(idProducto, nameProduct,id){
            this.$swal({
                title: "¿Estás seguro que desea eliminar "+nameProduct+" de este paquete?",
                icon: "question",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
                reverseButtons: true
            }).then(result=>{
                if(result.isConfirmed){
                    console.log("ID: "+id+", Producto: "+idProducto+", Detalle: "+this.paqueteEdit.detalles[0].id);
                    //this.paqueteEdit.detalles.splice(idProducto,1);
                    api.doDelete("/packageDetails/del/"+id).then((response) => {
                        this.$swal({
                                title: "¡El producto se ha removido exitosamente!",
                                icon: "success"
                            });
                        console.log(response);
                    }).catch((error) => console.log(error)).finally(() => (this.loading = false));
                    
                }
            });


        },
        getProduct(id){
            api
                .doGet("/product/get/"+id)
                .then(response=>{
                    this.producto = response.data;
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
                    console.log(response.data.id);

                    api
                        .doPost("/packageDetails/save/many/"+idPa,this.detalles)
                        .then((response) => {
                            this.$swal({
                                title: "¡Paquete registrado exitosamente!",
                                icon: "success",
                            });
                            console.log(response);
                        })
                        .catch((error) => console.log(error.response)).finally(() => (this.loading = false));
                    this.onReset();
                    console.log(response);
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loading = false));
        },
        editar(){
            this.package = {
                name: this.nombre,
                price: this.precio,
            };
            api
                .doPost("/package/save", this.paqueteEdit)
                .then((response) => {
                    let idPa = response.data.id;
                    console.log(response.data.id);
                    
                    api
                        .doPost("/packageDetails/save/many/"+idPa,this.paqueteEdit.detalles)
                        .then((response) => {
                            this.$swal({
                                title: "¡Paquete actualizado exitosamente!",
                                icon: "success",
                            });
                            console.log(response);
                        })
                        .catch((error) => console.log(error.response)).finally(() => (this.loading = false));
                    this.onReset();
                    console.log(response);
                })
                .catch((error) => console.log(error));
        }
    }
}
</script>

<style scoped>

.my-label{
    display: block;
    margin: 0 0 .28571429rem 0;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
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