<template>
  <div>
    {{ msg }}

<div v-for="country in countries">
    {{ country.name }} <br>
    {{ country.countryCode }} <br><br>
  </div>


    <div>Errors: <br>{{ errors }}</div>

  </div>
</template>

<script>


export default {

  data () {
    return {
      msg: 'Welcome to Country List!',
      countries: [],
      errors: null
    };
  },


  created() {

    this.$http
      .get('/api/countries')
      .then(response => {
        this.countries = response.data;
      })
      .catch(e => {
        this.errors = e;
      });

  }

};
</script>

