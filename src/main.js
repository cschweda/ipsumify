// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";

import Vuetify from "vuetify";
Vue.use(Vuetify);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // store,
  render: h => h(App)
});
