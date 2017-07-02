<template>
  <div>

    {{ msg }}

    <p v-if="response">{{ response }}</p>
    <h2 v-if="errors">{{ errors }}</h2>

  </div>
</template>

<script>

  import { mapGetters } from 'vuex';

  export default {


    data () {
      return {
        msg: 'Welcome to Proteted Data Arena!!',
        errors: null,
        response: ''
      };
    },

    created() {

      if( !this.isLoggedIn ){
        this.$router.replace('/login');
        return;
      }

      this.fetchData();

    },

    computed: {
      ...mapGetters([
        'isLoggedIn',
        'getToken'
      ])
    },

    methods: {

      fetchData(){

        this.$http
          .get('/api/protected')
          .then(response => {
            console.log(response.data);
            this.response = response.data;
          })
          .catch(e => {
            console.log(e);
            this.errors = 'Access Denied';
          });
      }
    }
  };
</script>

