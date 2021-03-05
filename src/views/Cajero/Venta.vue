<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Venta</h3>
    </div>
    <br />
    <br />
    <div class="table">
      <sui-grid divided="vertically">
        <sui-grid-row :columns="2">
          <sui-grid-column>
            <sui-table class="tableResume" color="blue">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell>Nombre Producto</sui-table-header-cell>
                  <sui-table-header-cell>Precio</sui-table-header-cell>
                  <sui-table-header-cell
                    >Tipo (Menudeo/Mayoreo)</sui-table-header-cell
                  >
                  <sui-table-header-cell>
                    Pieza (ml, gr, kg)
                  </sui-table-header-cell>
                  <sui-table-header-cell>Subtotal</sui-table-header-cell>
                  <sui-table-header-cell>Cantidad</sui-table-header-cell>

                  <sui-table-header-cell>Quitar Producto</sui-table-header-cell>
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row>
                  <sui-table-cell>Apples</sui-table-cell>
                  <sui-table-cell>$212</sui-table-cell>
                  <sui-table-cell>Menudeo</sui-table-cell>
                  <sui-table-cell>5kg</sui-table-cell>
                  <sui-table-cell>25</sui-table-cell>

                  <sui-table-cell>
                    <div is="sui-button-group">
                      <sui-button class="btnModal"
                        ><i class="plus square icon"></i
                      ></sui-button>
                      <sui-button-or />
                      <sui-button><i class="minus icon"></i></sui-button>
                    </div>
                  </sui-table-cell>
                  <sui-table-cell>
                    <sui-button negative circular icon="times" />
                  </sui-table-cell>
                </sui-table-row>
                <sui-table-row>
                  <sui-table-cell>Apples</sui-table-cell>
                  <sui-table-cell>$212</sui-table-cell>
                  <sui-table-cell>Menudeo</sui-table-cell>
                  <sui-table-cell>5kg</sui-table-cell>
                  <sui-table-cell>25</sui-table-cell>

                  <sui-table-cell>
                    <div is="sui-button-group">
                      <sui-button class="btnModal"
                        ><i class="plus square icon"></i
                      ></sui-button>
                      <sui-button-or />
                      <sui-button><i class="minus icon"></i></sui-button>
                    </div>
                  </sui-table-cell>
                  <sui-table-cell>
                    <sui-button negative circular icon="times" />
                  </sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-grid-column>
          <sui-grid-column>
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
            <div class="products">
              <sui-table basic>
                <sui-table-header>
                  <sui-table-row>
                    <sui-table-header-cell>Producto</sui-table-header-cell>
                    <sui-table-header-cell>Precio</sui-table-header-cell>
                    <sui-table-header-cell
                      >Agregar Producto</sui-table-header-cell
                    >
                  </sui-table-row>
                </sui-table-header>
                <sui-table-body>
                  <sui-table-row>
                    <sui-table-cell>Sabritas</sui-table-cell>
                    <sui-table-cell>$50</sui-table-cell>
                    <sui-table-cell>
                      <sui-button class="btnModal"
                        ><i class="plus square icon"></i
                      ></sui-button>
                    </sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>Jumex</sui-table-cell>
                    <sui-table-cell>$15</sui-table-cell>
                    <sui-table-cell>
                      <sui-button class="btnModal"
                        ><i class="plus square icon"></i
                      ></sui-button>
                    </sui-table-cell>
                  </sui-table-row>
                  <sui-table-row>
                    <sui-table-cell>Corona</sui-table-cell>
                    <sui-table-cell>$18</sui-table-cell>
                    <sui-table-cell>
                      <sui-button class="btnModal"
                        ><i class="plus square icon"></i
                      ></sui-button>
                    </sui-table-cell>
                  </sui-table-row>
                </sui-table-body>
              </sui-table>
            </div>
          </sui-grid-column>
        </sui-grid-row>
      </sui-grid>
    </div>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/header";
import Particles from "particles.vue";
import Vue from "vue";
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
    return {};
  },
};
</script>

<style>
.products {
  margin-right: 5%;
}

.search {
  margin-top: -5%;
  margin-right: 5%;
  float: right;
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
}
</style>