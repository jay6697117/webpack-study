import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../components/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    component: () => import('../components/Home.vue'),
    children: [
      {
        path: '/page1',
        name: 'Page1',
        component: () => import('../components/Page1.vue')
      },
      {
        path: '/page2',
        name: 'Page2',
        component: () => import('../components/Page2.vue')
      },
      {
        path: '/page3',
        name: 'Page3',
        component: () => import('../components/Page3.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
