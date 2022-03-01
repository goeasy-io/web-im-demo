<template>
    <div class="chat">
        <div class="header">
            <span class="back-btn" @click="navigateBack"> < </span>
            <span class="title">{{group.name}}</span>
        </div>
        <div class="message-container">
            <div class="scroll-view" ref="scrollView">
                <div class="history-load-tip" @click="loadMoreHistoryMessage">
                    {{allHistoryLoaded ? '已经没有更多的历史消息' : '点击获取历史消息'}}
                </div>
                <div v-for="(message, index) in messages" :key="index">
                    <div class="time-lag"
                         v-if="index == 0 || (messages[index].timestamp - messages[index - 1].timestamp > 5 * 60 * 1000)">
                        {{formatDate(message.timestamp)}}
                    </div>
                    <chat-message :message="message" :to="group" :currentUser="currentUser" :type="type" @showImageFullScreen="showImageFullScreen"/>
                </div>
            </div>
        </div>
        <send-box :to="group" :type="type" @onSent="scrollToBottom" />
        <div class="img-layer" @click="image.show = false" v-show="image.show">
            <img :src="image.url">
        </div>
    </div>
</template>

<script>
    import SendBox from "../chat-component/SendBox";
    import ChatMessage from "../chat-component/ChatMessage";
    export default {
        name: "groupChat",
        components : {
            SendBox,
            ChatMessage
        },
        data () {
            return {
                group: null,
                allHistoryLoaded : false,
                messages : [],
                currentUser : null,
                image : {
                    show : false,
                    url : ''
                },
                type: ""
            }
        },
        beforeMount() {
            let groupId = this.$route.query.id;
            this.type = this.GoEasy.IM_SCENE.GROUP;
            this.currentUser = this.service.currentUser;
            this.group = this.service.findGroupById(groupId);
            this.messages = this.service.getGroupMessages(groupId);
            this.scrollToBottom();
            this.initialListeners();
            if(this.messages.length !== 0) {
                this.markMessageAsRead(groupId);
            }
        },
        destroyed() {
            this.service.onNewGroupMessageReceive = function () {}
        },
        methods : {
            initialListeners () {
                //传入监听器，收到一条私聊消息总是滚到到页面底部
                this.service.onNewGroupMessageReceive =  (groupId, message)=> {
                    if (groupId === this.group.uuid) {
                        this.markMessageAsRead(groupId);
                        //收到新消息，是滚动到最底部
                        this.scrollToBottom();
                    }
                };
            },
            markMessageAsRead (groupId) {
                this.goEasy.im.markGroupMessageAsRead({
                    groupId: groupId,
                    onSuccess: function () {
                        //标记成功
                        console.log("标记成功");
                    },
                    onFailed: function (error) {
                        //标记失败
                        console.log(error)
                    }
                });
            },
            loadMoreHistoryMessage () {
                let self = this;
                let lastMessageTimeStamp = Date.now();
                let lastMessage = this.messages[0];
                if (lastMessage) {
                    lastMessageTimeStamp = lastMessage.timestamp;
                }
                let currentLength = this.messages.length;
                this.goEasy.im.history({
                    groupId: this.group.uuid,
                    lastTimestamp: lastMessageTimeStamp,
                    onSuccess: function (result) {
                        //获取本地记录
                        let localHistory = self.service.getGroupMessages(self.group.uuid);
                        //添加加载的记录到本地记录尾部
                        let messages = result.content;
                        for (let i = messages.length - 1; i >= 0; i--) {
                            localHistory.unshift(messages[i]);
                        }
                        if (localHistory.length === currentLength) {
                            self.allHistoryLoaded = true;
                        }
                        self.messages = localHistory;
                    },
                    onFailed: function (error) {
                        //获取失败
                        if(error.code === 401){
                            console.log("获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
                        }else{
                            console.log("获取历史消息失败, code:" + error.code + ",错误信息:" + error.content);
                        }
                    }
                });
            },
            navigateBack() {//返回
                this.$router.go(-1);
            },
            showImageFullScreen (message) {
                this.image.url = message.payload.url;
                this.image.show = true;
            },
            scrollToBottom () {
                this.$nextTick(() => {
                    this.$refs.scrollView.scrollTo(0, this.$refs.scrollView.scrollHeight)
                })
            }
        }
    }
</script>

<style scoped>
    @import "./groupChat.css";
</style>