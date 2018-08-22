const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const firebaseApp = admin.initializeApp(functions.config().firebase);

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

function addPersonUnlessExists(uid, email) {
  let person = firebaseApp.database().ref(`people/${uid}`)
  person.once('value', (snapshot) => {
    if (!snapshot.exists()) {
      person.set({
        email: email,
        relations: {}
      })
    }
  })
  let relations = firebaseApp.database().ref(`people/${uid}`);
}

function addRelationUnlessExists(uid, person) {
  if (person === undefined || uid === undefined) { return }
  let relations = firebaseApp.database().ref(`people/${uid}`);

  relations.once('value', (snapshot) => {
    let relation_exists = snapshot.val().some((rel) => {
      return rel.contact_mail === person.email;
    });

    if (!relation_exists) {
      relations.push({
        contact: person.name,
        contact_description: '',
        contact_frequency: '1',
        contact_mail: person.email,
        description: '',
        other_role: '',
        role: ''
      });
      console.log(relations)
    }
  });
}

exports.createUserFromRelation = functions.database.ref('/people/{personId}/relations/{relationId}').onWrite((event) => {
  const relation = event.data.val();
  const email = relation.contact_mail;
  const person = event.data.ref.parent.parent
  console.log("Person triggered: ", person);

  return admin.auth().getUserByEmail(email)
    .then((userRecord) => {
      addRelationUnlessExists(userRecord.uid, person);
      return false
    })
    .catch((error) => {
      const regex = /.+@(pfadizueri|korpslimmat|distrikt)\.ch/g;

      if (!regex.test(email)) { return false }

      const token = crypto.randomBytes(33).toString('hex');
      console.log(token)
      return admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: token,
        displayName: token,
        disabled: false
      })
        .then(function (userRecord) {
          console.log(userRecord);
          addRelationUnlessExists(userRecord.uid, person);

          const mailOptions = {
            from: '"Pfadi Züri" <noreply@firebase.com>',
            to: userRecord.email,
          };

          mailOptions.subject = `
            Hallo!
            Du hast diese Email erhalten, da du mit jemanden aus dem Kantonalverband der Pfadi Züri Kontakt hast. Der Pfadi-Kanton-Zürich hat sich als Ziel gesetzt, die Strukturen innerhalb des Kantons zu erfassen. Mit Hilfe dieser Umfrage sollen alle Verbindungen erkannt und dokumentiert werden können vom Abteilungsleitenden bis auf Ebene Kantonalverband.
            Wir bitten dich dir für das Ausfüllen Zeit zu nehmen. Wenn du die Umfrage geöffnet hast erfährst du weitere Informationen wie das Ausfüllen funktioniert. Keine Angst – es ist nicht kompliziert!
            Wir danken dir herzlich für deine Unterstützung!
            Bei Fragen darfst du dich gerne an strukturumfrage@pfadizueri.ch wenden.
          `
          mailOptions.text = `https://strukturen-fragebogen.firebaseapp.com/login?email=${email}&token=${token}`

          return mailTransport.sendMail(mailOptions)
            .catch((error) => console.error('There was an error while sending the email:', error));
        })
        .catch(function (error) {
          console.log("Error creating new user:", error);
        });
    });
});
