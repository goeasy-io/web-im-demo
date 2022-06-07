<template>
    <div class="login">
        <div class="login-main">
            <div class="login-header">
                <div class="logo"></div>
            </div>
            <div class="login-form" ref="form">
                <div class="form-item">
                    <input
                        class="form-item-input"
                        v-model="username"
                        placeholder="请输入账号"
                        ref="username"
                    />
                </div>
                <div class="form-item">
                    <input
                        class="form-item-input"
                        v-model="password"
                        placeholder="请输入密码"
                        ref="password"
                    />
                </div>
                <div class="form-item">
                    <el-button class="form-item-btn" type="primary" @click="login">登录</el-button>
                </div>
                <div class="form-error" v-show="errorVisible">账号或密码错误!</div>
            </div>
        </div>
    </div>
</template>

<script>
import restApi from '../../api/restapi';
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
.login {
    width: 1000px;
    height: 600px;
    margin: 50px auto;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    background: url(../../assets/img/login.jpg) no-repeat;
    background-size: cover;
    .login-main {
        width: 300px;
        margin: 100px auto;
        padding: 30px 50px 10px;
        background-color: rgba($color: #ccc, $alpha: 0.5);
        .login-header {
            margin: 20px auto;
            .logo {
                width: 80px;
                height: 80px;
                margin: 10px auto;
                background: url(../../assets/img/logo.png) no-repeat;
                background-size: contain;
            }
        }
        .login-form/deep/.el-input__inner:focus {
            border-color: #DCDFE6;
        }
        .form-item {
            margin: 30px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .form-item-input {
                background-color: #FFF;
                background-image: none;
                border-radius: 4px;
                border: 1px solid #DCDFE6;
                box-sizing: border-box;
                color: #606266;
                display: inline-block;
                font-size: inherit;
                height: 40px;
                line-height: 40px;
                outline: 0;
                padding: 0 15px;
                width: 100%;
            }
            .form-item-btn {
                width: 100%;
                color: #FFFFFF;
                background-color: #af4e4e;
                border-color: #af4e4e;
                height: 35px;
                cursor: pointer;
                text-align: center;
                box-sizing: border-box;
                padding: 12px 20px;
                font-size: 14px;
                border-radius: 4px;
            }
        }
        .form-error {
            color: #D02129;
            margin-bottom: 22px;
        }
    }
}
</style>
