
<template>

  <div class="login-wrapper">

    <b-alert variant="danger" class="text-center" dismissible :show="!!signupError" @dismissed="signupError=''" >
      {{ signupError }}
    </b-alert>

    <b-card class="mb-2">

      <h4 slot="header" class="card-title">Sign Up</h4>

      <form @submit.prevent="submit">

        <div :class="{ 'form-group': true, 'has-danger': formError.has('name')} ">
          <b-form-input
          name="name" type="text" placeholder="Full Name"
          v-model="creds.name"
          v-validate="'required|alpha_spaces|max: 250|min: 3'"
          ></b-form-input>
          <span v-show="formError.has('name')" class="help form-control-feedback">{{ formError.first('name') }}</span>
        </div>

        <div :class="{ 'form-group': true, 'has-danger': formError.has('username')} ">
          <b-form-input
          name="username" type="text" placeholder="Username"
          v-model="creds.username"
          v-validate="'required|alpha_dash|max: 20|min: 4|verify_user'"
          ></b-form-input>
          <span v-show="formError.has('username')" class="help form-control-feedback">{{ formError.first('username') }}</span>
        </div>

        <div :class="{ 'form-group': true, 'has-danger': formError.has('email')} ">
          <b-form-input
          name="email" type="email" placeholder="Email"
          v-model="creds.email"
          v-validate="'required|email|verify_user'"
          ></b-form-input>
          <span v-show="formError.has('email')" class="help form-control-feedback">{{ formError.first('email') }}</span>
        </div>

        <div :class="{ 'form-group': true, 'has-danger': formError.has('password')} ">
          <b-form-input
          name="password" type="password" placeholder="Password"
          v-model="creds.password"
          v-validate="'required|min: 6|max: 30'"
          ></b-form-input>
          <span v-show="formError.has('password')" class="help form-control-feedback">{{ formError.first('password') }}</span>
        </div>

        <div :class="{ 'form-group': true, 'has-danger': formError.has('confirmPassword')} ">
          <b-form-input
          name="confirmPassword" type="password" placeholder="Comfirm Password"
          v-model="creds.confirmPassword"
          v-validate="'confirmed:password'"
          ></b-form-input>
          <span v-show="formError.has('confirmPassword')" class="help form-control-feedback">{{ formError.first('confirmPassword') }}</span>
        </div>

        <div class="form-group">
          <div class="captchaWrapper" :sitekey="recapt_key"></div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading"  type="submit">

            <pulse-loader class="loaderComp" :loading="loading" color="#ffffff" size="12px"></pulse-loader>

            <span v-show="!loading">Submit</span>
          </button>
        </div>

      </form>

    </b-card>
  </div>

</template>

<script>

  import { mapState } from 'vuex';
  import { Validator } from 'vee-validate';
  import { LOGIN } from '../store/mutation-types';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  import NProgress from 'nprogress';
  import config from '../config';

  export default {

    components: {
      PulseLoader
    },

    data () {

      return {

        signupError: '',

        creds: {
          name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        },

        loading: false,

        recapt_key: config.secrets.reCAPTCHA.site_key

      };

    },

    methods: {

      submit() {

        this.loading = true;
        this.signupError = '';
        NProgress.start();

        this.$validator.validateAll().then(result => {

          //form has errors
          if(!result)
            return this.formDone();

          let captchaResponse = this.$el.querySelector('.g-recaptcha-response').value;

          let credentials = {
            name: this.creds.name,
            username: this.creds.username,
            email: this.creds.email,
            password: this.creds.password,
            confirmPassword: this.creds.confirmPassword,
            'g-recaptcha-response': captchaResponse
          };

          this.$http.post('/api/users/signup', credentials)
          .then(response => {

            this.formDone();

            if( response.data.status !== 'success' ){
              this.signupError = response.data.error;
              return;
            }

            let payLoad = response.data.payLoad;
            console.log(payLoad);

            this.$store.commit(LOGIN, payLoad);
            this.$http.defaults.headers.common.Authorization = `Bearer ${payLoad.access_token}`;

          })
          .catch(errs => {
            this.formDone();
            console.log(errs);
            this.signupError = `${errs.response.status} ${errs.response.statusText}`;
          });

        }).catch(err => {
          this.formDone();
          console.log(err);
        });
      },

      formDone(){
        this.loading = false;
        NProgress.done();
        NProgress.remove();
        if (window.grecaptcha )
            grecaptcha.reset();
      }
    },

    mounted() {

      //https://maketips.net/tip/61/recaptcha-with-vuejs-example
      if (window.grecaptcha )
        grecaptcha.render( this.$el.querySelector('.captchaWrapper'), { sitekey : this.recapt_key });

    },

    created(){

      Validator.extend('verify_user', {
        getMessage: field => `This ${field} is already taken.`,
        validate: value => {
          if( !value ) return false;

          return this.$http.post(`/api/users/available`, { cred: value })
          .then(response => {
           return Promise.resolve(response.data);
         });
        }
      });
    }

  };
</script>

