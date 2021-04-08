<template>
  
  <div>
    <img style="margin-top:1%; margin-bottom:1%" class="ui centered small image" src="../assets/V1.png" />
    <img style="margin-top:1%" class="ui centered large image" src="../assets/page_not_found.png" />
    <h1>¡Página no encontrada!</h1>
    <p>La página a la que intentas acceder no existe,</p> 
    <p>prueba nuevamente en: <a href="/">Inicio</a></p>
    <fondo />
  </div>
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
