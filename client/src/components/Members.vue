<template>
  <div>

    <b-card no-block header="Member List"  class="mb-2">

      <div v-show="loading" class="text-center spinner-wrapper">
        <pulse-loader :loading="loading" color="#398DF0" size="15px"></pulse-loader>
      </div>

      <b-table :items="members" :fields="fields" v-if="!loading">

        <template slot="name" scope="item">
          {{item.value}}
        </template>
        <template slot="country" scope="item">
          {{item.value}}
        </template>
        <template slot="email" scope="item">
          {{item.value}}
        </template>
        <template slot="phone" scope="item">
         {{item.value}}
       </template>

     </b-table>
   </b-card>

   <div v-if="errors">Errors: <br>{{ errors }}</div>

 </div>
</template>

<script>

  import axios from 'axios';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

  export default {
    name: 'hello',

    components: {
      PulseLoader
    },

    data () {
      return {
        msg: 'Welcome to User List!',
        members: [],
        errors: null,
        loading: true,
        fields:{
          name:{
            label: 'Name'
          },
          country:{
            label: 'Country'
          },
          email:{
            label: 'Email'
          },
          phone:{
            label: 'Phone'
          }
        }
      };
    },

    created() {
      this.fetchMemberList();
    },


    methods: {

      fetchMemberList(){

        this.loading = true;

        this.$http
        .get('/api/members')
        .then(response => {
          console.log(response.data);
          this.loading = false;
          this.members = response.data;
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
          this.errors = e;
        });
      }
    }
  };
</script>

