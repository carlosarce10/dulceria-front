<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Cajero</h3>
    </div>
    <!--<button @click="showAlert">Hello world</button>-->
    <fondo />
  </div>
</template>

<script>
import fondo from "../../components/fondo";
import cabecera from "../../components/headerAdmin";
import Particles from "particles.vue";
import Vue from "vue";

Vue.use(Particles);
export default {
  name: "CajeroAdmin",
  components: {
    fondo,
    cabecera,
  },
  data() {
    return {
      open: false,
      result: null,
      results: null,
      id: null,
      loading: true,
      name: "",
      price: null,
    };
  },
  methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal("Hello Vue world!!!");
    },
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
