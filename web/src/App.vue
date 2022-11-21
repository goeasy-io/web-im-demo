<template>
    <div id="app" @contextmenu.prevent="">
        <router-view />
    </div>
</template>

<style>
  /*引入阿里字体图标*/
  @import './assets/iconfont/iconfont.css';

  #app {
    height: 100%;
  }

  /*全局样式*/
  body, html {
    margin: 0;
    padding: 0;
    font-size: 12px;
    height: 100%;
  }

  p {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    outline: none;
    font-size: 20px;
    color: #333;
  }

  ul {
    list-style: none;
  }
</style>
