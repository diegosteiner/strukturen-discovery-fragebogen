// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueFire from 'vuefire';
import firebase from 'firebase';

Vue.config.productionTip = false;

// explicit installation required in module environments
Vue.use(VueFire);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAs9w7l1JOKHOsGBT0k1oPiT7rfRkhP4bg",
  authDomain: "strukturen-fragebogen.firebaseapp.com",
  databaseURL: "https://strukturen-fragebogen.firebaseio.com",
  projectId: "strukturen-fragebogen",
  storageBucket: "strukturen-fragebogen.appspot.com",
  messagingSenderId: "168288290356"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
