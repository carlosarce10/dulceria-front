<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Inventario</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="calendar check icon" title="No caducos">
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
        </div>
        <div>
          <sui-segment basic v-if="listStock.length === 0">
            <i style="color: #6c757d" class="massive comment icon"></i><br />
            <small style="color: #6c757d">No se encontraron registros.</small>
          </sui-segment>
          <sui-table v-if="listStock.length > 0" color="blue">
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell text-align="center"
                  >Producto</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Lote</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Fecha de caducidad</sui-table-header-cell
                >
                <sui-table-header-cell text-align="center"
                  >Cantidad en existencia</sui-table-header-cell
                >
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row
                v-for="listStock in filteredStock"
                :key="listStock.id"
              >
                <sui-table-cell text-align="center">{{
                  listStock.product.name
                }}</sui-table-cell>
                <sui-table-cell text-align="center">{{
                  listStock.batch
                }}</sui-table-cell>
                <sui-table-cell text-align="center">{{
                  listStock.dateExpire
                }}</sui-table-cell>
                <sui-table-cell text-align="center">{{
                  listStock.quantityStock
                }}</sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </div>
        <div>
          <sui-modal class="modal-small" v-model="open">
            <sui-modal-header>Registro nuevo lote</sui-modal-header>
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
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    v-model="$v.quantityStock.$model"
                    :class="status($v.quantityStock)"
                  />
                  <div
                    class="error errorMsg"
                    v-if="!$v.quantityStock.required && $v.quantityStock.$dirty"
                  >
                    El lote no debe estar en blanco
                  </div>
                  <div class="error errorMsg" v-if="!$v.quantityStock.minValue">
                    La cantidad debe se mayor a 0
                  </div>
                </sui-form-field>
                <sui-form-field>
                  <label>Fecha de expiración:</label>
                  <input
                    type="date"
                    v-model="$v.dateExpire.$model"
                    :class="status($v.dateExpire)"
                    :min="today"
                  />
                  <div
                    class="error errorMsg"
                    v-if="!$v.dateExpire.required && $v.dateExpire.$dirty"
                  >
                    La fecha no debe estar en blanco
                  </div>
                  <!-- <div class="error errorMsg" v-if="!$v.dateExpire.minValue">
                      La fecha no debe ser anterior a la fecha actual
                    </div> -->
                </sui-form-field>
                <sui-form-field>
                  <label>Número de lote:</label>
                  <input
                    type="number"
                    v-model="$v.batch.$model"
                    :class="status($v.batch)"
                  />
                  <div
                    class="error errorMsg"
                    v-if="!$v.batch.required && $v.batch.$dirty"
                  >
                    El lote no debe estar en blanco
                  </div>
                  <div class="error errorMsg" v-if="!$v.batch.minValue">
                    El precio del lote debe ser positivo
                  </div>
                </sui-form-field>
              </sui-form>
            </sui-modal-content>
            <sui-modal-actions style="margin-bottom: 3%">
              <sui-button negative @click.native="toggle" type="button">
                Cancelar
              </sui-button>
              <sui-button
                id="registrar"
                @click="register"
                positive
                @click.native="toggle"
                type="submit"
                :disabled="!(!$v.$invalid && $v.$dirty)"
              >
                OK
              </sui-button>
            </sui-modal-actions>
          </sui-modal>
        </div>
      </sui-tab-pane>
      <sui-tab-pane icon="calendar times icon" title="Caducos">
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
          <div>
            <sui-segment basic v-if="listStockEx.length === 0">
              <i style="color: #6c757d" class="massive comment icon"></i><br />
              <small style="color: #6c757d">No se encontraron registros.</small>
            </sui-segment>
            <sui-table v-if="listStockEx.length > 0" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >Producto</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Lote</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Fecha de caducidad</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Cantidad en existencia</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="listStockEx in filteredStockDisabled"
                  :key="listStockEx.id"
                >
                  <sui-table-cell text-align="center">{{
                    listStockEx.product.name
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    listStockEx.batch
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    listStockEx.dateExpire
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    listStockEx.quantityStock
                  }}</sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </div>
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
import { required, minValue } from "vuelidate/lib/validators";

Vue.use(Particles);
export default {
  name: "Inventario",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      listSelectProduct: [],
      stock: {
        batch: "",
        dateExpire: "",
        quantityStock: "",
        product: { id: 0 },
      },
      listStock: null,
      listStockEx: null,
      listProduct: null,
      open: false,
      batch: "",
      quantityStock: "",
      product: "",
      dateExpire: "",
      today: "",
      search: "",
      searchD: "",
    };
  },
  beforeMount() {
    this.dateToday();
    this.getLists();
  },
  computed: {
    filteredStock: function() {
      return this.listStock.filter((stock) => {
        return stock.product.name
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    },
    filteredStockDisabled: function() {
      return this.listStockEx.filter((stock) => {
        return stock.product.name
          .toLowerCase()
          .match(this.searchD.toLowerCase());
      });
    },
  },
  methods: {
    getLists() {
      api
        .doGet("/stock/list/notExpired")
        .then((listStock) => (this.listStock = listStock.data))
        .catch((error) => console.log(error));

      api
        .doGet("/stock/list/expired")
        .then((listStockEx) => (this.listStockEx = listStockEx.data))
        .catch((error) => console.log(error));

      api
        .doGet("/product/list/true")
        .then((response) => {
          this.listProduct = response.data;

          for (let myproducto of this.listProduct) {
            let item = {
              key: 0,
              value: 0,
              text: "",
            };
            item.key = myproducto.id;
            item.value = myproducto.id;
            item.text = myproducto.name;

            this.listSelectProduct.push(item);
          }
        })
        .catch((error) => console.log(error));
    },
    register() {
      this.stock = {
        batch: this.batch,
        quantityStock: this.quantityStock,
        product: {
          id: this.product,
        },
        dateExpire: this.dateExpire,
      };
      console.log(this.stock);
      api
        .doPost("stock/save", this.stock)
        .then((response) => {
          this.$swal({
            title: "¡Lote registrado exitosamente!",
            icon: "success",
          });
          console.log(response);
          this.getLists();
          this.stock.batch = "";
          this.stock.dateExpire = "";
          (this.stock.quantityStock = ""), (this.stock.product.id = 0);
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    toggle() {
      this.open = !this.open;
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    dateToday() {
      var f = new Date();
      var anio = f.getFullYear();
      var _mes = f.getMonth();
      var _dia = f.getDate();
      _mes = _mes + 1;
      var mes = "";
      var dia = "";
      if (_mes < 10) {
        mes = "0" + _mes;
      } else {
        mes = _mes.toString;
      }
      if (_dia < 10) {
        dia = "0" + _dia;
      } else {
        dia = _dia.toString;
      }
      var fecha = anio + "-" + mes + "-" + dia;
      this.today = fecha;
      console.log(fecha);
    },
  },
  validations: {
    batch: { required, minValue: minValue(0) },
    quantityStock: { required, minValue: minValue(1) },
    product: { required },
    dateExpire: { required /* minValue: minValue(this.today) */ },
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
  margin-left: auto;
  margin-right: auto;
}
.search {
  margin-right: 2%;
  margin-bottom: 5px;
}
.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>
