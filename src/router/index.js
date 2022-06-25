import Vue from 'vue';
import VueRouter from 'vue-router';
import userRoute from './routes/user.route';

Vue.use(VueRouter);

const routes = [
  ...userRoute,
  {
    path: '/home',
    alias: '/',
    name: 'Home',
    meta: {
      breadcrumb: [{ title: 'Beranda', active: true }],
      title: 'Beranda',
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log('to: ', to);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) next();
    else next('/login');
  } else {
    const accessToken = localStorage.getItem('accessToken');
    if (to.path === '/login' && accessToken) next('/home');
    else next();
  }
});

export default router;
