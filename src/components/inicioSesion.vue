<template>
  <div class="border">
    <br />
    <sui-container>
      <div class="ui one column centered grid">
        <div class="row">
          <div class="column">
            <img class="ui centered small image" src="../assets/V1.png" />
          </div>
        </div>
        <div class="row">
          <div class="two column">
            <div class="ui blue text container segment raised login">
              <form
                autocomplete="off"
                class="ui form"
                method="POST"
                v-on:submit.prevent="onSubmit"
              >
                <div class="field">
                  <h1 class="ui dividing blue header">¡Bienvenido!</h1>
                </div>
                <div class="field">
                  <label>Usuario</label>
                  <input
                    autocomplete="off"
                    v-model="user.username"
                    type="text"
                    name="user"
                    placeholder="User"
                  />
                </div>
                <div class="field">
                  <label>Contraseña</label>
                  <input
                    v-model="user.password"
                    type="password"
                    name="pass"
                    placeholder="Password"
                  />
                </div>
                <div
                  class="ui blue animated button primary boton"
                  tabindex="0"
                  @click="authenticate()"
                >
                  <div class="visible content">Iniciar Sesión</div>
                  <div class="hidden content">
                    <i class="right arrow icon"></i>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </sui-container>
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
  beforeMount() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      let auth = localStorage.getItem("authority");
      if (auth !== null && auth === "ROLE_ADMIN") {
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
              this.$router.push("/admin/productos");
            } else if (authority === "ROLE_CASHIER") {
              this.$router.push("/cajero/abrir-caja");
            }
          }
        })
        .catch((error) => {
          console.log(error.response);
          console.log(error.response.data);
          this.$swal({
            title: "Oops!",
            text: error.response.data,
            icon: "warning",
          });
        });
    },
  },
};
</script>

<style scoped>
.ui.primary.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ui.segment {
  width: 30% !important;
}
.centered-vertically {
  height: 100vh;
  width: 100%;
}
</style>
