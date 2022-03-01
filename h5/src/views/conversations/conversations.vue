<template>
    <div class="conversations">
        <div class="conversations-title">会话</div>
        <div class="conversations-box">
            <div v-if="$parent.$data.conversations.length !==0">
                <div class="scroll-item" v-for="(conversation, key) in $parent.$data.conversations" :key="key">
                    <div class="item-head">
                        <img :src="conversation.data.avatar"  class="head-icon"/>
                        <div class="item-head_unread" v-if="conversation.unread">{{conversation.unread}}</div>
                    </div>
                    <div class="scroll-item_info">
                        <div class="item-info-top">
                            <span class="item-info-top_name">{{conversation.data.name}}</span>
                            <div class="item-info-top_time">{{formatDate(conversation.lastMessage.timestamp)}}</div>
                        </div>
                        <div class="item-info-bottom">
                            <div class="item-info-bottom-item" @click="navigateToChat(conversation)">
                                <div class="item-info-top_content">
                                    <span v-if="conversation.lastMessage.type == 'text'" class="text-conversation">
                                        {{conversation.lastMessage.payload.text}}
                                    </span>
                                    <span v-else-if="conversation.lastMessage.type == 'video'">
                                        [视频消息]
                                    </span>
                                    <span v-else-if="conversation.lastMessage.type == 'audio'">
                                        [语音消息]
                                    </span>
                                    <span v-else-if="conversation.lastMessage.type == 'image'">
                                        [图片消息]
                                    </span>
                                    <span v-else-if="conversation.lastMessage.type == 'file'">
                                        [文件消息]
                                    </span>
                                    <span v-else-if="conversation.lastMessage.type == 'order'">
                                        [订单消息]
                                    </span>
                                    <span v-else>
                                        [未识别内容]
                                    </span>
                                </div>
                                <div class="item-info-bottom_action" @click.stop="showAction(conversation)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-conversation" v-else>
                当前没有会话
            </div>
            <div class="action-container" v-if="action.show">
                <div class="layer" @click="action.show = false"></div>
                <div class="action-box">
                    <div class="action-item" @click="topConversation">{{action.conversation.top ? '取消置顶' : '置顶聊天'}}</div>
                    <div class="action-item" @click="removeConversation">删除聊天</div>
                </div>
            </div>
            <div class="action-toast" v-if="action.showToast">
                {{action.toastMessage}}
            </div>
        </div>
        <div class="mask" v-show="showLoading">
            <img src="/static/images/pending.gif"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "conversation",
        data() {
            return {
                showLoading : false,
                action : {
                    conversation : null,
                    show : false,
                    toastMessage : '',
                    showToast : false
                }
            }
        },
        beforeMount() {
            let self = this;
            this.showLoading = true;
            let user = JSON.parse(localStorage.getItem("user"));
            if (this.goEasy.getConnectionStatus() === 'disconnected') {
                this.service.connect(user);
            }
            //加载会话列表
            this.goEasy.im.latestConversations({
                onSuccess: function (res) {
                    let content = res.content;
                    self.showLoading = false;
                    self.$parent.$data.unreadTotal = content.unreadTotal;
                    self.$parent.$data.conversations = content.conversations;
                },
                onFailed: function (error) {
                    this.showLoading = false;
                    console.log("失败获取最新会话列表, code:" + error.code + " content:" + error.content);
                }
            });
        },
        methods: {
            topConversation() {
                let self = this;
                this.showLoading = true;
                let conversation = this.action.conversation;
                let failedDescription = conversation.top ? '取消置顶失败' : '置顶失败';
                if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
                    this.goEasy.im.topPrivateConversation({
                        userId: conversation.userId,
                        top: !conversation.top,
                        onSuccess: function () {
                            self.showLoading = false;
                        },
                        onFailed: function (error) {
                            self.showToast(failedDescription);
                            console.log(error);
                        }
                    });
                }else{
                    this.goEasy.im.topGroupConversation({
                        groupId: conversation.groupId,
                        top: !conversation.top,
                        onSuccess: function () {
                            self.showLoading = false;
                        },
                        onFailed: function (error) {
                            self.showToast(failedDescription);
                            console.log(error);
                        }
                    });
                }
                this.action.show = false;
            },
            removeConversation() {
                let self = this;
                this.showLoading = true;
                let conversation = this.action.conversation;
                let failedDescription = "删除失败";
                if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
                    this.goEasy.im.removePrivateConversation({
                        userId: conversation.userId,
                        onSuccess: function () {
                            self.showLoading = false;
                        },
                        onFailed: function (error) {
                            self.showToast(failedDescription);
                            console.log(error);
                        }
                    });
                }else {
                    this.goEasy.im.removeGroupConversation({
                        groupId: conversation.groupId,
                        onSuccess: function () {
                            self.showLoading = false;
                        },
                        onFailed: function (error) {
                            this.showToast(failedDescription);
                            console.log(error);
                        }
                    });
                }
                this.action.show = false;
            },
            navigateToChat(conversation) {
                let id = conversation.userId || conversation.groupId;
                this.$router.push({
                    name: conversation.type,
                    query: {
                        id : id
                    }
                });
            },
            showToast (failedDescription) {
                this.showLoading = false;
                this.action.toastMessage = failedDescription;
                this.action.showToast = true;
                setTimeout(() => {
                    this.action.showToast = false;
                },2000);
            },
            showAction (conversation) {
                this.action.conversation = conversation;
                this.action.show = true
            }
        }
    }
</script>

<style scoped>
    @import "./conversations.css";
</style>

