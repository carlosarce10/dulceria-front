<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Bitacora</h3>
    </div>
    <sui-divider hidden />
    <sui-tab class="panel">
      <sui-tab-pane icon="clipboard list icon" title="Bitácora">
        <div class="table">
          <div class="ui search">
            <div class="ui icon input">
              <input
                class="prompt"
                type="text"
                placeholder="Buscar movimiento"
                v-model="search"
              />
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
          <sui-container style="margin-top: 2%">
            <sui-table striped color="blue" size="small">
              <sui-table-header>
                <sui-table-row>
                  <sui-table-header-cell text-align="center"
                    >#</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Usuario
                  </sui-table-header-cell>
                  <sui-table-header-cell text-align="center"
                    >Acción</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Fecha</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Tabla afectada</sui-table-header-cell
                  >
                  <sui-table-header-cell text-align="center"
                    >Acción</sui-table-header-cell
                  >
                </sui-table-row>
              </sui-table-header>
              <sui-table-body>
                <sui-table-row
                  v-for="(logbook, item) in filteredBrands"
                  :key="logbook.id"
                >
                  <sui-table-cell text-align="center">{{
                    item + 1
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    logbook.user
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    logbook.action
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    logbook.date
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">{{
                    logbook.tableExecute
                  }}</sui-table-cell>
                  <sui-table-cell text-align="center">
                    <sui-button
                      @click.native="toggleEdit(logbook.id)"
                      id="editar"
                      style="background: #64b5f6"
                      negative
                      circular
                      icon="eye"
                    />
                  </sui-table-cell>
                </sui-table-row>
              </sui-table-body>
            </sui-table>
          </sui-container>
        </div>
      </sui-tab-pane>
    </sui-tab>
    <sui-modal v-model="openEdit">
      <sui-modal-header>Detalle Movimiento</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-segment raised color="blue">
          <h1 class="ui header">
            <div class="sub header">
              <i class="folder open icon"></i>Movimiento:
              {{ logbookEdit.action }}
            </div>
          </h1></sui-segment
        >
        <sui-segments horizontal>
          <sui-segment raised color="pink">
            <h2 class="ui header">
              <div class="sub header">
                <i class="user icon"></i>Usuario: {{ logbookEdit.user }}
              </div>
            </h2>
          </sui-segment>
          <sui-segment raised color="purple">
            <h2 class="ui header">
              <div class="sub header">
                <i class="calendar icon"></i>Fecha: {{ logbookEdit.date }}
              </div>
            </h2>
          </sui-segment>
          <sui-segment raised color="pink">
            <h2 class="ui header">
              <div class="sub header">
                <i class="th icon"></i>Tabla: {{ logbookEdit.tableExecute }}
              </div>
            </h2>
          </sui-segment>
          <sui-segment raised color="purple">
            <h2 class="ui header">
              <div class="sub header">
                <i class="paper plane icon"></i>Host: {{ logbookEdit.host }}
              </div>
            </h2>
          </sui-segment>
        </sui-segments>
        <sui-segments raised horizontal>
          <sui-segment color="green" raised>
            <h2 class="ui header">
              <div class="sub header">
                <i class="calendar times icon"></i> Registro Original:
              </div>
              <sui-divider />
              <div v-for="log in logOld" :key="log.id" class="sub header">
                *{{ log }}
              </div>
            </h2>
          </sui-segment>

          <sui-segment raised color="green">
            <h2 class="ui header">
              <div class="sub header">
                <i class="calendar check icon"></i> Registro nuevo:
              </div>
              <sui-divider />
              <div v-for="item in logNew" :key="item.id" class="sub header">
                * {{ item }}
              </div>
            </h2>
          </sui-segment>
        </sui-segments>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button primary @click.native="toggleEdit" type="submit">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import api from "../../util/api";

Vue.use(VueRouter);
Vue.use(Particles);
export default {
  name: "Bitacora",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      logOld: [],
      logNew: [],
      logbookTrue: [],
      action: "",
      search: "",
      openEdit: false,
      logbookEdit: {
        id: 0,
        tableExecute: "",
        action: "",
        previousLog: "",
        nextLog: "",
        user: "",
        date: "",
        host: "",
        table: "",
      },
    };
  },
  beforeMount() {
    this.getList();
  },
  computed: {
    filteredBrands: function () {
      return this.logbookTrue.filter((logbook) => {
        return logbook.action.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  methods: {
    getList() {
      api
        .doGet("/logBook/list")
        .then((response) => (this.logbookTrue = response.data))
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
    toggleEdit(id) {
      api
        .doGet("/logBook/get/" + id)
        .then((response) => {
          this.logbookEdit = response.data;

          this.logNew = this.logbookEdit.nextLog.split("|");
          this.logOld = this.logbookEdit.previousLog.split("|");
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

      this.openEdit = !this.openEdit;
    },
  },
};
</script>

<style scoped>
.funciones {
  color: #64b5f6;

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
  margin-bottom: 5px;
}
.panel {
  width: 90%;
  margin-left: 5%;
}
</style>
