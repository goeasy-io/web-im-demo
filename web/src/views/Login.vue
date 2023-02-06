<template>
  <div class="login">
    <div class="login-container">
      <div class="login-main">
        <div class="login-header">
          <div>GoEasy IM PC端示例</div>
        </div>
        <div class="login-form">
          <div class="form-item">
            <div class="selected-area" @click="switchSelectorVisible">
              <div class="selected-content" v-if="userSelector.selectedUser">
                <img :src="userSelector.selectedUser.avatar"/>
                <div>{{ userSelector.selectedUser.name }}</div>
              </div>
              <div class="selected-content" v-else>
                <div>请选择用户</div>
              </div>
              <img class="selected-icon rotate" src="../assets/images/up.png"/>
            </div>
            <div v-if="userSelector.visible" class="dialog-area">
              <div class="dialog-list">
                <div class="dialog-list-item" v-for="(user, index) in userSelector.users" :key="index"
                     @click="selectUser(user)">
                  <img class="dialog-list-item-avatar" :src="user.avatar"/>
                  <div>{{ user.name }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <input v-model="password.value" class="password-input" placeholder="请输入密码" :type="password.visible ? 'text':'password'"/>
            <img class="password-image" @click="switchPasswordVisible" src="../assets/images/visible.png"/>
          </div>
          <div class="form-item">
            <button class="form-item-btn" @click="login">登录</button>
          </div>
          <div v-show="errorVisible" class="form-error">账号或密码错误!</div>
        </div>
        <div class="version">{{ version }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import restApi from '../api/restapi';
  import { version } from '../../package.json';

  export default {
    name: 'Login',
    data() {
      return {
        version: version,
        userSelector: {
          users: [],
          visible: false,
          selectedUser: null
        },

        username: '',
        password: {
          visible: false,
          value: '123'
        },

        errorVisible: false,
      };
    },
    created() {
      this.userSelector.users = restApi.findUsers();
    },
    methods: {
      switchSelectorVisible() {
        this.userSelector.visible = !this.userSelector.visible;
      },
      selectUser(user) {
        this.userSelector.visible = false;
        this.userSelector.selectedUser = user;
        this.username = user.name;
      },
      switchPasswordVisible() {
        this.password.visible = !this.password.visible;
      },


      login() {
        if (this.username.trim() !== '' && this.password.value.trim() !== '') {
          let user = restApi.findUser(this.username, this.password.value);
          if (user) {
            this.globalData.currentUser = user;
            this.$router.replace({path: './conversations'});
            return;
          }
        }
        this.errorVisible = true;
      }
    },
  };
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-container {
    border-radius: 12px;
  }

  .login-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-header {
    width: 300px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: #d02129;
  }

  .login-form {
    width: 300px;
  }

  .form-item {
    position: relative;
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .selected-area {
    width: 280px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    cursor: pointer;
  }

  .selected-area .selected-content {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 37px;
  }

  .selected-area .selected-content img {
    width: 35px;
    height: 35px;
    margin-right: 15px;
    border-radius: 50%;
  }

  .selected-area .selected-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .selected-area .rotate {
    transform-origin: center;
    transform: rotate(180deg);
  }

  .dialog-area {
    position: absolute;
    top: 55px;
    left: 0;
    width: 300px;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    z-index: 99;
  }

  .dialog-list-item {
    width: 100%;
    margin: 15px 0;
    padding-left: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .dialog-list-item-avatar {
    width: 35px;
    height: 35px;
    margin-right: 15px;
    border-radius: 50%;
  }

  .password-input {
    width: 280px;
    height: 37px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
  }

  .password-image {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  .form-item-btn {
    width: 100%;
    color: #FFFFFF;
    background-color: #d02129;
    border: none;
    height: 35px;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    border-radius: 4px;
  }

  .form-error {
    color: #d02129;
    margin-bottom: 22px;
  }

  .login-main .version {
    color: #FFFFFF;
  }

</style>
