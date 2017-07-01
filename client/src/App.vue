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

<style>


  body{

    margin: 0px ;

    font-family: 'Source Sans Pro', sans-serif;

    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    color: #333;
    background: #F7F7F7;
  }

  .main-content
  {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .table > tbody > tr > td{
    vertical-align: middle;
  }

  .spinner-wrapper{
    padding: 20px;
  }

  .card-title{
    margin-bottom: 0;
  }

  h4{
    font-size: 18px;
  }

  h5{
    font-size: 14px;
  }

  h6{
    font-size: 12px;
  }

  .login-wrapper{
    width: 345px;
    margin:  0 auto;
    margin-top: 50px;
  }


  button{
    cursor: pointer;
  }

  .form-control{
    font-size: 14px;
    border-radius: 2px;
  }

/*
https://stackoverflow.com/questions/2610497/change-an-html5-inputs-placeholder-color-with-css
*/
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  opacity: 0.6 !important;
}
::-moz-placeholder { /* Firefox 19+ */
  opacity: 0.6 !important;
}
:-ms-input-placeholder { /* IE 10+ */
  opacity: 0.6 !important;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
 opacity: 0.6 !important;
}
:-moz-placeholder { /* Firefox 18- */
 opacity: 0.6 !important;
}




</style>