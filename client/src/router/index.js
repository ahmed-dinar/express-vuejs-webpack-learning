import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Users from '@/components/Users';
import Countries from '@/components/Countries';
import Login from '@/components/Login';
import Page404 from '@/components/Page404';


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
      path: '/users',
      name: 'User List',
      component: Users
    },
    {
      path: '/countries',
      name: 'Country List',
      component: Countries
    },
    {
      path: '/login',
      name: 'Login Page',
      component: Login
    },
    {
      path: '*',
      component: Page404
    }
  ]
});


router.beforeEach((to, from, next) => {
    console.log(to);
    next();
});



export default router;