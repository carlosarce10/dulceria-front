<template>
  <div class="area">
    <cabecera />
    <br />
    <div class="funciones">
      <h3>Funciones de cajero</h3>
    </div>
    <sui-divider hidden />
    <div class="cartas">
      <sui-card-group :items-per-row="2" stackable>
        <sui-card class="centered raised">
          <sui-dimmer-dimmable
            @mouseenter.native="cardOneActive = true"
            @mouseleave.native="cardOneActive = false"
          >
            <img src="../../assets/venta.png" />
            <sui-dimmer blurring :active="cardOneActive">
              <sui-button @click="venta()" inverted>GO</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
          <sui-card-content>
            <sui-card-header>Venta</sui-card-header>
          </sui-card-content>
        </sui-card>
        <sui-card class="centered raised">
          <sui-dimmer-dimmable
            @mouseenter.native="cardTwoActive = true"
            @mouseleave.native="cardTwoActive = false"
          >
            <img src="../../assets/consultar.png" />
            <sui-dimmer blurring :active="cardTwoActive">
              <sui-button v-on:click="consulta()" inverted>GO</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
          <sui-card-content>
            <sui-card-header>Consultar</sui-card-header>
          </sui-card-content>
        </sui-card>
        <sui-card class="centered raised">
          <sui-dimmer-dimmable
            @mouseenter.native="cardThreeActive = true"
            @mouseleave.native="cardThreeActive = false"
          >
            <img src="../../assets/retiro.png" />
            <sui-dimmer blurring :active="cardThreeActive">
              <sui-button inverted v-on:click="retiro()">GO</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
          <sui-card-content>
            <sui-card-header>Retiro</sui-card-header>
          </sui-card-content>
        </sui-card>
        <sui-card class="centered raised">
          <sui-dimmer-dimmable
            @mouseenter.native="cardFourActive = true"
            @mouseleave.native="cardFourActive = false"
          >
            <img src="../../assets/cerrarcaja.png" />
            <sui-dimmer blurring :active="cardFourActive">
              <sui-button inverted>GO</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
          <sui-card-content>
            <sui-card-header>Cerrar Caja</sui-card-header>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
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

Vue.use(Particles);
export default {
  name: "Cajero",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      cardOneActive: false,
      cardTwoActive: false,
      cardThreeActive: false,
      cardFourActive: false,
    };
  },
  methods: {
    consulta() {
      this.$router.push({ name: "Consultar" });
    },
    venta(){
      this.$router.push({ name: "Venta" });
    },
    retiro() {
      this.$router.push({ name: "Retiro" });
    },
  },
};
</script>

<style scoped>
.ui.card,
.ui.cards > .card {
  background-color: #2286c3;
}
.ui.card > .content,
.ui.cards > .card > .content {
  background-color: #ffff;
}

.cartas {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
