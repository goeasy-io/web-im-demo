<template>
  <view class="login">
    <view class="title">GoEasy IM</view>
    <view class="user-selector">
      <view class="selected-area" @click="switchSelectorVisible">
        <view class="selected-content" v-if="userSelector.selectedUser">
          <image :src="userSelector.selectedUser.avatar"></image>
          <text>{{ userSelector.selectedUser.name }}</text>
        </view>
        <view class="selected-content" v-else>
          <text>请选择用户</text>
        </view>
        <image class="selected-icon rotate" src="/static/images/up.png"></image>
      </view>
      <view v-if="userSelector.visible" class="dialog-area">
        <view class="dialog-list">
          <view class="dialog-list-item" v-for="(user, index) in userSelector.users" :key="index" @click="selectUser(user)">
            <image class="dialog-list-item-avatar" :src="user.avatar"></image>
            <text>{{ user.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="password-box">
      <input v-model="password.value" class="password-input" placeholder="请输入密码" :password="!password.visible" type="text">
      <image class="password-image" @click="switchPasswordVisible" src="/static/images/visible.png"></image>
    </view>

    <view v-show="errorVisible" class="alert-box">
      <image src="/static/images/login-alert-icon.png"></image>
      <span>请输入正确的用户名和密码</span>
    </view>
    <button class="login-btn" @click="login">登录</button>
    <view class="version">{{ versionName }}</view>
  </view>
</template>

<script>
  import restApi from '../lib/restapi';
  const {versionName} = require('../manifest.json');

  export default {
    name: 'Login',
    data() {
      return {
        versionName: versionName,
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

        errorVisible: false
      }
    },
    onLoad() {
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
            uni.setStorageSync('currentUser', user);
            uni.switchTab({url: './conversations'});
            return
          }
        }
        this.errorVisible = true;
      }
    }
  }
</script>

<style>
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    padding-top: 160rpx;
    height: 100rpx;
    font-size: 60rpx;
    text-align: center;
    font-family: Source Han Sans CN;
    font-style: normal;
    font-weight: normal;
    color: #d02129;
    margin-bottom: 80rpx;
  }

  .alert-box {
    width: 640rpx;
    height: 60rpx;
    margin-bottom: 60rpx;
    padding: 0rpx 20rpx;
    font-size: 34rpx;
    line-height: 48rpx;
    display: flex;
    align-content: center;
    overflow: hidden;
    color: #EE593C;
    align-items: center;
  }

  .alert-box image {
    width: 30rpx;
    height: 30rpx;
    margin-right: 20rpx;
  }

  .login-btn {
    width: 680rpx;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 36rpx;
    text-align: center;
    color: #ffffff;
    background: #d02129;
    outline: none;
    border: 0;
  }

  .password-box {
    position: relative;
  }

  .password-input {
    width: 620rpx;
    padding: 28rpx;
    border: 1px solid #cccccc;
    margin-bottom: 40rpx;
    font-size: 34rpx;
  }

  .password-image {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    top: 28rpx;
    right: 28rpx;
  }

  .user-selector {
    width: 700rpx;
    margin-bottom: 40rpx;
  }

  .selected-area {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 96%;
    height: 100rpx;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 26rpx;
  }

  .selected-content {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .selected-content image {
    width: 80rpx;
    height: 80rpx;
    margin-right: 30rpx;
    border-radius: 50%;
  }

  .selected-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
  }

  .selected-icon.rotate {
    transform-origin: center;
    transform: rotate(180deg);
  }

  .dialog-area {
    position: absolute;
    width: 100%;
    background: #E5E5E5;
  }

  .dialog-list {
    position: absolute;
    left: 10rpx;
    top: 8rpx;
    width: 674rpx;
    border: 1px solid #cccccc;
    background: #ffffff;
    box-shadow: 8rpx 8rpx 10rpx #e1e1e1;
    padding: 30rpx 0;
    z-index: 99;
  }

  .dialog-list-item {
    width: 100%;
    margin: 25rpx 0;
    padding-left: 40rpx;
    display: flex;
    align-items: center;
  }

  .dialog-list-item-avatar {
    width: 80rpx;
    height: 80rpx;
    margin-right: 30rpx;
    border-radius: 50%;
  }

  .version {
    color: #ffffff;
    font-size: 40rpx;
    margin-top: 60rpx;
  }

  view {
    user-select: text;
  }
</style>
