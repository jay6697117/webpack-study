import Vue from 'vue';
import App from './App.vue';
import router from "./router";

//全局css
import './assets/styles/addImage.css';

new Vue({
  router,
  render: h => h(App)
}).$mount('#myApp');
