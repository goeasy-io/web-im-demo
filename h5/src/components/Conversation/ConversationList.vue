<template>
    <el-container class="conversation-list-container">
        <el-header class="conversation-list-title">
            <el-input placeholder="" size="small"> </el-input>
        </el-header>
        <el-aside class="conversation-list-content">
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
                            <div
                                v-if="
                                    conversation.unread &&
                                    currentUser.uuid !== conversation.lastMessage.senderId
                                "
                                class="mark"
                            >
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
</template>

<script>
import restApi from '../../lib/restapi';
export default {
    props: ['conversations'],
    data() {
        return {
            avatarList: [],
            currentUser: {},
            paramsData: this.$route.query.paramsName,
            currentConversationId: null,
        };
    },
    created() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentConversationId = this.$route.params.id || null;
    },
    mounted() {},
    watch: {
        $route() {
            if (this.$route.params.id !== 'undefined') {
                this.currentConversationId = this.$route.params.id;
            }
        },
    },
    methods: {
        goChatPage(conversation) {
            const id = conversation.userId || conversation.groupId;
            this.paramsData = id;
            this.$router.push({
                name: conversation.type,
                params: { id: id },
            });
        },
        showAction(conversation) {
            this.$emit('showAction', conversation);
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
.el-container {
    height: 100%;
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
    }
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
                color: #618DFF;
            }
            .conversation-bottom-action {
                width: 20px;
                height: 20px;
                background: url('../../assets/img/action.png') no-repeat center;
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
</style>
