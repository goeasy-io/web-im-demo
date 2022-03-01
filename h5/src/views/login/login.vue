<template>
    <div class="login">
        <div class="title">GoEasy IM</div>
        <input type="text" class="input-box" v-model="username" placeholder="请输入账号">
        <input type="password" class="input-box" v-model="password" placeholder="请输入密码">
        <div class="alert-box" v-show="showError">
            <span>请输入正确的用户名和密码</span>
        </div>
        <button class="login-btn" @click="login">登录</button>
        <div class="login-tips">登录所需用户名和密码见 restapi.js</div>
    </div>
</template>

<script>
    import restApi from "../../assets/lib/restapi";
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                showError: false
            }
        },
        methods: {
            login() {//登录
                if (this.username.trim() !== "" && this.password.trim() !== "") {
                    let user = restApi.findUser(this.username, this.password);
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        this.$router.push({name: 'index'});
                        return;
                    }
                }
                this.showError = true;
            }
        }
    }
</script>

<style scoped>
    @import "./login.css";
</style>