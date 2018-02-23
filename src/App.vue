<template>
  <div id="app">
    <div id="logo"><img src="./assets/logo.png"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
@font-face {
  font-family: 'Meta';
  src: url('assets/metaNormal.ttf');
}

#app {
  font-family: 'Meta', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 2rem;
}
#logo {
  text-align: right;
}
</style>
