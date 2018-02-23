// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
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
var firebaseApp = firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
}).then(function () {
  console.log("yaayyy");
});
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    console.log(uid);
    // ...
  } else {
    // User is signed out.
    // console.log('lalala');
    // ...
  }
  // ...
});
var db = firebaseApp.database();

/* eslint-disable no-new */
new Vue({

  el: '#app',
  firebase: {
    people: {
      source: db.ref('people'),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  components: { App },
  computed: {
    userId() {
      return
    }
    person() {
      return this.people[0];
    }
  },
  template: '<App/>',
});
