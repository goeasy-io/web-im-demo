<template>
    <div class="login-container">
        <div class="login-form">
            <div class="login-form-head">
                <div class="logo"></div>
            </div>
            <el-form class="login-form-body" ref="form">
                <el-form-item>
                    <el-input
                        v-model="username"
                        placeholder="请输入账号"
                        ref="username"
                        @keyup.enter.native="confirmInput($event, false)"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="password"
                        placeholder="请输入密码"
                        ref="password"
                        show-password
                        @keyup.enter.native="confirmInput($event, true)"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-form-btn" type="primary" @click="login">登录</el-button>
                </el-form-item>
                <div v-show="errorVisible">账号或密码错误</div>
            </el-form>
        </div>
    </div>
</template>

<script>
import restApi from '../../lib/restapi';
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            errorVisible: false,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.username.focus();
        });
    },
    methods: {
        login() {
            if (this.username.trim() !== '' && this.password.trim() !== '') {
                let user = restApi.findUser(this.username, this.password);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    const { to = '../conversations' } = this.$route.params;
                    this.$router.push(to);
                    return;
                }
            }
            this.errorVisible = true;
        },
        confirmInput(e, isLogin) {
            // 判断输入框是否有值，有的话失焦让另外一个输入框聚焦；
            if (e.target.value !== '') {
                e.target.blur();
                this.inputFocus(isLogin);
            } else {
                e.target.blur();
                e.target.focus();
            }
        },
        inputFocus(isLogin) {
            if (isLogin) {
                this.login();
            } else {
                this.$refs.password.focus();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.login-container {
    width: 1000px;
    height: 600px;
    margin: 50px auto;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    background: url(../../assets/img/login.jpg) no-repeat;
    background-size: cover;
    .login-form {
        width: 300px;
        margin: 100px auto;
        padding: 30px 50px 10px;
        background-color: rgba($color: #ccc, $alpha: 0.5);
        .login-form-head {
            margin: 20px auto;
            .logo {
                width: 80px;
                height: 80px;
                margin: 10px auto;
                background: url(../../assets/img/logo.png) no-repeat;
                background-size: contain;
            }
        }
        .login-form-btn {
            width: 100%;
            background-color: #af4e4e;
            border-color: #af4e4e;
        }
    }
}
</style>
