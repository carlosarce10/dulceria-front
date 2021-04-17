<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Venta</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="chart bar outline icon" title="Venta">
        <div style="float: right">
          <sui-button
            @click="doSale()"
            style="background: #64b5f6"
            negative
            circular
            icon="plus"
          />
          <sui-input
            class="custom-search"
            icon="search"
            type="text"
            placeholder="Buscar..."
          />
        </div>

        <sui-container style="margin-top: 5%">
          <sui-segment basic v-if="ventas.length === 0">
            <i style="color: #6c757d" class="massive comment icon"></i><br />
            <small style="color: #6c757d">No se encontraron registros.</small>
          </sui-segment>
          <sui-table color="blue" v-if="ventas.length > 0">
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell text-align="center"
                  >#</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Fecha</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Total</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Ver detalle</sui-table-header-cell
                >
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row
                v-for="(venta, item) in filteredVentas"
                :key="venta.id"
              >
                <sui-table-cell text-align="center">{{
                  item + 1
                }}</sui-table-cell>
                <sui-table-cell text-align="center">{{
                  venta.date
                }}</sui-table-cell>
                <sui-table-cell text-align="center"
                  >${{ venta.total }}</sui-table-cell
                >
                <sui-table-cell
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <sui-button
                    style="background: #64b5f6"
                    negative
                    circular
                    icon="eye"
                    @click.native="getVenta(venta.id)"
                  />
                </sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </sui-container>
      </sui-tab-pane>
    </sui-tab>
    <sui-modal v-model="open">
      <sui-modal-header>Detalle Venta</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-grid :columns="3" divided>
          <sui-grid-row stretched>
            <sui-grid-column>
              <sui-segment color="violet">
                <sui-grid>
                  <sui-grid-row>
                    <sui-grid-column :width="8">
                      <sui-segment color="blue" aligned="center" compact>
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
                >#</sui-table-header-cell
              >
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
              v-for="(detail, item) in venta.details"
              :key="detail.id"
            >
              <sui-table-cell text-align="left">
                {{ item + 1 }}
              </sui-table-cell>
              <sui-table-cell v-if="detail.product !== null" text-align="left">
                <sui-icon color="blue" name="cube" circular />
                {{ detail.product.name }}
              </sui-table-cell>
              <sui-table-cell
                v-if="detail.product !== null && detail.quantity < 100"
                text-align="center"
              >
                <sui-icon title="Precio menudeo" color="orange" name="circle" />
                ${{ detail.product.retailPrice }}
              </sui-table-cell>
              <sui-table-cell
                v-if="detail.product !== null && detail.quantity >= 100"
                text-align="center"
              >
                <sui-icon title="Precio mayoreo" color="yellow" name="circle" />
                ${{ detail.product.wholesalePrice }}
              </sui-table-cell>
              <sui-table-cell v-if="detail.packagee !== null" text-align="left">
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
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerCajero";
import Particles from "particles.vue";
import Vue from "vue";
import api from "../../util/api";
import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "Venta",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      search: "",
      ventas: [],
      venta: {
        id: 0,
        date: {},
        total: 0,
        user: {},
        cashbox: {},
        details: [],
      },
      open: false,
    };
  },
  computed: {
    filteredVentas: function () {
      return this.ventas.filter((venta) => {
        return venta.date.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  methods: {
    startup() {
      let idCashbox = localStorage.getItem("idCashbox");

      api
        .doGet("/sales/list/cashbox/" + idCashbox)
        .then((response) => {
          this.ventas = response.data;
          for (let u of this.ventas) {
            u.date = u.date.split(".")[0];
            u.date = u.date.replace("T", " ");
            u.date = u.date + " hrs.";
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
    doSale() {
      this.$router.push("/cajero/nueva/venta");
    },
    toggle() {
      this.open = !this.open;
    },
    getVenta(id) {
      api
        .doGet("/sales/get/" + id)
        .then((response) => {
          this.venta.details = response.data.saleDetails;
          this.venta.date = response.data.sale.date;
          this.venta.date = this.venta.date.split(".")[0];
          this.venta.date = this.venta.date.replace("T", " ");
          this.venta.date = this.venta.date + " hrs.";
          this.venta.total = response.data.sale.total;
          this.venta.user.username = response.data.sale.user.username;
          this.venta.cashbox.cashboxNumber =
            response.data.sale.cashbox.cashboxNumber;
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
      this.open = !this.open;
    },
  },
  mounted() {
    this.startup();
  },
};
</script>

<style>
.search {
  margin-top: -5%;
  margin-right: 5%;
  float: right;
}

.custom-search > input {
  border-radius: 500rem !important;
  float: right !important;
  margin-right: 0em !important;
  margin-left: 0.25em !important;
}

.table {
  margin-left: 5%;
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

.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>