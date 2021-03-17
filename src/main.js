import Vue from "vue";
import App from "./App.vue";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(SuiVue);
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
