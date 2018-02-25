import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAs9w7l1JOKHOsGBT0k1oPiT7rfRkhP4bg",
  authDomain: "strukturen-fragebogen.firebaseapp.com",
  databaseURL: "https://strukturen-fragebogen.firebaseio.com",
  projectId: "strukturen-fragebogen",
  storageBucket: "strukturen-fragebogen.appspot.com",
  messagingSenderId: "168288290356"
};

firebase.database.enableLogging(false) // toggle on for debug (it's noisy)
export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.database();
