<script src="../../lib/imservice.js"></script>
<template>
    <div class="mine">
        <div class="top">
            <image :src="currentUser && currentUser.avatar"></image>
            <view class="name">{{currentUser && currentUser.name}}</view>
        </div>
        <div class="bottom">
            <text>欢迎体验GoEasyIM</text>
            <view class="logout" @click="logout">注销</view>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentUser : null
            }
        },
        onShow () {
			this.init()
        },
        methods : {
			init () {
				//本应该在onshow里面做，uniapp新版本有bug，switchTab不会触发onShow
				this.currentUser = uni.getStorageSync('currentUser');
			},
            logout () {
                this.goEasy.disconnect({
                    onSuccess: function(){
                        console.log('断连成功')
                        uni.removeStorageSync('currentUser');
                        getApp().globalData.imService = null;
                        uni.navigateTo({
                            url : '../login/login'
                        })
                    },
                    onFailed: function(error){
                        uni.showToast({
                            title:'断连失败'
                        })
                    }
                });
            }
        }
    }
</script>

<style>
    .mine{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .top{
        height: 400rpx;
        background: #F3F4F7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .top image{
        width:156rpx;
        height: 156rpx;
        border-radius: 156rpx;
    }
    .top .name{
        line-height: 80rpx;
    }
    .bottom{
        text-align: center;
        line-height: 200rpx;
    }
	.logout{
		width: 266rpx;
		height: 76rpx;
		line-height: 76rpx;
		margin: 0 auto;
		background-color: #618DFF;
		border-radius: 10rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		
	}
</style>
