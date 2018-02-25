<template>
  <div id="app">
    <router-view/>
    <div id="logo"><img src="./assets/logo.png"></div>
  </div>
</template>

<script>
import Person from "./components/Person";
export default {
  methods: {
    setUser: function() {
      this.$store.dispatch("setUser");
    }
  },
  created() {
    this.setUser();
  }
};
</script>

<style>
@font-face {
  font-family: "Meta";
  src: url("assets/metaNormal.ttf");
}

#app {
  font-family: "Meta", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 2rem;
}
#logo {
  text-align: right;
}
</style>
