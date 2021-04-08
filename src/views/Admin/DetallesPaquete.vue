<template>
  <div class="area">
      <cabecera />
      <br />
      <div class="funciones">
          <h3>Detalles del paquete</h3>
      </div>
      <sui-tab class="panel">
          <sui-tab-pane icon="boxes" title="Productos">
              <sui-divider horizontal>PAQUETE</sui-divider>
            <sui-grid :columns="3">
                <sui-grid-row>
                    <sui-grid-column>
                        <label class="my-label">Nombre del paquete</label>
                        <sui-input type="text" :value="nombre" />
                    </sui-grid-column>
                    <sui-grid-column>
                        <label class="my-label">Precio</label>
                        <sui-input type="text" :placeholder="sugerido" v-model="precio"/>
                    </sui-grid-column>
                    <sui-grid-column>
                        <label style="color:transparent;" class="my-label">.</label>
                        <sui-button v-if="detalles.length === 0" style="background: #64b5f6" disabled negative>Registrar paquete</sui-button>
                        <sui-button v-if="detalles.length > 0" style="background: #64b5f6" negative>Registrar paquete</sui-button>
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
                            <sui-input style="width: 6rem;" type="number" :value="d.quantityPackage"/>
                        </sui-table-cell>
                        <sui-table-cell style="display: flex;align-items: center;justify-content: center;" text-align="center">
                            <sui-button style="background: #64b5f6" negative circular icon="eye" @click.native="x()"/>
                            <sui-button negative circular icon="times" @click="x()"/>
                        </sui-table-cell>
                    </sui-table-row>
                    </sui-table-body>
                </sui-table>
                </sui-container>
            
          </sui-tab-pane>
      </sui-tab>
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
    mounted(){
        this.startup();
    },
    data(){
        return{
            sugerido:"Precio sugerido $",
            nombre:"",
            precio:0,
            detalles: [],
            productos: [],
            idProducto: 0
        }
    },
    methods:{
        startup(){
            if(this.id !== 0){
                api.doGet("/package/get/"+this.id).then(response=>{
                    this.nombre = response.data.name;
                    this.precio = response.data.price;    
                })
                api.doGet("/packageDetails/find/"+this.id).then(response=>{
                    this.detalles = response.data;
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
        addProductToDetails(){
            console.log(this.idProducto);
            if(this.idProducto !== 0){
                api
                    .doGet("/product/get/"+this.idProducto)
                    .then(response=>{
                        let detalle = {
                            quantityPackage: 1,
                            product: response.data
                        };
                        
                        this.detalles.unshift(detalle);
                    })
            }

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