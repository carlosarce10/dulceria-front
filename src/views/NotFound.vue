<template>
  <center>
    <h1>Not Found!</h1>
    <fondo />
    <p>
      <a href="/">Go home?</a>
    </p>
  </center>
</template>

<script>
import fondo from "../components/fondo";
import Particles from "particles.vue";
import Vue from "vue";
Vue.use(Particles);

  export default {
    name: 'NotFound',
    components: {
        fondo
    }
  }

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
