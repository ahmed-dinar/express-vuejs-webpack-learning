<template>


	<div id="app">

		<nav class="navbar navbar-inverse">
			<div class="container">
				<ul class="nav navbar-nav">
					<li><router-link :to="{ path: '/users' }" replace>Users</router-link></li>
					<li><router-link :to="{ path: '/countries' }" replace>Countries</router-link></li>
					<li><router-link :to="{ path: '/login' }" replace>Login</router-link></li>
				</ul>
			</div>
		</nav>

		<h2>{{ isLoggedIn  }}</h2>

		<router-view></router-view>

	</div>

</template>

<script>
	export default {
	  name: 'app',

	  data() {

	    return {
 
	    };
	  },

	  computed: {
	    isLoggedIn(){
	      return this.$store.getters.isLoggedIn;
	    }
	  }
	};
</script>

