<template>
    <div class="login">
        <div class="login-main">
            <div class="login-header">
<!--                <div class="logo"></div>-->
                <div>GoEasyIM-Demo</div>
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
                        type="password"
                    />
                </div>
                <div class="form-item">
                    <button class="form-item-btn" @click="login">登录</button>
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
                    this.$router.push('../conversations');
                    return;
                }
            }
            this.errorVisible = true;
        }
    },
};
</script>

<style lang="scss" scoped>
.login {
    width: 900px;
    height: 600px;
    margin: 50px auto;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    background: linear-gradient(45deg, #996666, transparent);
    .login-main {
        width: 600px;
        margin: 100px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .login-header {
            margin: 20px auto;
            width: 300px;
            text-align: center;
            font-size: 35px;
            font-weight: 600;
            color: #93262b;
            .logo {
                width: 80px;
                height: 80px;
                margin: 0 auto;
                background: url(../../assets/img/logo.png) no-repeat;
                background-size: contain;
            }
        }
        .login-form {
            width: 300px;
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
                    background-color: #93262b;
                    border: none;
                    height: 35px;
                    cursor: pointer;
                    text-align: center;
                    font-size: 14px;
                    border-radius: 4px;
                }
            }
            .form-error {
                color: #93262b;
                margin-bottom: 22px;
            }
        }
    }
}
</style>
