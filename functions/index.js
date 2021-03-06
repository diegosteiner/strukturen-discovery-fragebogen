const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const firebaseApp = admin.initializeApp(functions.config().firebase);
const mailTransport = nodemailer.createTransport(functions.config().smtp.url);

function addRelationUnlessExists(uid, email, adding_person) {
  var added_person_ref = firebaseApp.database().ref(`people/${uid}`)
  added_person_ref.once('value', (added_person) => {

    if (added_person.exists()) {
      console.log("Added Person: " + added_person.val());
      let relations = added_person_ref.child('relations');
      relations.once('value', (snapshot) => {
        relationSnapshot = snapshot.val()
        var relation_exists = false
        for (var i in relationSnapshot) {
          if (relationSnapshot.hasOwnProperty(i)) {
            let rel = relationSnapshot[i];
            console.log(rel.contact_mail + '===' + adding_person.email);
            if (rel.contact_mail === adding_person.email) {
              relation_exists = true
            }
          }
        }

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
        moreEmails: '',
        name: '',
        description: '',
        my_role: '',
        relations: {
          0: {
            contact: (adding_person.name || ''),
            contact_description: '',
            contact_frequency: '1',
            contact_mail: (adding_person.email || ''),
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
        // const regex = /.+@(pfadizueri|korpslimmat|distrikt)\.ch/g;
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

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
              from: '"Pfadi Züri" <struktur@pfadizueri.ch>',
              to: userRecord.email,
            };

            mailOptions.subject = `Fragebogen der Pfadi Züri`
            mailOptions.text = `Hallo!

Du hast diese Einladung erhalten, da du mit jemanden innerhalb des Kantonalverbands von Zürich Kontakt hast. Die Pfadi Züri hat sich als Ziel gesetzt, die Strukturen innerhalb des Kantons zu erfassen. Mit Hilfe dieser Umfrage sollen alle Verbindungen erkannt und dokumentiert werden können, vom Abteilungsleitenden bis zum Kantonsleitenden.
Wir bitten dich dir für das Ausfüllen Zeit zu nehmen. Wenn du die Umfrage geöffnet hast erfährst du weitere Informationen wie das Ausfüllen funktioniert. Keine Angst – es ist nicht kompliziert!

Wir danken dir herzlich für deine Unterstützung!

Die häufigsten Fragen werden im FAQ auf https://strukturen-fragebogen.firebaseapp.com/faq beantwortet, und natürlich darfst du dich auch gerne per Mail an strukturumfrage@pfadizueri.ch wenden.

https://strukturen-fragebogen.firebaseapp.com/login?email=${email}&token=${token}`

            return mailTransport.sendMail(mailOptions)
              .catch((error) => console.error('There was an error while sending the email:', error));
          })
          .catch(function (error) {
            console.log("Error creating new user:", error);
          });
      });
  });
});
