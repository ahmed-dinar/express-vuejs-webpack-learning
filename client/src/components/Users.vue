<template>
  <div>
    {{ msg }}

	<div v-for="user in users">
		{{ user.name }} <br>
		{{ user.email }} <br><br>
	</div>

    <div>Errors: <br>{{ errors }}</div>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to User List!',
      users: [],
      errors: null
    };
  },

  created() {

    this.$http
      .get('/api/users')
      .then(response => {
        console.log(response.data);
        this.users = response.data;
      })
      .catch(e => {
        this.errors = e;
      });
  }

};
</script>

