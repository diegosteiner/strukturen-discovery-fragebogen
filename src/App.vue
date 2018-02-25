<template>
  <div id="app">
    <person v-model="person"></person>
  </div>
</template>

<script>
import Person from "./components/Person";
export default {
  name: "App",
  components: { person: Person },
  data() {
    return {
      person: this.$root.person
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
