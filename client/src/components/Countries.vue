<template>
  <div>

    <b-card no-block header="Country List"  class="mb-2">

      <div v-show="loading" class="text-center spinner-wrapper">
        <pulse-loader :loading="loading" color="#398DF0" size="15px"></pulse-loader>
      </div>

      <b-table bordered :items="countries" :fields="fields"  v-if="!loading">

        <template slot="name" scope="item">
          {{item.value}}
        </template>
        <template slot="latitude" scope="item">
          {{item.value}}
        </template>
        <template slot="longitude" scope="item">
          {{item.value}}
        </template>
        <template slot="countryCode" scope="item">
         {{item.value}}
       </template>
       <template slot="actions" scope="item">
        <b-btn size="sm" @click="details(item.item)">Details</b-btn>
      </template>

    </b-table>

  </b-card>

  <div v-if="errors">Errors: <br>{{ errors }}</div>

</div>
</template>

<script>

  import NProgress from 'nprogress';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

  export default {

    data() {
      return {
        msg: 'Welcome to Country List!',
        countries: [],
        errors: null,
        loading: true,
        fields:{
          name:{
            label: 'Name',
            sortable: true
          },
          latitude:{
            label: 'Latitude'
          },
          longitude:{
            label: 'Longitude'
          },
          countryCode:{
            label: 'Code'
          },
          actions: {
            label: 'Actions'
          }
        }
      };
    },

    components: {
      PulseLoader
    },

    created() {

      this.fetchCountryList();

    },

    methods: {

      fetchCountryList(){

        var vm = this;
        vm.loading = true;

        //testing spinner by making 3 seconds delay
        setTimeout(() => {


          vm.$http
          .get('/api/countries')
          .then(response => {
            vm.loading = false;
            vm.countries = response.data;
          })
          .catch(e => {
            vm.loading = false;
            vm.errors = e;
          });


        }, 3000)


      },

      details(item) {
        alert(JSON.stringify(item));
      }
    }

  };
</script>

