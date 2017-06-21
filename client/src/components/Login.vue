
<template>
  <div class="login-wrapper">

    <b-alert variant="danger" dismissible :show="errros" >
      {{ errros }}
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
      <button class="btn btn-primary" @click="submit()">Submit</button>

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
        }

      };

    },

    methods: {

      submit() {

        let credentials = {
          username: this.credentials.username,
          password: this.credentials.password,
        };

        console.log(credentials);

        this.$store.dispatch('login', credentials);

      }
    },

    computed: {

      ...mapState({
        errros: state => state.auth.errors
      })

    }

  };
</script>

<style>
  .login-wrapper{
    width: 350px;
    margin:  0 auto;
    margin-top: 100px;
  }
</style>