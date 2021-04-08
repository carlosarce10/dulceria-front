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
            <div class="search">
              <div class="ui fluid category search">
                <div class="ui icon input">
                  <div style="margin-right: 5%">
                    <sui-button
                      @click.native="toggle"
                      style="background: #64b5f6"
                      negative
                      circular
                      icon="plus"
                    />
                  </div>
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
            <div>
              <sui-segment basic v-if="listStock.length === 0">
                <i style="color: #6c757d" class="massive comment icon"></i
                ><br />
                <small style="color: #6c757d"
                  >No se encontraron registros.</small
                >
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
                    v-for="listStock in listStock"
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
                        v-model="stock.product.id"
                      />
                    </sui-form-field>

                    <sui-form-field>
                      <label>Cantidad:</label>
                      <input type="number" v-model="stock.quantityStock" />
                    </sui-form-field>
                    <sui-form-field>
                      <label>Fecha de expiración:</label>
                      <input type="date" v-model="stock.dateExpire" />
                    </sui-form-field>
                    <sui-form-field>
                      <label>Número de lote:</label>
                      <input type="number" v-model="stock.batch" />
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
                  >
                    OK
                  </sui-button>
                </sui-modal-actions>
              </sui-modal>
            </div>
          </div>
        </sui-tab-pane>
        <sui-tab-pane icon="calendar times icon" title="Caducos">
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
            <div>
              <sui-segment basic v-if="listStockEx.length === 0">
                <i style="color: #6c757d" class="massive comment icon"></i
                ><br />
                <small style="color: #6c757d"
                  >No se encontraron registros.</small
                >
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
                    v-for="listStockEx in listStockEx"
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
      listProduct: null,
      open: false,
    };
  },
  beforeMount() {
    this.getLists();
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
      console.log(this.stock);
      api
        .doPost("/stock/save", this.stock)
        .then((response) => {
          this.$swal({
            title: "¡Lote registrado exitosamente!",
            icon: "success",
          });
          console.log(response);
          this.getLists();
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
    toggle() {
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
  margin-bottom: 2%;
}
.btnModal {
  background-color: #64b5f6 !important;
  color: white !important;
  margin-bottom: -2% !important;
}
</style>
