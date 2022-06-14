<template>
    <div id="app" @contextmenu.prevent="">
        <router-view />
    </div>
</template>

<style lang="scss">
body {
    background-color: #f5f5f5;
}
#app {
    font-family: sans-serif, Avenir, Helvetica, Arial;
    color: #2c3e50;
    height: 100%;
}
</style>
