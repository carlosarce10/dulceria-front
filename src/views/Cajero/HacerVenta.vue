<template>
  <div class="area">
        <cabecera/>
        <br />
        <div class="funciones">
            <h3>Nueva venta</h3>
        </div>
        <sui-tab class="panel">
        <sui-tab-pane  icon="boxes" title="Venta">
            <sui-container>
            <sui-grid :columns="1">
                <sui-grid-row>
                    <sui-grid-column>
                        <sui-button @click="cancelarVenta()" icon="reply" floated="left" color="red"  content="Cancelar venta"/>
                        <sui-button v-if="detalles.length === 0" disabled icon="pencil" floated="right" color="blue"  content="Realizar venta"/>
                        <sui-button v-if="detalles.length > 0" @click="hacerVenta()" icon="pencil" floated="right" color="blue"  content="Realizar venta"/>
                    </sui-grid-column>
                </sui-grid-row>
                <sui-grid-row>
                    <sui-grid-column>
                        <sui-segments horizontal>
                            <sui-segment color="blue">Total: ${{getTotal}} MXN</sui-segment>
                            <sui-segment color="red">No. Productos: {{detalles.length}}</sui-segment>
                            <sui-segment color="orange">No. Caja: {{cashboxNumber}}</sui-segment>
                            <sui-segment color="teal">Cajero: {{cajero}}</sui-segment>
                        </sui-segments>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            </sui-container>
            <sui-divider hidden />
            <sui-divider hidden />
            <sui-container style="margin-top: 2%">
                <sui-grid :columns="1">
                    <sui-grid-row>
                        <sui-grid-column>
                            <sui-container>
                                <sui-grid>
                                    <sui-grid-row>
                                        <sui-grid-column :width="12">
                                            <div style="margin-top:8px; float:left; display:block;" class="ui icon input">
                                                <sui-dropdown
                                                :options="productos"
                                                placeholder="Productos"
                                                search
                                                selection
                                                v-model="idProducto"
                                                />
                                                
                                            </div>
                                            <div style="float:left;display:block;">
                                                <sui-button @click="addProductToSale()" circular color="blue" icon="plus"/>
                                            </div>
                                            <div style="margin-left: 8px;margin-top:8px; float:left; display:block;" class="ui icon input">
                                                <sui-dropdown
                                                :options="paquetes"
                                                placeholder="Paquetes"
                                                search
                                                selection
                                                v-model="idPaquete"
                                                />
                                            </div>
                                            <div style="float:left;display:block;">
                                                <sui-button @click="addPackageToSale()" circular color="red" icon="plus"/>
                                            </div>
                                        </sui-grid-column>
                                        <sui-grid-column :width="4">
                                            <sui-input style="float:right !important;" class="custom-search" icon="search" placeholder="Buscar..."/>
                                        </sui-grid-column>
                                    </sui-grid-row>
                                </sui-grid>
                            </sui-container>
                        </sui-grid-column>
                        <sui-grid-column>
                            <sui-divider hidden />
                            <sui-table color="blue">
                                <sui-table-header>
                                <sui-table-row>
                                    <sui-table-header-cell text-align="center">#</sui-table-header-cell>
                                    <sui-table-header-cell text-align="center">Producto/Paquete</sui-table-header-cell>
                                    <sui-table-header-cell text-align="center">Precio</sui-table-header-cell>
                                    <sui-table-header-cell text-align="center">Cantidad</sui-table-header-cell>
                                    <sui-table-header-cell text-align="center">Descuento</sui-table-header-cell>
                                    <sui-table-header-cell text-align="center">Subtotal</sui-table-header-cell>
                                    <sui-table-header-cell text-align="center">Eliminar</sui-table-header-cell>
                                </sui-table-row>
                                </sui-table-header>
                                <sui-table-body>
                                <sui-table-row v-for="(detalle, i) in detalles" :key="i">
                                    <sui-table-cell text-align="center">{{i+1}}</sui-table-cell>
                                    <!-- PAQUETE -->
                                    <sui-table-cell v-if="detalle.packagee !== null" text-align="left">
                                        <sui-icon name="cubes" color="red" circular />
                                        {{detalle.packagee.name}}
                                    </sui-table-cell>
                                    <sui-table-cell v-if="detalle.packagee !== null" text-align="center">
                                        <i title="Precio del paquete" class="red circle icon"></i>
                                        ${{detalle.packagee.price}}
                                    </sui-table-cell>
                                    <!-- PRODUCTO -->
                                    <sui-table-cell v-if="detalle.product !== null" text-align="left">
                                        <sui-icon name="cube" color="blue" circular />
                                        {{detalle.product.name}}
                                    </sui-table-cell>
                                    <sui-table-cell v-if="detalle.product !== null && detalle.quantity < 100" text-align="center">
                                        <i title="Precio menudeo" class="orange circle icon"></i>
                                        ${{detalle.product.retailPrice}}
                                    </sui-table-cell>
                                    <sui-table-cell v-if="detalle.product !== null && detalle.quantity >= 100" text-align="center">
                                        <i title="Precio mayoreo" class="yellow circle icon"></i>
                                        ${{detalle.product.wholesalePrice}}
                                    </sui-table-cell>
                                    <sui-table-cell text-align="center">
                                        <sui-input
                                            style="width: 6rem;"
                                            min="1"
                                            max="999"
                                            type="number"
                                            v-model="detalle.quantity"
                                        />
                                    </sui-table-cell>
                                    <sui-table-cell text-align="center">{{detalle.discount}}%</sui-table-cell>
                                    <sui-table-cell text-align="center">${{detalle.subtotal}}</sui-table-cell>
                                    <sui-table-cell style="display: flex;align-items: center;justify-content: center;" text-align="center">
                                        <sui-button
                                            negative
                                            circular
                                            icon="times"
                                            @click="dropDetalle(i, detalle)"
                                        />
                                    </sui-table-cell>
                                </sui-table-row>
                                </sui-table-body>
                            </sui-table>
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
            </sui-container>
        </sui-tab-pane>
        </sui-tab>
        <sui-divider hidden/>
        <sui-divider hidden/>
      <fondo/>
  </div>
</template>

<script>
import cabecera from "../../components/headerCajero";
import fondo from "../../components/fondo";
import api from "../../util/api";
export default {
    name:"HacerVenta",
    components:{cabecera, fondo},
    computed:{
        getTotal(){
            let total = 0;
            
            
            for(let detalle of this.detalles){
                
                
                let discountAmount = 0;
                let subtotal = 0;

                
                if(detalle.product !== null){
                    
                    let pricePerDiscount = 0;
                    if(detalle.quantity < 100){
                        pricePerDiscount = detalle.product.retailPrice*(detalle.discount*0.01);
                        subtotal = (detalle.product.retailPrice-pricePerDiscount)*detalle.quantity;
                    }else{
                        pricePerDiscount = detalle.product.wholesalePrice*(detalle.discount*0.01);
                        subtotal = (detalle.product.retailPrice-pricePerDiscount)*detalle.quantity;
                    }
                }

                if(detalle.packagee !== null){
                    subtotal = detalle.packagee.price*detalle.quantity;
                    discountAmount = 0;
                }

                detalle.discountAmount = discountAmount;
                detalle.subtotal = subtotal;
                total = total + subtotal;
            }
            
            

            return total;
        }
    },
    mounted(){
        this.startup();
    },
    data(){
        return{
            search: "",
            cajero: "",
            cashboxNumber: "",
            idProducto:null,
            idPaquete:null,
            detalles:[],
            productos: [],
            paquetes: [],
            seleccionado:null
        }
    },
    methods:{
        startup(){
            this.cajero = localStorage.getItem("username")===null?"":localStorage.getItem("username");
            this.cashboxNumber = localStorage.getItem("cashboxNumber")===null?"0":localStorage.getItem("cashboxNumber");

            api
                .doGet("/product/list/true")
                .then(response=>{
                    this.productos = [];
                    for(let producto of response.data){
                        let p = {key: 0, value: 0, text: ""};
                        p.key = producto.id;
                        p.value = producto.id;
                        p.text = producto.name;
                        this.productos.push(p);
                    }
                })

            api
                .doGet("/package/list/true")
                .then(response=>{
                    this.paquetes = [];
                    for(let paquete of response.data){
                        let p = {key: 0, value: 0, text: ""};
                        p.key = paquete.id;
                        p.value = paquete.id;
                        p.text = paquete.name;
                        this.paquetes.push(p);
                    }
                })
        },
        addProductToSale(){
            if(this.idProducto !== null){

                let agregar = true;

                for(let detalle of this.detalles){
                    if(detalle.product !== null && detalle.product.id === this.idProducto){
                        agregar = false;
                        this.$swal({
                            title: "¡Este producto ya se encuentra en la venta!",
                            icon: "warning"
                        });
                        break;
                    }
                }

                if(agregar){
                    api
                        .doGet("/product/get/"+this.idProducto)
                        .then(response=>{
                            let objProduct = response.data;
                            let detalle = {
                                packagee: null,
                                product: objProduct,
                                quantity: 1,
                                discount: 0,
                                discountAmount: 0,
                                subtotal: 0
                            };

                            api
                                .doGet("/discount/cashier/list")
                                .then(response=>{
                                    let map = response.data;
                                    let porcentajeDescuento = 0;
                                    for(let d of map.products){
                                        if(detalle.product.id === d.product.id){
                                            porcentajeDescuento = porcentajeDescuento + d.discount;
                                            break;
                                        }
                                    }
                                    for(let d of map.brands){
                                        if(detalle.product.brand.id === d.brand.id){
                                            porcentajeDescuento = porcentajeDescuento + d.discount;
                                            break;
                                        }
                                    }
                                    for(let d of map.categories){
                                        if(detalle.product.category.id === d.category.id){
                                            porcentajeDescuento = porcentajeDescuento + d.discount;
                                            break;
                                        }
                                    }
                                    detalle.discount = porcentajeDescuento;
                                })
                            this.detalles.unshift(detalle);
                        })
                }


            }
        },
        addPackageToSale(){
            if(this.idPaquete !== null){

                let agregar = true;

                for(let detalle of this.detalles){
                    if(detalle.packagee !== null && detalle.packagee.id === this.idPaquete){
                        agregar = false;
                        this.$swal({
                            title: "¡Este paquete ya se encuentra en la venta!",
                            icon: "warning"
                        });
                        break;
                    }
                }

                if(agregar){
                    api
                        .doGet("/package/get/"+this.idPaquete)
                        .then(response=>{
                            let objPackage = response.data;
                            let detalle = {
                                packagee: objPackage,
                                product: null,
                                quantity: 1,
                                discount: 0,
                                discountAmount: 0,
                                subtotal: 0
                            };

                            this.detalles.unshift(detalle);
                        })
                }


            }
        },
        dropDetalle(indice, detalle){
            let textRemovido = "";
            let title = "";
            if(detalle.product !== null){
                title = "¿Estás seguro que desea eliminar " + detalle.product.name + " de la venta?";
                textRemovido = "Producto";
            }
            if(detalle.packagee !== null){
                title = "¿Estás seguro que desea eliminar el paquete " + detalle.packagee.name + " de la venta?";
                textRemovido = "Paquete";
            }
            this.$swal({
                title: title,
                icon: "question",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.detalles.splice(indice, 1);
                    this.$swal({
                        title: textRemovido+" removido con éxito",
                        icon: "success",
                    });
                }
            });

        },
        cancelarVenta(){
            this.$swal({
                title: "¿Está seguro de cancelar la venta?",
                text: "(Todos los datos se limpiarán)",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push("/cajero/venta");
                }
            });
            
        }
    }
}
</script>

<style scoped>
.custom-search > input{
  border-radius: 500rem !important;
  margin-right: 0em !important;
  margin-left: 0.25em !important;
}
.panel {
  width: 90%;
  margin-left: 5%;
}
</style>