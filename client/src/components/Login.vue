
<template>
  <div class="login-wrapper">

    <b-alert variant="danger" class="text-center" dismissible :show="!!errors" @dismissed="errors=''" >
      {{ errors }}
    </b-alert>

    <b-card  header="Sign In"  class="mb-2">

      <div class="form-group">
        <input
        type="text"
        class="form-control"
        placeholder="Username"
        v-model="credentials.username"
        >
      </div>
      <div class="form-group">
        <input
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="credentials.password"
        >
      </div>
      <button class="btn btn-success btn-block" @click="submit()">Submit</button>

    </b-card>
  </div>
</template>

<script>

  import { mapState } from 'vuex';

  export default {


    data () {

      return {

        credentials: {
          username: '',
          password: ''
        },

        errors: ''

      };

    },

    methods: {

      submit() {

        var vm = this;

        let credentials = {
          username: vm.credentials.username,
          password: vm.credentials.password,
        };

        console.log(credentials);

        vm.$store.dispatch('login', credentials)
        .catch(err => {
          vm.errors = err;
        });

      }
    }

  };
</script>

