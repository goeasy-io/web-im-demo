<template>
    <div id="app" @contextmenu.prevent="">
        <router-view />
    </div>
</template>

<style lang="scss">
@import url('//at.alicdn.com/t/font_2486466_8s7bs6ei53j.css');

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
