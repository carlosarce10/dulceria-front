<template>
  <div class="border">
    <form class="formulario">
      <div class="fondoForm">
        <h2 class="login">Login</h2>
        <div class="field" style="padding-top: 5%">
          <div class="ui left icon input">
            <input type="email" placeholder="E-mail address" /><i
              class="user icon"
            ></i>
          </div>
        </div>
        <div class="field" style="padding-top: 10%; padding-bottom: 10%">
          <div class="ui left icon input">
            <input type="email" placeholder="*******" /><i
              class="lock icon"
            ></i>
          </div>
        </div>
        <div>
          <sui-button
            @click="$router.push('Cajero')"
            class="btnGo"
            primary
            button
            >GO</sui-button
          >
        </div>
        <label style="color: white" for="">Forgot your password?</label>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export default {};
</script>

<style>
.formulario {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 15%;
}
.fondoForm {
  background-color: #f1f1f1;
  border-radius: 10px;
  padding-top: 10%;
  padding-bottom: 10%;
}

.login {
  padding-right: 50%;
  color: #ffffff;
}

.btnGo {
  padding-left: 20% !important;
  padding-right: 20% !important;
  margin-bottom: 10% !important;
}
</style>
