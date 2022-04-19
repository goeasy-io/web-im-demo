<template>
    <el-container class="conversations">
        <el-aside>
            <el-container class="conversation-list-container">
                <el-header class="conversation-list-title">
                    <el-input placeholder="" size="small"> </el-input>
                </el-header>
                <el-aside class="conversation-list-content" v-loading="isLoading">
                    <div v-if="conversations.length > 0">
                        <div v-for="(conversation, key) in conversations" :key="key">
                            <el-row
                                class="conversation"
                                @click.native="goChatPage(conversation)"
                                type="flex"
                                :class="{
                                    current:
                                        conversation.userId === currentConversationId ||
                                        conversation.groupId === currentConversationId,
                                }"
                            >
                                <el-col :span="5" class="avatar">
                                    <img v-if="conversation.userId" :src="conversation.data.avatar" />
                                    <div class="group-avatar" v-if="conversation.groupId">
                                        <img
                                            v-for="(avatar, index) in getGroupAvatar(conversation.groupId)"
                                            :src="avatar"
                                            :class="computedAvatar(getGroupAvatar(conversation.groupId))"
                                            :key="index"
                                        />
                                    </div>
                                    <div v-if="conversation.unread && currentUser.uuid !== conversation.lastMessage.senderId" class="mark">
                                        <span class="unread">{{ conversation.unread }}</span>
                                    </div>
                                </el-col>
                                <el-col class="conversation-mes" :span="6">
                                    <div class="conversation-top">
                                        <span class="conversation-name">{{ conversation.data.name }}</span>
                                        <div class="conversation-time">
                                            <div>{{ formatDate(conversation.lastMessage.timestamp) }}</div>
                                        </div>
                                    </div>
                                    <div class="conversation-bottom">
                                        <div>
                                            <span class="unread-text">{{conversation.lastMessage.read === false && conversation.lastMessage.senderId === currentUser.uuid?'[未读]':''}}</span>
                                            <span v-if="conversation.type === 'private'">{{conversation.lastMessage.senderId === currentUser.uuid? '我': conversation.data.name}}:</span>
                                            <span v-else>{{conversation.lastMessage.senderId === currentUser.uuid? '我': conversation.lastMessage.senderData.name}}:</span>
                                            <span v-if="conversation.lastMessage.type === 'text'">{{ conversation.lastMessage.payload.text }}</span>
                                            <span v-else-if="conversation.lastMessage.type === 'video'">[视频消息]</span>
                                            <span v-else-if="conversation.lastMessage.type === 'audio'">[语音消息]</span>
                                            <span v-else-if="conversation.lastMessage.type === 'image'">[图片消息]</span>
                                            <span v-else-if="conversation.lastMessage.type === 'file'">[文件消息]</span>
                                            <span v-else-if="conversation.lastMessage.type === 'order'">[订单消息]</span>
                                        </div>
                                        <div
                                            class="conversation-bottom-action"
                                            @click.stop="showAction(conversation)"
                                        ></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div v-else class="no-conversation">- 当前没有会话 -</div>
                </el-aside>
            </el-container>
            <div v-if="actionPopup.visible">
                <div class="layer" @click="actionPopup.visible = false"></div>
                <div class="action-box">
                    <div class="action-item" @click="topConversation">
                        {{ actionPopup.conversation.top ? '取消置顶' : '置顶聊天' }}
                    </div>
                    <div class="action-item" @click="deleteConversation">删除聊天</div>
                </div>
            </div>
        </el-aside>
        <el-main>
            <private-chat :key="$route.params.id" v-if="$route.name === 'private'" />
            <group-chat :key="$route.params.id" v-if="$route.name === 'group'" />
        </el-main>
    </el-container>
</template>

<script>
import PrivateChat from '../Chat/PrivateChat';
import GroupChat from '../Chat/GroupChat';
import restApi from "../../api/restapi";
export default {
    name: 'Conversations',
    components: {
        PrivateChat,
        GroupChat,
    },
    data() {
        return {
            currentUser: {},
            currentConversationId: null,
            conversations: [],
            actionPopup: {
                conversation: null,
                visible: false,
            },
            isLoading: false
        };
    },
    created() {
        this.currentConversationId = this.$route.params.id || null;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!this.currentUser) {
            this.$router.push({ path: '/login' });
        } else {
            if (this.goEasy.getConnectionStatus() === 'disconnected') {
                this.goEasy.connect({
                    id: this.currentUser.uuid,
                    data: this.currentUser,
                });
            }
        }
    },
    watch: {
        $route() {
            if (this.$route.params.id !== 'undefined') {
                this.currentConversationId = this.$route.params.id;
            }
        },
    },
    mounted() {
        this.listenConversationUpdate(); //监听会话列表变化
        this.loadConversations(); //加载会话列表
        this.subscribeGroup();  //订阅群消息
    },
    methods: {
        loadConversations() {
            this.isLoading = true;
            this.goEasy.im.latestConversations({
                onSuccess: (result) => {
                    let content = result.content;
                    this.renderConversations(content);
                    this.isLoading = false;
                },
                onFailed: (error) => {
                    this.isLoading = false;
                    console.log('获取最新会话列表失败, code:' + error.code + 'content:' + error.content);
                },
            });
        },
        listenConversationUpdate() {
            // 监听会话列表变化
            this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (content) => {
                this.renderConversations(content);

            });
        },
        renderConversations(content) {
            this.conversations = content.conversations;
            this.setUnreadAmount(content.unreadTotal);
        },
        setUnreadAmount(unreadTotal) {
            this.$EventBus.$emit('setUnreadAmount', unreadTotal);
        },
        subscribeGroup() {
            let groups = restApi.findGroups(this.currentUser);
            let groupIds = groups.map((item) => item.uuid);
            this.goEasy.im.subscribeGroup({
                groupIds: groupIds,
                onSuccess: function () {
                    console.log('订阅群消息成功');
                },
                onFailed: function (error) {
                    console.log('订阅群消息失败:', error);
                },
            });
        },
        showAction(conversation) {
            this.actionPopup.conversation = conversation;
            this.actionPopup.visible = true;
        },
        topConversation() {
            let actionPopup = this.actionPopup;
            actionPopup.visible = false;
            let conversation = actionPopup.conversation;
            let failedDescription = conversation.top ? '取消置顶失败' : '置顶失败';
            if (conversation.type === this.GoEasy.IM_SCENE.PRIVATE) {
                this.goEasy.im.topPrivateConversation({
                    userId: conversation.userId,
                    top: !conversation.top,
                    onSuccess: function () {
                        console.log('置顶成功');
                    },
                    onFailed: function (error) {
                        console.log(failedDescription,error);
                    },
                });
            } else if (conversation.type === this.GoEasy.IM_SCENE.GROUP) {
                this.goEasy.im.topGroupConversation({
                    groupId: conversation.groupId,
                    top: !conversation.top,
                    onSuccess: function () {
                        console.log('置顶成功');
                    },
                    onFailed: function (error) {
                        console.log(failedDescription,error);
                    },
                });
            }
        },
        deleteConversation() {
            let conversation = this.actionPopup.conversation;
            this.actionPopup.visible = false;
            if (conversation.type === this.GoEasy.IM_SCENE.PRIVATE) {
                this.goEasy.im.removePrivateConversation({
                    userId: conversation.userId,
                    onSuccess: function () {
                        console.log('删除会话成功');
                    },
                    onFailed: function (error) {
                        console.log(error);
                    },
                });
            } else if (conversation.type === this.GoEasy.IM_SCENE.GROUP) {
                this.goEasy.im.removeGroupConversation({
                    groupId: conversation.groupId,
                    onSuccess: function () {
                        console.log('删除会话成功');
                    },
                    onFailed: function (error) {
                        console.log(error);
                    },
                });
            }
        },
        goChatPage(conversation) {
            const id = conversation.userId || conversation.groupId;
            this.$router.push({
                name: conversation.type,
                params: { id: id },
            });
        },
        getGroupAvatar(groupId) {
            const avatarList = restApi.findGroupMemberAvatars(groupId);
            return avatarList.slice(0, 9);
        },
        computedAvatar(avatarList) {
            if (avatarList.length > 4) {
                return 'avatarItem--3';
            } else if (avatarList.length > 1) {
                return 'avatarItem--2';
            } else {
                return 'avatarItem--1';
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.conversations {
    width: 100%;
    height: 100%;
    position: relative;
    .layer {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(51, 51, 51, 0.5);
        width: 300px;
        height: 100%;
        z-index: 99;
    }
    .action-box {
        width: 150px;
        height: 80px;
        background: #ffffff;
        position: absolute;
        top: 260px;
        left: 75px;
        z-index: 100;
        border-radius: 10px;
        overflow: hidden;
    }
    .action-item {
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        color: #262628;
        border-bottom: 1px solid #efefef;
    }
    .conversation-list-container {
        display: flex;
        flex-direction: column;
        background-color: white;
        border-right: #dbd6d6 1px solid;
        .conversation-list-title {
            padding-top: 20px;
            margin-bottom: 15px;
        }
        .conversation-list-content {
            flex: 1;
            &::-webkit-scrollbar {
                display: none; /* Chrome Safari */
            }
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
            .no-conversation {
                text-align: center;
                color: #666666;
            }
            .conversation {
                display: flex;
                padding: 5px 10px;
                .mark {
                    position: absolute;
                    top: 5px;
                    left: 55px;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    color: white;
                    background: #af4e4e;
                    .unread {
                        display: block;
                        font-size: 12px;
                        text-align: center;
                        line-height: 16px;
                    }
                }
                .conversation-mes {
                    padding-left: 10px;
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    .conversation-top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        text-align: right;
                        .conversation-name {
                            font-size: 13px;
                            font-weight: 500;
                        }
                        .conversation-time {
                            width: 75px;
                            color: #666;
                            display: flex;
                            flex-direction: column;
                        }
                    }
                    .conversation-bottom {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                        color: #666666;
                        .unread-text {
                            color: #af4e4e;
                        }
                        .conversation-bottom-action {
                            width: 20px;
                            height: 20px;
                            background: url('../../assets/img/action.png') no-repeat center;
                            background-size: 70%;
                        }
                    }
                }
                .avatar {
                    width: 50px;
                    height: 50px;
                    margin: auto 5px;
                    img {
                        width: 100%;
                        border-radius: 10%;
                    }
                }
                .group-avatar {
                    width: 50px;
                    height: 50px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    align-content: center;
                    flex-wrap: wrap-reverse;
                    .avatarItem--1 {
                        width: 98%;
                        height: 98%;
                    }
                    .avatarItem--2 {
                        width: 47%;
                        height: 47%;
                        margin: 1%;
                    }
                    .avatarItem--3 {
                        width: 31%;
                        height: 30%;
                        margin: 1%;
                    }
                }
            }
            .current {
                background: rgb(241, 237, 237);
            }
        }
    }
    .conversation-list-container/deep/.el-loading-spinner .path {
        stroke: #AB4D4E;
    }
}
.el-main {
    padding: 0;
}
.el-container {
    height: 100%;
}
</style>
