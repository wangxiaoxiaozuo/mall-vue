<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
html,
body,
#app {
  height: 100%;
}
</style>
