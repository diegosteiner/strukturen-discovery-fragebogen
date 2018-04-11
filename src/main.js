// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Login from './components/Login.vue';
import Person from './components/Person.vue';
// import VueFire from 'vuefire';
import Firebase from 'firebase';
import { db } from './services/firebase';
import { store } from './store';
import VueRouter from 'vue-router';
import vSelect from 'vue-select'

// Vue.use(VueFire);
Vue.use(VueRouter);
Vue.component('v-select', vSelect)

const router = new VueRouter({
  routes: [{
    path: '',
    name: 'Person',
    component: Person
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }],
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.name != 'login' && Firebase.auth().currentUser == null) {
    next('/login');
  } else {
    next();
  }
});

/* eslint-disable no-new */
// store: store,
Firebase.auth().onAuthStateChanged(function (user) {
  new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App)
  });
});
