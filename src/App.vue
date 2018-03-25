<template>
  <div id="app">
    <router-view/>
    <div id="logo"><img src="./assets/logo.png"></div>
  </div>
</template>

<script>
import Person from "./components/Person";
export default {
  created() {
    this.$store.dispatch("setUser");
    this.$store.dispatch("getPersonFromDatabase");
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
  margin: 5vw;
}
#logo {
  text-align: right;
}
</style>
