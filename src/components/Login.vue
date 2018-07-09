<template>
  <div>
    <form @submit.prevent='signIn'>
      <label>Deine E-Mail Adresse</label>
      <input v-model="email">
      <br>
      <label>
        <input type="checkbox" v-model="cantonal" required="required">
          Ja, ich bin im Kanton Zürich in der Pfadi
      </label>
      <button type="submit" class="button lg">Fragebogen jetzt ausfüllen</button>
    </form>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  data: function() {
    return {
      email: this.$route.query.email,
      token: this.$route.query.token || "B7fdMbzftCukEjS9JKNOQfoBt8UAmsrQ3thx",
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
