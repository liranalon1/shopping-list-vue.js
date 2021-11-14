import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import App from './App.vue'
import './styles/reset.css';
import './styles/general.css';
import List from './List.vue'
import ItemPage from './ItemPage.vue'

Vue.component('app-list', List);
Vue.component('app-item-page', ItemPage);

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: routes,
  render: h => h(App)
})
