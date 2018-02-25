const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');

admin.initializeApp(functions.config().firebase);

exports.createUserFromRelation = functions.database.ref('/people/{personId}/relations/{relationId}').onWrite((event) => {
  const relation = event.data.val();
  // console.log("Relation triggered: ", relation);

  return admin.auth().getUserByEmail(relation.contact_mail)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      // console.log("User exists: ", userRecord.toJSON());
      return false
    })
    .catch(function (error) {
      const token = crypto.randomBytes(33).toString('hex');
      admin.auth().createUser({
        email: relation.contact_mail,
        emailVerified: false,
        // phoneNumber: "+11234567890",
        password: token,
        displayName: token,
        // photoURL: "http://www.example.com/12345678/photo.png",
        disabled: false
      })
        .catch(function (error) {
          console.log("Error creating new user:", error);
        });
    });

  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  // return event.data.ref.parent.child('uppercase').set(uppercase);
});
