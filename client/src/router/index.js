import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Members from '@/components/Members';
import Countries from '@/components/Countries';
import Login from '@/components/Login';
import SingUp from '@/components/SingUp';
import Protected from '@/components/Protected';
import Page404 from '@/components/Page404';
import store from '@/store';
import NProgress from 'nprogress';


Vue.use(Router);

const router = new Router({

  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/members',
      name: 'User List',
      component: Members
    },
    {
      path: '/countries',
      name: 'Country List',
      component: Countries
    },
    {
      path: '/login',
      name: 'SingIn',
      component: Login
    },
    {
      path: '/register',
      name: 'SingUp',
      component: SingUp
    },
    {
      path: '/protected',
      name: 'ProtectedData',
      component: Protected,
      meta: {
        auth: true,
      }
    },
    {
      path: '*',
      component: Page404
    }
  ]
});


router.beforeEach((to, from, next) => {

  NProgress.start();

  console.log(to);

  if( (to.name === 'SingIn' || to.name === 'SingUp') && store.getters.isLoggedIn )
    router.replace({ path: '/' });

  if( to.matched.some(record => record.meta.auth) && !store.getters.isLoggedIn )
    router.replace({ path: '/login' });

  next();
});


router.afterEach((to,from) => {
  NProgress.done();
  NProgress.remove();
});


export default router;