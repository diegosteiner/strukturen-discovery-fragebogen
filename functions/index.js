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

function addRelationUnlessExists(uid, email, adding_person) {
  var added_person_ref = firebaseApp.database().ref(`people/${uid}`)
  added_person_ref.once('value', (added_person) => {
    console.log("Added Person: " + added_person);

    if (added_person.exists()) {
      let relations = added_person_ref.child('relations');
      relations.once('value', (snapshot) => {
        console.log(snapshot.val());
        var relation_exists = false
        snapshot.val().forEach((rel) => {
          if (rel.contact_mail === added_person.email) {
            relation_exists = true
          }
        })

        if (!relation_exists) {
          relations.push({
            contact: adding_person.name || '',
            contact_description: '',
            contact_frequency: '1',
            contact_mail: adding_person.email || '',
            description: '',
            other_role: '',
            role: ''
          });
        }
      });
    } else {
      added_person_ref.set({
        email: email,
        relations: {
          0: {
            contact: adding_person.name,
            contact_description: '',
            contact_frequency: '1',
            contact_mail: adding_person.email,
            description: '',
            other_role: '',
            role: ''
          }
        }
      });
    }
  });
}

exports.createUserFromRelation = functions.database.ref('/people/{personId}/relations/{relationId}').onWrite((event) => {
  const relation = event.data.val();
  if (relation === null) { return false; }
  const email = relation.contact_mail;
  return event.data.ref.parent.parent.once('value').then((adding_person) => {
    console.log(adding_person.val())

    return admin.auth().getUserByEmail(email)
      .then((userRecord) => {
        addRelationUnlessExists(userRecord.uid, userRecord.email, adding_person.val());
        return false
      })
      .catch((error) => {
        const regex = /.+@(pfadizueri|korpslimmat|distrikt)\.ch/g;

        if (!regex.test(email)) { return false }

        const token = crypto.randomBytes(33).toString('hex');
        return admin.auth().createUser({
          email: email,
          emailVerified: false,
          password: token,
          displayName: token,
          disabled: false
        })
          .then(function (userRecord) {
            addRelationUnlessExists(userRecord.uid, userRecord.email, adding_person.val());

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
});
