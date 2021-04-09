<template>
  <div>
    <div>
      <div>
        <img class="ui centered medium image" src="../assets/404.png" />

        <h1>¡Página no encontrada!</h1>
        <h3>Algo salió mal...</h3>
        <button icon="home icon" class="ui primary button">
          <i class="home icon"></i>
          <a style="color: white" href="/">Volver al inicio</a>
        </button>
      </div>
    </div>
    <fondo />
  </div>
</template>

<script>
import fondo from "../components/fondo";
import Particles from "particles.vue";
import Vue from "vue";
Vue.use(Particles);

export default {
  name: "NotFound",
  components: {
    fondo,
  },
};
</script>

<style scoped>
center {
  margin: 15vw;
}

h1 {
  color: var(--border);
  font-size: 2em;
}
</style>
