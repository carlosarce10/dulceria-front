<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Ventas</h3>
    </div>

    <sui-tab class="panel">
      <sui-tab-pane icon="chart bar outline icon" title="Todas las ventas">
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
            <sui-segment basic v-if="ventas.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="ventas.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >No. caja</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Fecha</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Total</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Cajero</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Detalles de venta</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row v-for="venta in ventas" :key="venta.id">
                  <sui-table-cell text-align="center">{{
                    venta.cashbox.cashboxNumber
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    venta.date
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center"
                    >${{ venta.total }}</sui-table-cell
                  >
                  <sui-table-cell text-align="center">{{
                    venta.user.username
                  }}</sui-table-cell>
                  <sui-table-cell
                    ><sui-button
                      style="
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                      "
                      class="btnModal"
                      @click.native="getVenta(venta.id)"
                      >Ver</sui-button
                    ></sui-table-cell
                  >
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
          <div>
            <sui-modal v-model="open">
              <sui-modal-header>Detalle de venta</sui-modal-header>
              <sui-modal-content scrolling>
                <sui-grid :columns="3" divided>
                  <sui-grid-row stretched>
                    <sui-grid-column>
                      <sui-segment color="violet">
                        <sui-grid>
                          <sui-grid-row>
                            <sui-grid-column :width="8">
                              <sui-segment
                                color="blue"
                                aligned="center"
                                compact
                              >
                                <sui-icon
                                  name="cube"
                                  size="large"
                                  color="blue"
                                  circular
                                />
                                <sui-divider />
                                Producto
                                <sui-icon
                                  title="Precio menudeo"
                                  color="orange"
                                  name="circle"
                                />
                                <sui-icon
                                  title="Precio mayoreo"
                                  color="yellow"
                                  name="circle"
                                />
                              </sui-segment>
                            </sui-grid-column>
                            <sui-grid-column :width="8">
                              <sui-segment color="red" aligned="center" compact>
                                <sui-icon
                                  name="cubes"
                                  size="large"
                                  color="red"
                                  circular
                                />
                                <sui-divider />
                                Paquete
                                <sui-icon
                                  title="Precio del paquete"
                                  color="red"
                                  name="circle"
                                />
                              </sui-segment>
                            </sui-grid-column>
                          </sui-grid-row>
                        </sui-grid>
                      </sui-segment>
                    </sui-grid-column>
                    <sui-grid-column>
                      <sui-segment color="green" aligned="center"
                        ><b>Total: ${{ venta.total }} MXN</b></sui-segment
                      >
                      <sui-segment color="teal" aligned="center"
                        ><b>Cajero: {{ venta.user.username }}</b></sui-segment
                      >
                    </sui-grid-column>
                    <sui-grid-column>
                      <sui-segment color="orange" aligned="center"
                        ><b
                          >No. Caja: #{{ venta.cashbox.cashboxNumber }}</b
                        ></sui-segment
                      >
                      <sui-segment color="yellow" aligned="center"
                        ><b>Fecha: {{ venta.date }}</b></sui-segment
                      >
                    </sui-grid-column>
                  </sui-grid-row>
                </sui-grid>

                <sui-table color="blue">
                  <sui-table-header>
                    <sui-table-row>
                      <sui-table-header-cell text-align="center"
                        >Producto/Paquete</sui-table-header-cell
                      >
                      <sui-table-header-cell text-align="center"
                        >Precio</sui-table-header-cell
                      >
                      <sui-table-header-cell text-align="center"
                        >Cantidad</sui-table-header-cell
                      >
                      <sui-table-header-cell text-align="center"
                        >Subtotal</sui-table-header-cell
                      >
                      <sui-table-header-cell text-align="center"
                        >Descuento</sui-table-header-cell
                      >
                      <sui-table-header-cell text-align="center"
                        >Monto descontado</sui-table-header-cell
                      >
                    </sui-table-row>
                  </sui-table-header>
                  <sui-table-body>
                    <sui-table-row
                      v-for="detail in venta.details"
                      :key="detail.id"
                    >
                      <sui-table-cell
                        v-if="detail.product !== null"
                        text-align="left"
                      >
                        <sui-icon color="blue" name="cube" circular />
                        {{ detail.product.name }}
                      </sui-table-cell>
                      <sui-table-cell
                        v-if="detail.product !== null && detail.quantity < 100"
                        text-align="center"
                      >
                        <sui-icon
                          title="Precio menudeo"
                          color="orange"
                          name="circle"
                        />
                        ${{ detail.product.retailPrice }}
                      </sui-table-cell>
                      <sui-table-cell
                        v-if="detail.product !== null && detail.quantity >= 100"
                        text-align="center"
                      >
                        <sui-icon
                          title="Precio mayoreo"
                          color="yellow"
                          name="circle"
                        />
                        ${{ detail.product.wholesalePrice }}
                      </sui-table-cell>
                      <sui-table-cell
                        v-if="detail.packagee !== null"
                        text-align="left"
                      >
                        <sui-icon color="red" name="cubes" circular />
                        {{ detail.packagee.name }}
                      </sui-table-cell>
                      <sui-table-cell
                        v-if="detail.packagee !== null"
                        text-align="center"
                      >
                        <sui-icon
                          title="Precio del paquete"
                          color="red"
                          name="circle"
                        />
                        ${{ detail.packagee.price }}
                      </sui-table-cell>
                      <sui-table-cell text-align="center">{{
                        detail.quantity
                      }}</sui-table-cell>
                      <sui-table-cell text-align="center"
                        >${{ detail.subtotal }}</sui-table-cell
                      >
                      <sui-table-cell text-align="center"
                        >{{ detail.discount }}%</sui-table-cell
                      >
                      <sui-table-cell text-align="center"
                        >${{ detail.discountAmount }}</sui-table-cell
                      >
                    </sui-table-row>
                  </sui-table-body>
                </sui-table>
              </sui-modal-content>
              <sui-modal-actions>
                <sui-button positive @click.native="toggle()"> OK </sui-button>
              </sui-modal-actions>
            </sui-modal>
          </div>
        </div>
      </sui-tab-pane>
      <sui-tab-pane icon="chart line icon" title="Ventas del día">
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
          <sui-segment basic v-if="ventasHoy.length === 0">
            <i style="color: #6c757d" class="massive comment icon"></i><br />
            <small style="color: #6c757d">No se encontraron registros.</small>
          </sui-segment>
        </div>
      </sui-tab-pane>
    </sui-tab>

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
  name: "Ventas",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      ventasHoy: [],
      ventas: [],
      venta: {
        id: 0,
        date: {},
        total: 0,
        user: {},
        cashbox: {},
        details: [],
      },
    };
  },
  mounted() {
    this.startup();
  },
  methods: {
    startup() {
      api
        .doGet("sales/list")
        .then((response) => {
          this.ventas = response.data;
          for(let u of this.ventas){
            u.date = u.date.split(".")[0];
            u.date = u.date.replace("T"," ");
            u.date = u.date + " hrs."    
          }
        })
        .catch((error) => {
          this.$swal(error.message);
        });
    },
    toggle() {
      this.open = !this.open;
    },
    getVenta(id) {
      api
        .doGet("sales/get/" + id)
        .then((response) => {
          console.log(response.data);
          this.venta.details = response.data.saleDetails;
          this.venta.date = response.data.sale.date;
            this.venta.date = this.venta.date.split(".")[0];
            this.venta.date = this.venta.date.replace("T"," ");
            this.venta.date = this.venta.date + " hrs." 
          this.venta.total = response.data.sale.total;
          this.venta.user.username = response.data.sale.user.username;
          this.venta.cashbox.cashboxNumber =
            response.data.sale.cashbox.cashboxNumber;
        })
        .catch((error) => {
          this.$swal(error.message);
        });

      this.open = !this.open;
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
}

.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>
