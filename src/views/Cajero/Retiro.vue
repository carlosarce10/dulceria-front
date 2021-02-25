<template>
  <div>
    <cabecera />
    <h1>Retiro</h1>
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
  name: "Retiro",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {};
  },
};
</script>