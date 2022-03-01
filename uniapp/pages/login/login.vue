<template>
	<view class="login">
		<view class="title">GoEasy IM</view>
		<input type="text" class="input-box" v-model="username" placeholder="请输入账号">
		<input type="password" class="input-box" v-model="password" placeholder="请输入密码">
		<div class="alert-box" v-show="showError">
			<image src="../../static/images/login-alert-icon.png"></image>
			<span>请输入正确的用户名和密码</span>
		</div>
		<button class="login-btn" @click="login">登录</button>
		<div class="login-tips">登录所需用户名和密码见 restapi.js</div>
	</view>
</template>

<script>
	import restApi from "../../lib/restapi";
	export default {
	        name: "Login",
	        data () {
	            return {
	                username : '',
	                password : '',
	                showError : false
	            }
	        },
	        methods : {
	        	login () {
					if (this.username.trim() !== "" && this.password.trim() !== "") {
						let user = restApi.findUser(this.username, this.password);
						if(user){
							uni.setStorageSync('currentUser', user);
							uni.switchTab({
								url:'../conversations/conversations'
							});
							return
						}
					}
					this.showError = true;
				}
	        }
	    }
</script>

<style>
	.login{
		padding-top: 160rpx;
		width:100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.title {
		height: 100rpx;
		font-size:84rpx;
		text-align: center;
		font-family: Source Han Sans CN;
		font-style: normal;
		font-weight: bold;
		color: #D02129;
		margin-bottom: 80rpx;
	}
	.input-box {
		width:600rpx;
		height: 50rpx;
		margin-bottom: 40rpx;
		padding: 26rpx;
		font-size: 32rpx;
	}
	input{
		border: 1px solid #E0E0E0;
	}
	input::-webkit-input-placeholder{
		color: #999999;
	}
	input::-moz-placeholder{
		color: #999999;
	}
	input::-ms-input-placeholder{
		color: #999999;
	}
	.alert-box{
		width:640rpx;
		height: 60rpx;
		margin-bottom: 60rpx;
		padding: 0rpx 20rpx;
		font-size: 32rpx;
		line-height: 48rpx;
		display: flex;
		align-content: center;
		overflow: hidden;
		color: #EE593C;
		align-items: center;
	}
	.alert-box image{
		width:30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}
	.login-btn{
		width: 680rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size:36rpx ;
		text-align: center;
		color: #ffffff;
		background: #618DFF;
		outline: none;
		border: 0;
	}
	.login-tips {
		color: #999999;
		font-size: 30rpx;
		text-align: center;
		margin-top: 30rpx;
	}
</style>
