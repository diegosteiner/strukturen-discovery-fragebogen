<template>
  <div id="app">
    <div id="logo">
      <img src="./assets/logo.png">
    </div>
    <main>
      <h1>Umfrage abgeschlossen</h1>Die Umfrage ist abgeschlossen und wird nun ausgewertet. Vielen Dank für deine Mitarbeit bei diesem Projekt!
    </main>
  </div>
</template>

<script>
export default {
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

#app > main {
  padding-top: 100px;
  margin-bottom: 200vh;
}

label {
  margin: 0.5rem 0 0.25rem 0;
  display: block;
}

input,
select,
button,
textarea,
.v-select {
  max-width: 480px;
}

input,
select,
textarea {
  border: 1px solid gray;
  padding: 0.35rem;
  display: block;
  width: 100%;
  box-sizing: border-box;
  line-height: 24px;
  border-color: #2c3e50;
}

input[type="checkbox"] {
  display: inline-block;
  width: initial;
  border: none;
}

.icon {
  width: 12px;
  margin: 1px;
  padding-right: 2px;
  float: left;
}
#logo {
  float: right;
}

.lg {
  font-size: 1.25rem;
  padding: 1rem;
  height: auto;
}

.button {
  /* height: 35px; */
  background-color: rgb(15, 105, 175);
  color: white;
  border: none;
  padding: 0.5rem;
  margin-top: 10px;
}

.v-select {
  font-family: "Meta", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  font-size: 0.75rem !important;
}
.v-select .dropdown-toggle {
  border-radius: 0px;
  border-color: #2c3e50;
}
</style>
