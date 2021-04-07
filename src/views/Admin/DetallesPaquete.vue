<template>
  <div class="area">
      <cabecera />
      <br />
      <div class="funciones">
          <h3>Detalles del paquete</h3>
      </div>
      <sui-tab class="panel">
          <sui-tab-pane icon="boxes" title="Productos">
                <sui-segments horizontal>
                    <sui-segment>
                        Nombre del paquete <sui-input type="text"/>
                    </sui-segment>
                    <sui-segment>Precio sugerido: $x MXN</sui-segment>
                    <sui-segment>
                        Precio del paquete
                        <sui-input type="text"/>
                    </sui-segment>
                </sui-segments>
                <sui-container style="margin-top: 2%">
                <sui-input icon="search"/>
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
                    <sui-table-row>
                        <sui-table-cell text-align="center">1</sui-table-cell>
                        <sui-table-cell text-align="center">Bubbaloo</sui-table-cell>
                        <sui-table-cell text-align="center">$15</sui-table-cell>
                        <sui-table-cell  text-align="center">
                            <sui-input style="width: 6rem;" type="number"/>
                        </sui-table-cell>
                        <sui-table-cell style="display: flex;align-items: center;justify-content: center;" text-align="center">
                            <sui-button style="background: #64b5f6" negative circular icon="eye" @click.native="x()"/>
                            <sui-button negative circular icon="times" @click.native="x()"/>
                        </sui-table-cell>
                    </sui-table-row>
                    </sui-table-body>
                </sui-table>
                </sui-container>
            
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
    data(){
        return{
            a:""
        }
    }
}
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