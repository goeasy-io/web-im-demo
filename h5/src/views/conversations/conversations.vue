<template>
    <el-container class="conversations">
        <el-aside width="600" class="conversation-list">
            <keep-alive>
                <ConversationList :conversations="conversations" @showAction="showAction" />
            </keep-alive>
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
            <div class="no-chat" v-if="$route.name === ''">暂时没有会话</div>
        </el-main>
    </el-container>
</template>

<script>
import restapi from '../../lib/restapi';
import ConversationList from '../../components/ConversationList/conversation-list';
import PrivateChat from '../Chat/PrivateChat';
import GroupChat from '../Chat/GroupChat';
export default {
    name: 'Conversations',
    components: {
        ConversationList,
        PrivateChat,
        GroupChat,
    },
    data() {
        return {
            conversations: [],
            actionPopup: {
                conversation: null,
                visible: false,
            },
        };
    },
    created() {
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
    mounted() {
        this.listenConversationUpdate(); //监听会话列表变化
        this.loadConversations(); //加载会话列表
        this.subscribeGroup();
    },
    methods: {
        loadConversations() {
            this.goEasy.im.latestConversations({
                onSuccess: (result) => {
                    let content = result.content;
                    this.renderConversations(content);
                },
                onFailed: (error) => {
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
            let unreadTotal = content.unreadTotal;
            this.setUnreadAmount(unreadTotal);
        },
        setUnreadAmount(unreadTotal) {
            this.unreadTotal = unreadTotal;
        },
        subscribeGroup() {
            let groups = restapi.findGroups(this.currentUser);
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
            console.log('show', conversation);
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
            } else {
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
            } else {
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
    },
};
</script>

<style scoped lang="scss">
.conversations {
    width: 100%;
    height: 100%;
    position: relative;
}
.no-chat {

}
.el-main {
    padding: 0;
}
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
</style>
