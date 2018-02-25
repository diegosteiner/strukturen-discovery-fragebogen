<template>
  <div>
    <h1>Login</h1>
    <div id="mainForm">
      <form @submit.prevent='signIn'>
        <label>E-Mail Adresse</label>
        <input v-model="email">
        <button type="submit" class="button">Login</button>
      </form>
  </div>
  </div>
</template>

<script>
import Firebase from "firebase";

export default {
  data: function() {
    return {
      email: this.$route.query.email,
      token: this.$route.query.token || "B7fdMbzftCukEjS9JKNOQfoBt8UAmsrQ3thx"
    };
  },
  methods: {
    signIn: function() {
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
