<template>
  <div>
    <div class="ui special cards cartas">
      <div class="card">
        <div class="blurring dimmable image">
          <div class="ui inverted dimmer">
            <div class="content">
              <div class="center">
                <div class="ui inverted button">Ventas</div>
              </div>
            </div>
          </div>
          <img class="cardss circular image" src="../../assets/venta.png" />
        </div>
      </div>
      <div class="card">
        <div class="blurring dimmable image">
          <div class="ui inverted dimmer">
            <div class="content">
              <div class="center">
                <div class="ui primary button">Add Friend</div>
              </div>
            </div>
          </div>
          <img
            class="cardss circular image"
            src="../../assets/cerrarcaja.png"
          />
        </div>
      </div>
      <div class="card">
        <div class="blurring dimmable image">
          <div class="ui inverted dimmer">
            <div class="content">
              <div class="center">
                <div class="ui primary button">Add Friend</div>
              </div>
            </div>
          </div>
          <img class="cardss circular image" src="../../assets/consultar.png" />
        </div>
      </div>
      <div class="card">
        <div class="blurring dimmable image">
          <div class="ui inverted dimmer">
            <div class="content">
              <div class="center">
                <div class="ui primary button">Add Friend</div>
              </div>
            </div>
          </div>
          <img
            class="medium circular image cardss"
            src="../../assets/retiro.png"
          />
        </div>
      </div>
    </div>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import Particles from "particles.vue";
import Vue from "vue";
import $ from "jquery";

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
  mounted() {
    $(".special.cards .image").dimmer({
      on: "hover",
    });
  },
};
</script>

<style>
.cartas {
  padding-top: 10%;
  justify-content: center;
  align-items: center;
}
.cardss {
  background-color: #64b5f6;
}
</style>
