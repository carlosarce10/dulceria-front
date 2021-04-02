import Vue from "vue";
import App from "./App.vue";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Vuelidate from "vuelidate";

const options = {
  confirmButtonColor: "#64b5f6",
  cancelButtonColor: "#ff7674",
};

Vue.config.productionTip = false;
Vue.use(SuiVue);
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2, options);
Vue.use(Vuelidate);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
