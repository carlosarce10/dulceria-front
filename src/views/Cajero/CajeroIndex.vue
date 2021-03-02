<template>
  <div>
    <cabecera />
    <div class="funciones">
      <h3>Funciones de cajero</h3>
    </div>
    <div class="container">
      <div class="card">
        <div class="face face1">
          <div class="content">
            <div class="icon">
              <img src="../../assets/venta.png" />
            </div>
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <h3>
              <a href="Venta">Venta</a>
            </h3>
            <p>This is where I network and build my professional protfolio.</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="face face1">
          <div class="content">
            <div class="icon">
              <img src="../../assets/retiro.png" />
            </div>
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <h3>
              <a href="Retiro">Hacer retiro</a>
            </h3>
            <p>This is where I network and build my professional protfolio.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="card">
        <div class="face face1">
          <div class="content">
            <div class="icon">
              <img src="../../assets/consultar.png" />
            </div>
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <h3>
              <a href="Consultar">Consultar</a>
            </h3>
            <p>This is where I network and build my professional protfolio.</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="face face1">
          <div class="content">
            <div class="icon">
              <img src="../../assets/cerrarcaja.png" />
            </div>
          </div>
        </div>
        <div class="face face2">
          <div class="content">
            <h3>
              <a href="CerrarCaja">Cerrar caja</a>
            </h3>
            <p>This is where I network and build my professional protfolio.</p>
          </div>
        </div>
      </div>
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
  name: "Cajero",
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
.cards {
  width: 50%;
}
.cardss {
  background-color: #64b5f6;
}

img {
  margin-top: 10%;
  height: 50%;
}

/* estilos del card */

.container {
  width: 100%;
  position: relative;
  border-radius: 10px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container .card {
  position: relative;
  margin-left: 2%;
  margin-top: -5%;
  margin-bottom: -5%;
}

.container .card .icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f00;
  transition: 0.7s;
  z-index: 1;
}

.container .card:nth-child(1) .icon {
  background: #64b5f6;
}

.container .card:nth-child(2) .icon {
  background: #64b5f6;
}

.container .card:nth-child(3) .icon {
  background: #64b5f6;
}
.container .card:nth-child(4) .icon {
  background: #64b5f6;
}

.container .card .face {
  width: 300px;
  height: 200px;
  transition: 0.6s;
}

.container .card .face.face1 {
  z-index: 1;
  transform: translateY(100px);
}

.container .card:hover .face.face1 {
  background: #ff0057;
  transform: translateY(11px);
}
.container .card .face.face2 .content h3 {
  margin: 10px 0 10px 0;
  padding: 0;
  color: #fff;
  font-size: 20px;
  text-align: center;
  color: #414141;
}
</style>
