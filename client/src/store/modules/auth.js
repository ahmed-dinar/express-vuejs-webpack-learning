
import axios from 'axios';
import * as muts from '../mutation-types';
import router from '../../router';
import has from 'has';
import Vue from 'vue';

const state = {
	authenticated: false,
	errors: '',
	data: {}
};

const getters ={
	isLoggedIn: state => {
		return state.authenticated;
	},
  getToken: state => {
    return has(state.data,'access_token') ? 'Bearer ' + state.data.access_token : null;
  }
};


const mutations = {

	[muts.LOGIN] (state, data) {
		state.authenticated = true;
		state.data = data;
		state.errors = '';
	},

	[muts.LOG_OUT] (state) {
		state.authenticated = false;
		state.data = {};
		state.errors = '';
	},

	[muts.LOGIN_FAILURE] (state, err) {
		state.authenticated = false;
		state.data = {};
		state.errors = err;
	},

	[muts.FLASH] (state) {
		state.errors = '';
	}
};


const actions = {

	login({ commit }, creds) {

   axios.post('/api/login', creds)
     .then( res => {

      console.log(res.data);

      if( res.data.status !== 'success' ){
        commit(muts.LOGIN_FAILURE, res.data.error);
        return;
      }

      console.log(res.data.data.access_token);

      commit(muts.LOGIN, res.data.data);
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.access_token}`;
      router.replace('/protected');
    })
     .catch( err => {
      console.log(err);
      commit(muts.LOGIN_FAILURE, err);
    });

 },

 logOut({ commit }) {
  commit(muts.LOG_OUT);
  router.replace('/login');
}

};

export default {
	state,
	getters,
	actions,
	mutations
};