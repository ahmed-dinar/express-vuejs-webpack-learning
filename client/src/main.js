// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import { sync } from 'vuex-router-sync';
import store from './store';

//axios.defaults.headers.common['Authorization'] = auth.getAuthHeader();

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
