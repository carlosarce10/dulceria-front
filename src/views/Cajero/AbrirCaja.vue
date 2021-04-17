<template>
  <sui-container>
    <div class="ui grid middle aligned centered-vertically">
      <div class="row">
        <div class="column">
          <div class="ui text container segment basic">
            <sui-card class="centered">
              <sui-card-content>
                <sui-card-header>Abrir Caja</sui-card-header>
              </sui-card-content>
              <sui-card-content>
                <label class="custom-label">Introduzca un monto inicial:</label>
                <sui-input
                  fluid
                  type="text"
                  v-model="$v.initialAmount.$model"
                  :class="status($v.initialAmount)"
                  @keypress="numberOnly"
                />
                <div
                  class="error errorMsg"
                  v-if="!$v.initialAmount.required && $v.initialAmount.$dirty"
                >
                  El monto inicial es requerido
                </div>
                <div class="error errorMsg" v-if="!$v.initialAmount.between">
                  El monto inicial debe ser de un rango entre $0 - $100
                </div>
                <br />
                <label class="custom-label"
                  >Introduzca el número de caja:</label
                >
                <sui-input
                  fluid
                  type="text"
                  v-model="$v.cashboxNumber.$model"
                  :class="status($v.cashboxNumber)"
                  @keypress="numberOnly"
                />
                <div
                  class="error errorMsg"
                  v-if="!$v.cashboxNumber.required && $v.cashboxNumber.$dirty"
                >
                  El número del cajero es requerido
                </div>
                <div class="error errorMsg" v-if="!$v.cashboxNumber.minValue">
                  El número del cajero no debe ser menor a 1
                </div>
              </sui-card-content>
              <sui-card-content extra>
                <sui-button
                  class="btn-color"
                  fluid
                  size="large"
                  @click.native="continuar()"
                  content="Continuar"
                  :disabled="
                    !(
                      !$v.initialAmount.$invalid &&
                      $v.initialAmount.$dirty &&
                      !$v.cashboxNumber.$invalid &&
                      $v.cashboxNumber.$dirty
                    )
                  "
                />
                <br />
                <sui-button
                  color="blue"
                  fluid
                  size="large"
                  @click.native="salir()"
                  content="Salir"
                />
              </sui-card-content>
            </sui-card>
          </div>
        </div>
      </div>
    </div>
    <fondo />
  </sui-container>
</template>
<script>
import fondo from "../../components/fondo";
import Particles from "particles.vue";
import Vue from "vue";
import api from "../../util/api";
import VueRouter from "vue-router";
import { required, between, minValue } from "vuelidate/lib/validators";
Vue.use(VueRouter);
Vue.use(Particles);

export default {
  name: "abrirCaja",
  components: {
    fondo,
  },
  data() {
    return {
      cantidad: 0,
      cashbox: {
        id: 0,
        amount: 0,
        cashboxNumber: 0,
        date: "",
        endTime: "",
        initialAmount: 0,
        startTime: "",
        totalSales: 0,
        withdrawal: "",
        user: {
          id: 0,
          username: "",
        },
      },
      initialAmount: 0,
      cashboxNumber: 0,
    };
  },
  beforeMount() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      let auth = localStorage.getItem("authority");
      if (auth !== null && auth === "ROLE_CASHIER") {
        let idCashbox = localStorage.getItem("idCashbox");
        if (idCashbox !== null) {
          this.$router.push("/cajero");
        }
      } else {
        this.$router.push("/");
      }
    } else {
      localStorage.clear();
      this.$router.push("/");
    }
  },
  methods: {
    continuar() {
      this.cashbox = {
        initialAmount: this.initialAmount,
        cashboxNumber: this.cashboxNumber,
      };
      api
        .doPost("/cashbox/open/box", this.cashbox)
        .then((response) => {
          console.log(response);
          localStorage.setItem("idCashbox", response.data.id);
          localStorage.setItem("cashboxNumber", response.data.cashboxNumber);
          this.$router.push("/cajero");
        })
        .catch((e) => {
          console.log(e);
        });

      //this.$router.push({name: "AbrirCaja", params: { cantidad: cant }});
    },
    salir() {
      this.$router.push({ name: "Home" });
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    numberOnly() {
      let pattern = /[0-9.]/;
      let res = event.key.match(pattern);
      if (!res) {
        event.preventDefault();
        return false;
      }
    },
  },
  validations: {
    initialAmount: {
      required,
      between: between(0, 1000),
    },
    cashboxNumber: {
      required,
      minValue: minValue(1),
    },
  },
};
</script>
<style scoped>
.btn-color {
  background-color: #64a6d9;
  color: #fff;
  text-shadow: none;
  background-image: none;
}

.btn-color:hover {
  background-color: #5a94c1;
  color: #fff;
}

.centered-vertically {
  height: 100vh;
  width: 100%;
}

.custom-label {
  display: block;
  margin: 0 0 0.28571429rem 0;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.92857143em;
  font-weight: 700;
  text-transform: none;
  font-size: 1em;
}
</style>