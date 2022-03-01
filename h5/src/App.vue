<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: '微软雅黑';
  }
  html,body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  #app {
    width: 3.75rem;
    height: 100%;
    overflow: hidden;
  }
</style>
