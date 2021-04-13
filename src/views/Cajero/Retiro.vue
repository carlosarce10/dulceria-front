<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Retiro</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="dollar sign icon" title="Retiro">
        <div class="table">
          <div class="ui grid container">
            <div class="four wide column">
              <div>
                <sui-card class="centered raised">
                  <img src="../../assets/logo.png" />
                  <sui-card-content>
                    <sui-card-header>Daniel</sui-card-header>
                  </sui-card-content>
                </sui-card>
                <sui-card class="centered raised">
                  <sui-card-content>
                    <sui-card-header>Ventas</sui-card-header>
                  </sui-card-content>
                  <sui-container text-align="center">
                    <sui-card-content extra>
                      <sui-container text-align="center">
                        <sui-button-group>
                          <sui-button class="btnModal3" @click.native="toggle" primary icon="eye" negative circular />
                        </sui-button-group>
                      </sui-container>
                    </sui-card-content>
                  </sui-container>
                </sui-card>
              </div>
            </div>
            <div class="twelve wide column">
              <sui-segments raised aligned="center" color="blue">
                <sui-segments horizontal>
                  <sui-segment class="segmento" attached>
                    <p>Ventas del día: $5,550</p>
                  </sui-segment>
                  <sui-segment class="segmento" attached>
                    <p>Monto inicial: $500</p>
                  </sui-segment>
                </sui-segments>
                <sui-segments horizontal>
                  <sui-segment class="segmento" attached>
                    <p>Monto actual: $859</p>
                  </sui-segment>
                  <sui-segment class="segmento" attached>
                    <p>Total retirado: $300</p>
                  </sui-segment>
                </sui-segments>
                <sui-segments horizontal >
                  <sui-segment class="segmento" attached>
                    <p>No. caja: #6</p>
                  </sui-segment>
                  <sui-segment class="segmento" attached>
                    <p><sui-input icon="dollar sign" placeholder="Monto a retirar"  fluid/></p>
                  </sui-segment>
                </sui-segments>
                <sui-segments horizontal >
                  <sui-segment class="segmento" attached>
                    <sui-button class="btnModal">Aceptar</sui-button>
                  </sui-segment>
                  <sui-segment class="segmento" attached>
                    <sui-button class="btnModal2">Cancelar</sui-button>
                  </sui-segment>
                </sui-segments>
              </sui-segments>
            </div>
          </div>
        </div>
        
      </sui-tab-pane>
    </sui-tab>
    <div>
      <sui-modal v-model="open">
        <sui-modal-header>Ventas</sui-modal-header>
        <sui-modal-content>
          <div class="ui search">
            <div class="ui icon input">
              <input class="prompt" type="text" placeholder="Buscar fecha" v-model="search" />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="ventas.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="ventas.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center">#</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Fecha</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Total</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">Detalles de venta</sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row v-for="(venta, item) in filteredSales" :key="venta.id">
                  <sui-table-header-cell text-align="center">{{ item + 1 }}</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">{{ venta.date }}</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">${{ venta.total }}</sui-table-header-cell>
                  <sui-table-header-cell text-align="center">
                    <sui-button style=" margin-left: auto; margin-right: auto;" class="btnModal" @click.native="getVenta(venta.id)" icon="eye" negative circular>
                      Ver
                    </sui-button>
                  </sui-table-header-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click.native="toggle" type="button">
            OK
          </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
    <div>
      <sui-modal v-model="open2"><!---->
        <sui-modal-header>Ventas</sui-modal-header>
        <sui-modal-content scrolling>
          <sui-grid :columns="3" divided>
            <sui-grid-row stretched>
              <sui-grid-column>
                <sui-segment color="violet">
                  <sui-grid>
                    <sui-grid-row>
                      <sui-grid-column :width="8">
                        <sui-segment color="blue" aligned="center" compact>
                          <sui-icon name="cube" size="large" color="blue" circular/>
                          <sui-divider/>
                          Producto
                          <sui-icon title="Precio menudeo" color="orange" name="circle"/>
                          <sui-icon title="Precio mayoreo" color="yellow" name="circle"  />
                        </sui-segment>
                      </sui-grid-column>
                      <sui-grid-column :width="8">
                        <sui-segment color="red" aligned="center" compact>
                          <sui-icon name="cubes" size="large" color="red" circular/>
                          <sui-divider/>
                          Paquete
                          <sui-icon title="Precio del paquete" color="red" name="circle"/>
                        </sui-segment>
                      </sui-grid-column>
                    </sui-grid-row>
                  </sui-grid>
                </sui-segment>
              </sui-grid-column>
              <sui-grid-column>
                <sui-segment color="green" aligned="center">
                  <b>Total: ${{ venta.total }} MXN</b>
                </sui-segment>
                <sui-segment color="teal" aligned="center">
                  <b>Cajero: {{ venta.user.username }}</b>
                </sui-segment>
              </sui-grid-column>
              <sui-grid-column>
                <sui-segment color="orange" aligned="center">
                  <b>No. Caja: #{{ this.id }}</b>
                </sui-segment>
                <sui-segment color="yellow" aligned="center">
                  <b>Fecha: {{ venta.date }}</b>
                </sui-segment>
              </sui-grid-column>
            </sui-grid-row>
          </sui-grid>
          <sui-table color="blue">
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell text-align="center">#</sui-table-header-cell>
                <sui-table-header-cell text-align="center">Producto/Paquete</sui-table-header-cell>
                <sui-table-header-cell text-align="center">Precio</sui-table-header-cell>
                <sui-table-header-cell text-align="center">Cantidad</sui-table-header-cell>
                <sui-table-header-cell text-align="center">Subtotal</sui-table-header-cell>
                <sui-table-header-cell text-align="center">Descuento</sui-table-header-cell>
                <sui-table-header-cell text-align="center">Monto descontado</sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row v-for="(vent, item) in this.venta.details" :key="vent.id"><!---->
                <sui-table-cell text-align="left">
                  {{ item + 1 }}
                </sui-table-cell>
                <sui-table-cell text-align="left" v-if="vent.packagee !== null"><!---->
                  <sui-icon color="red" name="cubes" circular />
                  {{ vent.packagee.name }}
                </sui-table-cell>
                <sui-table-cell text-align="left" v-if="vent.product !== null"><!---->
                  <sui-icon color="blue" name="cube" circular />
                  {{ vent.product.name }}
                </sui-table-cell>
                <sui-table-cell v-if="vent.product !== null && vent.quantity < 100" text-align="center"><!---->
                  <sui-icon title="Precio menudeo" color="orange" name="circle" />
                  ${{ vent.product.retailPrice }}
                </sui-table-cell>
                <sui-table-cell v-if="vent.product !== null && vent.quantity >= 100" text-align="center"><!---->
                  <sui-icon title="Precio mayoreo" color="yellow" name="circle"/>
                  ${{ vent.product.wholesalePrice }}
                </sui-table-cell>
                <sui-table-cell v-if="vent.packagee !== null" text-align="center"><!---->
                  <sui-icon title="Precio del paquete" color="red" name="circle" />
                  ${{ vent.packagee.price }}
                </sui-table-cell>
                <sui-table-cell text-align="center">
                  {{vent.quantity}}
                </sui-table-cell>
                <sui-table-cell text-align="center">
                  ${{ vent.subtotal }}
                </sui-table-cell>
                <sui-table-cell text-align="center">
                  {{ vent.discount }}%
                </sui-table-cell>
                <sui-table-cell text-align="center">
                  ${{ vent.discountAmount }}
                </sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click.native="toggle2"> OK </sui-button>
        </sui-modal-actions>
      </sui-modal>
    </div>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerCajero";
import Particles from "particles.vue";
import Vue from "vue";
//import api from "../../util/api";
import VueRouter from "vue-router";
import api from "../../util/api";

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "Retiro",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      open2: false,
      user: "",
      id: "",
      ventas: [],
      venta:{
        id: 0,
        date: {},
        total: 0,
        user: {},
        cashbox: {},
        details: [],
      },
      vent:[],
      search: "",
    };
  },
  beforeMount() {
    this.getUserAuthenticated();
  },mounted(){
    this.startUp();
  },
  computed:{
    filteredSales: function() {
      return this.ventas.filter((sale) => {
        return sale.date.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  methods: {
    startUp() {
      this.id = localStorage.getItem("idCashbox");
      api
        .doGet("/sales/list/cashbox/"+this.id)
        .then((response) => {
          console.log(response.data);
          this.ventas = response.data;
          for (let u of this.ventas) {
            u.date = u.date.split(".")[0];
            u.date = u.date.replace("T", " ");
            u.date = u.date + " hrs.";
          }
        })
        .catch((error) => {
          this.$swal(error.message);
        });
    },
    toggle() {
      this.open = !this.open;
    },toggle2() {
      this.open2 = !this.open2;
    },getVenta(id){
      this.open2 = !this.open2;
      api.doGet("/sales/get/"+id).then((response)=>{
        this.venta.details = response.data.saleDetails;
        console.log(this.venta.details);
        this.venta.date = response.data.sale.date;
        this.venta.date = this.venta.date.split(".")[0];
        this.venta.date = this.venta.date.replace("T", " ");
        this.venta.date = this.venta.date + " hrs.";
        this.venta.total = response.data.sale.total;
        this.venta.user.username = response.data.sale.user.username;
        this.venta.cashbox.cashboxNumber = response.data.sale.cashbox.cashboxNumber;
      }).catch((error) => {
          this.$swal(error.message);
      });
    },getUserAuthenticated() {
      let id = localStorage.getItem("idCashbox");
      api
        .doGet("/user/get/" + id)
        .then((response) => (this.user = response.data))
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
.search {
  margin-right: 2%;
  margin-bottom: 5px;
}
img {
  height: auto;
  width: 30%;
  margin-right: 5%;
}
.segmento {
  width: 50%
}
</style>