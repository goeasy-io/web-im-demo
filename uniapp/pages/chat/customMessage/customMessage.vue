<template>
    <view class="custom-message">
        <view class="title">发送订单</view>
        <view class="orders">
            <view>
                <view class="orders-title">编号：</view>
                <view class="orders-title">商品：</view>
                <view class="orders-title">金额：</view>
            </view>
            <view class="order-content">
                <view class="order-item">
                    <input type="text" v-model="number" maxlength="20" />
                </view>
                <view class="order-item">
                    <input type="text" v-model="goods" maxlength="20" />
                </view>
                <view class="order-item">
                    <input type="text" v-model="price" maxlength="10" />
                </view>
                <view class="action">
                    <view class="cancel-btn" @click="cancel">取消</view>
                    <view class="send-btn" @click="sendCustomMessage">发送</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data () {
            return {
                number : '',
                goods : '',
                price : '',
                to : null
            }
        },
        onLoad (options) {
            this.to = JSON.parse(options.to);
        },
        methods : {
            sendCustomMessage () {
                let currentUser = uni.getStorageSync('currentUser');
                let customMessage = this.goEasy.im.createCustomMessage({
                    type : 'order',
                    payload : {
                        number : this.number,
                        goods : this.goods,
                        price : this.price
                    },
                    to : {
                        id : this.to.id,
                        type : this.to.type,
                        data : {
                            name : this.to.name,
                            avatar: this.to.avatar
                        }
                    },
                    notification : {
                        title : currentUser.name + '发来一份订单',
                        body : '[订单消息]'     // 字段最长 50 字符
                    }
                });
                this.sendMessage(customMessage);
            },
            sendMessage(message){
                let localHistory;
                let toId = message.to.id;
                let type = message.to.type;
                let imService = getApp().globalData.imService;
                if(type === this.GoEasy.IM_SCENE.PRIVATE){
                    localHistory = imService.getPrivateMessages(toId);
                }else {
                    localHistory = imService.getGroupMessages(toId);
                }
                localHistory.push(message);
                this.goEasy.im.sendMessage({
                    message: message,
                    onSuccess: function (message) {
                        console.log("发送成功.", message);
                        uni.navigateBack()
                    },
                    onFailed: function (error) {
                        console.log("发送失败:",error);
                    }
                });
            },
            cancel () {
                uni.navigateBack()
            }
        }
    }
</script>
<style>
    .custom-message{
        padding: 0 40rpx;
    }

    .title{
        text-align: center;
        font-weight: 600;
        font-size: 40rpx;
        color: #000000;
        text-align: center;
        line-height: 200rpx;
    }

    .orders {
        display: flex;
    }

    .order-item{
        height: 80rpx;
        display: flex;
        justify-content: center;
        margin-top: 40rpx;
    }

    .orders-title {
        width: 130rpx;
        margin-top: 40rpx;
        text-align: right;
        line-height: 80rpx;
    }

    .order-item input{
        width: 500rpx;
        background: #EFEFEF;
        box-sizing: border-box;
        padding: 10rpx;
        font-size: 28rpx;
        height: 80rpx;
        border-radius: 10rpx;
    }

    .action{
        display: flex;
        justify-content: space-around;
        height: 80rpx;
        margin-top: 40rpx;
    }

    .send-btn{
        width:240rpx;
        height: 80rpx;
        background: #618DFF;
        line-height:80rpx;
        text-align: center;
        border-radius: 10rpx;
        color: #FFFFFF;
        font-size: 32rpx;
    }
    .cancel-btn{
        width:240rpx;
        height: 80rpx;
        background: #FFFFFF;
        line-height:80rpx;
        text-align: center;
        border-radius: 10rpx;
        color: #666666;
        font-size: 32rpx;
        border: 1px solid grey;
        box-sizing: border-box;
    }
</style>
