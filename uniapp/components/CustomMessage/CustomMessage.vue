<template>
    <view class="order-list">
        <view class="orders-content">
            <view class="title">
                发送订单消息
            </view>
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
                        <view class="send-btn" @click="submitCustomMessageForm">发送</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'CustomMessage',
        data () {
            return {
                number : '',
                goods : '',
                price : '',
                to : null
            }
        },
        methods : {
            submitCustomMessageForm () {
                let order = {
                    number: this.number,
                    goods: this.goods,
                    price: this.price
                }
                this.$emit('createCustomMessage', order);
            },
            cancel () {
                this.$emit('closeCustomMessageForm');
            }
        }
    }
</script>
<style>
    .order-list {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.5);
    }

    .orders-content {
        position: absolute;
        width: 100%;
        height: 60%;
        bottom: 0;
        background: #F4F5F9;
        z-index: 200;
    }

    .title{
        text-align: center;
        font-weight: 600;
        font-size: 30rpx;
        color: #000000;
        line-height: 80rpx;
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
