<template>
  <div>
    <div>
      <sui-segment vertical>
        <sui-header
          floated="left"
          style="color: white; margin-left: 5%; margin-top: 5%"
          size="large"
          >Funciones del cajero</sui-header
        >
      </sui-segment>
    </div>
    <div>
      <sui-card-group :items-per-row="2">
        <sui-card class="cards">
          <sui-dimmer-dimmable
            @mouseenter.native="cardOneActive = true"
            @mouseleave.native="cardOneActive = false"
            class="cardss"
          >
            <img src="../../assets/venta.png" />
            <sui-dimmer blurring :active="cardOneActive">
              <sui-button inverted>Venta</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
        </sui-card>
        <sui-card class="cards">
          <sui-dimmer-dimmable
            @mouseenter.native="cardTwoActive = true"
            @mouseleave.native="cardTwoActive = false"
            class="cardss"
          >
            <img src="../../assets/cerrarcaja.png" />
            <sui-dimmer blurring :active="cardTwoActive">
              <sui-button inverted>Cerrar caja</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
        </sui-card>
        <sui-card class="cards">
          <sui-dimmer-dimmable
            @mouseenter.native="cardThreeActive = true"
            @mouseleave.native="cardThreeActive = false"
            class="cardss"
          >
            <img src="../../assets/retiro.png" />
            <sui-dimmer blurring :active="cardThreeActive">
              <sui-button inverted>Retiro</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
        </sui-card>
        <sui-card class="cards">
          <sui-dimmer-dimmable
            @mouseenter.native="cardFourActive = true"
            @mouseleave.native="cardFourActive = false"
            class="cardss"
          >
            <img src="../../assets/consultar.png" />
            <sui-dimmer blurring :active="cardFourActive">
              <sui-button inverted>Consultar productos</sui-button>
            </sui-dimmer>
          </sui-dimmer-dimmable>
        </sui-card>
      </sui-card-group>
    </div>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import Particles from "particles.vue";
import Vue from "vue";

Vue.use(Particles);
export default {
  name: "CajeroIndex",
  components: {
    fondo,
  },
  data() {
    return {
      cardOneActive: false,
      cardTwoActive: false,
      cardThreeActive: false,
      cardFourActive: false,
    };
  },
};
</script>

<style>
.cards {
  width: 40%;
  position: absolute;
  left: 23%;
  top: 25%;
}
.cardss {
  background-color: #007bc6;
}

img {
  margin-top: 18%;
  height: 50%;
}
</style>
