// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { sync } from 'vuex-router-sync';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import axios from 'axios';

import store from './store';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.css';
import 'nprogress/nprogress.css';
import './assets/style.css';
import './assets/fonts/fonts.css';


sync(store, router);

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.headers.common.Authorization = store.getters.getToken;
Vue.config.productionTip = false;


Vue.use(BootstrapVue);
Vue.use(VeeValidate, {
  errorBagName: 'formError',
  fieldsBagName: 'formFields'
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
