<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Retiro</h3>
    </div>
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

<style>
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
</style>