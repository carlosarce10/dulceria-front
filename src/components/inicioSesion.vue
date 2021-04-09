<template>
  <div class="border">
    <form v-on:submit.prevent="onSubmit" class="formulario">
      <div class="fondoForm">
        <h2 class="login">Inicio</h2>
        <div class="field" style="padding-top: 5%">
          <div class="ui left icon input">
            <input
              v-model="user.username"
              type="text"
              placeholder="Usuario"
            /><i class="user icon"></i>
          </div>
        </div>
        <div class="field" style="padding-top: 10%; padding-bottom: 10%">
          <div class="ui left icon input">
            <input
              v-model="user.password"
              type="password"
              placeholder="*******"
            /><i class="lock icon"></i>
          </div>
        </div>
        <div>
          <sui-button @click="authenticate()" class="btnGo" primary button
            >GO</sui-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import api from "../util/api";

Vue.use(VueRouter);
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  beforeMount(){
    let token = localStorage.getItem("token");
    if(token !== null){
      let auth = localStorage.getItem("authority");
      if(auth !== null && auth === 'ROLE_ADMIN'){
        this.$router.push("/admin/productos");
      }
    }
  },
  methods: {
    authenticate() {
      console.log(this.user);
      api
        .doPost("/login", this.user)
        .then((response) => {
          if (response.data.token !== null || response.data.token !== "") {
            let authority = JSON.stringify(
              response.data.authorities[0].authority
            );

            let username = JSON.stringify(response.data.username);
            let token = JSON.stringify(response.data.token);

            token = token.substring(1, token.length - 1);
            username = username.substring(1, username.length - 1);
            authority = authority.substring(1, authority.length - 1);

            localStorage.setItem("authority", authority);
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);

            if (authority === "ROLE_ADMIN") {
              this.$router.push("admin/productos");
            } else if (authority === "ROLE_CASHIER") {
              this.$router.push("cajero");
            }
          }
        })
        .catch((error) => {
          console.log(error.response);
          console.log(error.response.data);
          this.$swal({
            title: "Oops!",
            text: error.response.data,
            icon: "warning"
          });
        });
    },
  },
};
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
  color: #64b5f6;
}

.btnGo {
  padding-left: 20% !important;
  padding-right: 20% !important;
  margin-bottom: 10% !important;
}
</style>
