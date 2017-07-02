<template>


	<div id="app">

    <b-navbar toggleable type="inverse" variant="inverse">
      <div class="container">
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>

        <b-link class="navbar-brand" :to="{ path: '/' }">
          <span>Vue Learning</span>
        </b-link>

        <b-collapse is-nav id="nav_collapse">

          <b-nav is-nav-bar>
            <b-nav-item :to="{ path: '/' }" exact><i class="fa fa-home" aria-hidden="true"></i> Home</b-nav-item>
            <b-nav-item :to="{ path: '/members' }" exact><i class="fa fa-users" aria-hidden="true"></i> Members</b-nav-item>
            <b-nav-item :to="{ path: '/countries' }" exact><i class="fa fa-globe" aria-hidden="true"></i> Countries</b-nav-item>
            <b-nav-item :to="{ path: '/protected' }" exact><i class="fa fa-lock" aria-hidden="true"></i> Protected</b-nav-item>
          </b-nav>

          <b-nav is-nav-bar class="ml-auto">

            <template v-if="isLoggedIn">
              <b-nav-item-dropdown right>

                <!-- Using text slot -->
                <template slot="text">
                  <span style="font-weight: bold;">{{ user.username  }}</span>
                </template>

                <b-dropdown-item @click="logOut">Signout</b-dropdown-item>
              </b-nav-item-dropdown>
            </template>

            <template v-else>
              <b-nav-item :to="{ path: '/login' }" exact>Login</b-nav-item>
              <b-nav-item :to="{ path: '/register' }" exact>Register</b-nav-item>
            </template>

          </b-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <div class="container main-content">
      <router-view></router-view>
    </div>

  </div>

</template>

<script>

 import { mapState, mapActions } from 'vuex';

 export default {
   name: 'app',


   data() {

     return {

     };
   },

   computed: {

     ...mapState({
       isLoggedIn: state => state.auth.authenticated,
       user: state => state.auth.data
     })

   },

   methods:{

     ...mapActions([
       'logOut'
     ])
   }
};
</script>
