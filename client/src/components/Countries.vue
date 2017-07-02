<template>
  <div>

    <b-card no-block  class="mb-2">

      <h4 class="card-title" slot="header">
        <i class="fa fa-globe"></i> Country List
      </h4>

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


  <!-- Modal Component -->
  <b-modal ref="detailModal" size="lg" button-size="sm" ok-only :title="detail.name">

    Name: {{ detail.name }} <br>
    Latitude: {{ detail.latitude }} <br>
    Longitude: {{ detail.longitude }} <br>
    Country Code: {{ detail.countryCode }} <br>

  </b-modal>


</div>
</template>

<script>

  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

  export default {

    data() {
      return {
        msg: 'Welcome to Country List!',
        countries: [],
        errors: null,
        loading: true,
        detail: {},
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


        }, 3000);


      },

      details(item) {

        this.detail = item;
        this.$refs.detailModal.show();
        console.log(JSON.stringify(item));

       // alert(JSON.stringify(item));
      }
    }

};
</script>
