import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
import { LOGIN, LOG_OUT, LOGIN_FAILURE, FLASH } from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
  	auth: {
  	  authenticated: false,
      error: '',
  	  data: {}
  	}
  },

  getters: {
    isLoggedIn: state => {
      return state.auth.authenticated;
    },
    errors: state => {
      return state.auth.error;
    },
  },

  mutations: {

  	[LOGIN] (state, data) {
  	  state.auth.authenticated = true;
  	  state.auth.data = data;
      state.auth.error = '';
  	},

  	[LOG_OUT] (state) {
      state.auth.authenticated = false;
      state.auth.data = {};
      state.auth.error = '';
    },

    [LOGIN_FAILURE] (state, err) {
      state.auth.authenticated = false;
      state.auth.data = {};
      state.auth.error = err;
    },

    [FLASH] (state) {
  	  state.auth.error = '';
  	}
  },

  actions: {

  	login({ commit }, creds) {

  	  axios.post("/api/login", creds)
      .then( res => {

          console.log(res.data);

          if( res.data.status !== 'success' ){
            commit(LOGIN_FAILURE, res.data.error);
            return;
          }

          console.log(res.data.data.access_token);

          axios.defaults.headers.common['Authorization'] = 'Bearer ' +  res.data.data.access_token;
          commit(LOGIN, res.data.data);

	    }).catch( err => {
        console.log('catches:');
	      console.log(err);
	    });
  	}
  },

  plugins: [ createPersistedState({
    paths: ['auth']
  })]

});