<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Productos</h3>
    </div>
    <!-- para lista es: {{ result[0].name }} -->
    <!-- para objetos es: {{ result.name }} -->
    <p>Title: {{ result[0].name }}</p>
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";
import axios from "axios";

Vue.use(Particles);
export default {
  name: "Admin",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      result: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/brand/list/true")
      .then((result) => (this.result = result.data));
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
