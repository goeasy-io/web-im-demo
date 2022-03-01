<template>
    <div class="custom-message">
        <div class="title">发送订单</div>
        <div class="orders">
            <div>
                <div class="orders-title">编号：</div>
                <div class="orders-title">商品：</div>
                <div class="orders-title">金额：</div>
            </div>
            <div class="order-content">
                <div class="order-item">
                    <input type="text" v-model="number" maxlength="20" />
                </div>
                <div class="order-item">
                    <input type="text" v-model="goods" maxlength="20" />
                </div>
                <div class="order-item">
                    <input type="text" v-model="price" maxlength="10" />
                </div>
                <div class="action">
                    <div class="cancel-btn" @click="cancel">取消</div>
                    <div class="send-btn" @click="sendCustomMessage">发送</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'customMessageForm',
        data () {
            return {
                number : '',
                goods : '',
                price : '',
                to : null,
                type: ''
            }
        },
        beforeMount () {
            let target = this.$route.query.to;
            this.type = this.$route.query.type;
            this.to = JSON.parse(target);
        },
        methods : {
            sendCustomMessage () {
                let currentUser = JSON.parse(localStorage.getItem("user"));
                let customMessage = this.goEasy.im.createCustomMessage({
                    type : 'order',
                    payload : {
                        number : this.number,
                        goods : this.goods,
                        price : this.price
                    },
                    to : {
                        id : this.to.uuid,
                        type : this.type,
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
                let self = this;
                let toId = message.to.id;
                let type = message.to.type;
                let localHistory;
                if(type === this.GoEasy.IM_SCENE.PRIVATE){
                    localHistory = this.service.getPrivateMessages(toId);
                }else {
                    localHistory = this.service.getGroupMessages(toId);
                }
                localHistory.push(message);
                this.goEasy.im.sendMessage({
                    message: message,
                    onSuccess: function (message) {
                        console.log("发送成功.", message);
                        self.cancel();
                    },
                    onFailed: function (error) {
                        console.log("发送失败:",error);
                    }
                });
            },
            cancel () {
                this.$router.go(-1)
            }
        }
    }
</script>
<style>
   @import "./customMessageForm.css";
</style>
