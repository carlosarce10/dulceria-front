<template>
  <div id="home">
    <fondo />
    <inicio />
  </div>
</template>

<script>
import inicio from "../components/inicioSesion";
import fondo from "../components/fondo";
import Particles from "particles.vue";
import Vue from "vue";

Vue.use(Particles);

export default {
  name: "Home",
  components: {
    inicio,
    fondo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
