// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueFire from 'vuefire';
import firebase from 'firebase';
import { db } from './services/firebase';

Vue.config.productionTip = false;

// explicit installation required in module environments
Vue.use(VueFire);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  beforeCreate: function () {

    // Setup Firebase onAuthStateChanged handler
    //
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.user = user
        // https://github.com/vuejs/vuefire/blob/master/src/vuefire.js#L169
        this.$bindAsObject('person', db.ref('people/' + user.uid))
      } else {
        // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAnonymously
        firebase.auth().signInAnonymously().catch(console.error)
      }
    }.bind(this))

  },
  components: { App },
  data: {
    user: {},
    person: {}
  },
  template: '<App/>',
});
