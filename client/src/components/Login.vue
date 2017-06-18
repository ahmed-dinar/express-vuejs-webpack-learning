
<template>
  <div class="col-sm-4 col-sm-offset-4">

    <div class="alert alert-danger" v-if="errros">
      <p>{{ errros }}</p>
    </div>

    <h2>Log In</h2>

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
    <button class="btn btn-primary" @click="submit()">Submit</button>


  </div>
</template>

<script>

  import { LOGIN } from '../store/mutation-types';

  export default {


    data () {

      return {

        credentials: {
          username: '',
          password: ''
        }

      };

    },

    methods: {

      submit() {

        let credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        };

        console.log(credentials);


        this.$store.dispatch('login', credentials);

      }
    },

    computed: {

      errros(){
        return this.$store.getters.errors;
      }
    }

  };
</script>

