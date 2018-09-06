<template>
  <div v-if='relation'>
    <h1>Umfrage Strukturen Pfadi Züri</h1>
    <p>
      Wir möchten den Aufbau unseres Kantonalverbandes (Pfadi Züri) besser verstehen. Daher möchten wir gerne wissen, wer warum und wie mit wem in Kontakt steht. Dafür benötigen wir deine Hilfe! Bitte füll diesen Fragebogen möglichst genau aus – vielen Dank!
    </p>
    <form @submit.prevent='signIn'>
      <label>Deine E-Mail Adresse</label>
      <input v-model="email">
      <br>
      <div v-if='token === "" || token === undefined'>
        <label>Passwort</label>
        <input v-model="token">
        <br>
      </div>
      <label>
        <input type="checkbox" v-model="cantonal" required="required">
          Ja, ich bin im Kanton Zürich in der Pfadi
      </label>
      <button type="submit" class="button lg">Fragebogen jetzt ausfüllen</button>
      <br />(Dauert ca. 10 Minuten)
    </form>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  data: function() {
    return {
      email: this.$route.query.email,
      token: this.$route.query.token,
      cantonal: false
    };
  },
  methods: {
    signIn: function() {
      if (!this.cantonal) {
        return;
      }
      Firebase.auth()
        .signInWithEmailAndPassword(this.email, this.token)
        .then(
          user => {
            this.$router.replace("/");
          },
          error => {
            alert(error.message);
          }
        );
    }
  }
};
</script>
