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
                  <sui-card-content class="pr">
                    <sui-icon-group size="huge">
                      <sui-icon name="user outline" />
                    </sui-icon-group>
                  </sui-card-content>
                  <sui-card-content extra>
                    <sui-card-header>{{ this.user }}</sui-card-header>
                  </sui-card-content>
                </sui-card>
                <sui-card class="centered raised">
                  <sui-card-content>
                    <sui-card-header>Ventas</sui-card-header>
                  </sui-card-content>

                  <sui-card-content extra>
                    <sui-container text-align="center">
                      <sui-button-group>
                        <sui-button @click.native="toggle" icon="eye" primary
                          >Ver</sui-button
                        >
                      </sui-button-group>
                    </sui-container>
                  </sui-card-content>
                </sui-card>
              </div>
            </div>
            <div class="twelve wide column">
              <sui-segment raised aligned="center" color="blue">
                <sui-segments horizontal>
                  <sui-segment color="red" class="segmento" attached>
                    <p>Ventas del día: {{ this.cashbox.totalSales }}</p>
                  </sui-segment>
                  <sui-segment color="red" class="segmento" attached>
                    <p>Monto inicial: ${{ this.cashbox.initialAmount }}</p>
                  </sui-segment>
                </sui-segments>
                <sui-segments horizontal>
                  <sui-segment color="orange" class="segmento" attached>
                    <p>Monto actual: ${{ this.cashbox.amount }}</p>
                  </sui-segment>
                  <sui-segment color="orange" class="segmento" attached>
                    <p>Total retirado: ${{ this.cashbox.retiro }}</p>
                  </sui-segment>
                </sui-segments>
                <sui-segments horizontal>
                  <sui-segment color="teal" class="segmento" attached>
                    <p>No. caja: #{{ this.cashbox.cashboxNumber }}</p>
                  </sui-segment>
                  <sui-segment color="teal" class="segmento" attached>
                    <p>
                      <sui-input
                        icon="dollar sign"
                        placeholder="Monto a retirar"
                        v-model="dinero"
                        fluid
                        @keypress="numberOnly"
                      />
                    </p>
                  </sui-segment>
                </sui-segments>
                <sui-segments horizontal>
                  <sui-segment clearing class="segmento" attached>
                    <sui-button
                      floated="left"
                      negative
                      icon="reply"
                      @click="cancelar"
                      >Cancelar</sui-button
                    >
                    <sui-button
                      floated="right"
                      positive
                      icon="check"
                      @click="retirar"
                      >Retirar</sui-button
                    >
                  </sui-segment>
                </sui-segments>
              </sui-segment>
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
              <input
                class="prompt"
                type="text"
                placeholder="Buscar fecha"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-segment basic v-if="ventas.length === 0" align="center">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="ventas.length > 0" color="blue">
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
                    >Detalles de venta</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="(venta, item) in filteredSales"
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
                    text-align="center"
                  >
                    <sui-button
                      style="background: #64b5f6"
                      @click.native="getVenta(venta.id)"
                      icon="eye"
                      negative
                      circular
                    />
                  </sui-table-cell>
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
      <sui-modal v-model="open2"
        ><!---->
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
                          <sui-icon
                            name="cube"
                            size="large"
                            color="blue"
                            circular
                          />
                          <sui-divider />
                          Producto<br />
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
                v-for="(vent, item) in this.venta.details"
                :key="vent.id"
                ><!---->
                <sui-table-cell text-align="left">
                  {{ item + 1 }}
                </sui-table-cell>
                <sui-table-cell text-align="left" v-if="vent.packagee !== null"
                  ><!---->
                  <sui-icon color="red" name="cubes" circular />
                  {{ vent.packagee.name }}
                </sui-table-cell>
                <sui-table-cell text-align="left" v-if="vent.product !== null"
                  ><!---->
                  <sui-icon color="blue" name="cube" circular />
                  {{ vent.product.name }}
                </sui-table-cell>
                <sui-table-cell
                  v-if="vent.product !== null && vent.quantity < 100"
                  text-align="center"
                  ><!---->
                  <sui-icon
                    title="Precio menudeo"
                    color="orange"
                    name="circle"
                  />
                  ${{ vent.product.retailPrice }}
                </sui-table-cell>
                <sui-table-cell
                  v-if="vent.product !== null && vent.quantity >= 100"
                  text-align="center"
                  ><!---->
                  <sui-icon
                    title="Precio mayoreo"
                    color="yellow"
                    name="circle"
                  />
                  ${{ vent.product.wholesalePrice }}
                </sui-table-cell>
                <sui-table-cell
                  v-if="vent.packagee !== null"
                  text-align="center"
                  ><!---->
                  <sui-icon
                    title="Precio del paquete"
                    color="red"
                    name="circle"
                  />
                  ${{ vent.packagee.price }}
                </sui-table-cell>
                <sui-table-cell text-align="center">
                  {{ vent.quantity }}
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
      venta: {
        id: 0,
        date: {},
        total: 0,
        user: {},
        cashbox: {},
        details: [],
      },
      cashbox: {
        id: 0,
        amount: 0,
        cashboxNumber: 0,
        date: "",
        initialAmount: 0,
        startTime: "",
        totalSales: 0,
        retiro: 0,
      },
      vent: [],
      search: "",
      dinero: null,
    };
  },

  mounted() {
    this.startUp();
    this.getCashbox();
  },
  computed: {
    filteredSales: function () {
      return this.ventas.filter((sale) => {
        return sale.date.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  methods: {
    startUp() {
      this.id = localStorage.getItem("idCashbox");
      this.user = localStorage.getItem("username");

      api
        .doGet("/sales/list/cashbox/" + this.id)
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
    toggle() {
      this.open = !this.open;
    },
    toggle2() {
      this.open2 = !this.open2;
    },
    cancelar() {
      this.$router.push("/cajero");
    },
    getVenta(id) {
      this.open2 = !this.open2;
      api
        .doGet("/sales/get/" + id)
        .then((response) => {
          let ventaDetalles = response.data.saleDetails;
          for (let item of ventaDetalles) {
            let convert = (item.discountAmount + "").split(".");

            if (convert.length === 2) {
              let amount = convert[0] + "." + convert[1].substring(0, 2);
              item.discountAmount = amount;
            }
          }

          this.venta.details = ventaDetalles;
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
    },
    getCashbox() {
      let id = localStorage.getItem("idCashbox");
      api
        .doGet("/cashbox/get/" + id)
        .then((response) => {
          this.cashbox.id = response.data.id;
          this.cashbox.amount = response.data.amount;
          this.cashbox.amount = (""+this.cashbox.amount).split(".").length === 2 ? parseFloat((""+this.cashbox.amount).split(".")[0]+"."+((""+this.cashbox.amount).split(".")[1]).substring(0,2)): this.cashbox.amount;
          
          this.cashbox.cashboxNumber = response.data.cashboxNumber;
          this.cashbox.date = response.data.date;
          this.cashbox.initialAmount = response.data.initialAmount;
          this.cashbox.startTime = response.data.startTime;
          this.cashbox.totalSales = response.data.totalSales;
          this.cashbox.retiro = response.data.withdrawal;
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
        })
        .finally(() => (this.loading = false));
    },
    retirar() {
      let Id = localStorage.getItem("idCashbox");
      this.$swal({
        title: "¿Está seguro de realizar el retiro?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.dinero <= 0 || this.dinero > this.cashbox.amount) {
            ("Cantidad inválida");
            this.$swal({
              title: "¡La cantidad a retirar no es válida!",
              icon: "warning",
            });
          } else {
            api
              .doGet("/cashbox/makeWithdrawal/" + Id + "/" + this.dinero)
              .then((response) => {
                if (response.data) {
                  this.cashbox.amount = this.cashbox.amount - this.dinero;
                  this.cashbox.retiro =
                    parseFloat(this.cashbox.retiro) + parseFloat(this.dinero);
                  this.$swal({
                    title: "¡Retiro completado!",
                    icon: "success",
                  });
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
          }
        }
      });
    },
    numberOnly() {
      let pattern = /[0-9.]/;
      let res = event.key.match(pattern);
      if (!res) {
        event.preventDefault();
        return false;
      }
    },
  },
};
</script>

<style>
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
.search {
  margin-right: 2%;
  margin-bottom: 5px;
}

.panel {
  width: 90%;
  margin-left: 5%;
}
.table {
  margin-top: 6%;
}
.cards {
  width: 90%;
}
</style>