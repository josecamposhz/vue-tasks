import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './plugins/components';


import axios from "axios";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
