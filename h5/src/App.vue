<template>
    <div id="app" @contextmenu.prevent="">
        <router-view />
    </div>
</template>

<style lang="scss">
// 引入阿里字体图标
@import url('//at.alicdn.com/t/font_2486466_07ioxui71ue9.css');

body {
    background-color: #f5f5f5;
}
#app {
    font-family: sans-serif, Avenir, Helvetica, Arial;
    color: #2c3e50;
    height: 100%;
}
// 阿里字体图标设置
.icon,
.iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
</style>
