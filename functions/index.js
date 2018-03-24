const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);

// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

exports.createUserFromRelation = functions.database.ref('/people/{personId}/relations/{relationId}').onWrite((event) => {
  const relation = event.data.val();
  const email = relation.contact_mail;
  // const person = event.data.ref.parent
  // console.log("Person triggered: ", person);

  return admin.auth().getUserByEmail(email)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      // console.log("User exists: ", userRecord.toJSON());
      return false
    })
    .catch(function (error) {
      const regex = /.+@(pfadizueri|korpslimmat|distrikt)\.ch/g;

      if (!regex.test(email)) { return false }

      const token = crypto.randomBytes(33).toString('hex');
      return admin.auth().createUser({
        email: email,
        emailVerified: false,
        // phoneNumber: "+11234567890",
        password: token,
        displayName: token,
        // photoURL: "http://www.example.com/12345678/photo.png",
        disabled: false
      })
        .then(function (userRecord) {
          // return admin.auth().sendPasswordResetEmail(email).then(function () {
          //   return true
          // }).catch(function (error) {
          //   console.log("Error creating new user:", error);
          // });

          const mailOptions = {
            from: '"Pfadi Züri" <noreply@firebase.com>',
            to: userRecord.email,
          };

          mailOptions.subject = 'Fülle jetzt die Umfrage zu den Strukturen innerhalb der Pfadi aus!'
          mailOptions.text = `https://strukturen-fragebogen.firebaseapp.com/login?email=${email}&token=${token}`

          return mailTransport.sendMail(mailOptions)
            .catch((error) => console.error('There was an error while sending the email:', error));
        })
        .catch(function (error) {
          console.log("Error creating new user:", error);
        });
    });
});
