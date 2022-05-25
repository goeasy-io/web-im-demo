<template>
    <el-container class="chat-box">
        <div class="chat-name">
            <div>{{ friend.name }}</div>
        </div>
        <div class="chat-content" ref="scrollView">
            <div class="chat-body" ref="chatView">
                <div class="history-loaded" @click="loadHistoryMessage(false)">
                    {{ allHistoryLoaded ? '已经没有更多的历史消息' : '获取历史消息' }}
                </div>
                <el-checkbox-group @change="selectMessages" v-model="messageSelector.ids">
                    <div v-for="(message, index) in messages" :key="index">
                        <div class="time-tips">
                            {{ renderMessageDate(message, index) }}
                        </div>
                        <div class="message-recalled" v-if="message.recalled">
                            <div v-if="message.senderId !== currentUser.uuid">{{friend.name}}撤回了一条消息</div>
                            <div v-else class="message-recalled-self">
                                <div>你撤回了一条消息</div>
                                <span v-if="message.type === 'text' && Date.now()-message.timestamp< 60 * 1000 " @click="editRecalledMessage(message.payload.text)">重新编辑</span>
                            </div>
                        </div>
                        <div class="message-item" v-else>
                            <div class="message-item-checkbox" v-show="messageSelector.visible && message.status !== 'sending'">
                                <el-checkbox
                                    :label="message.messageId"
                                    :value="message.messageId"
                                ></el-checkbox>
                            </div>
                            <div class="message-item-content" :class="{ self: message.senderId === currentUser.uuid }">
                                <div class="user-avatar">
                                    <img v-if="currentUser.uuid === message.senderId" :src="currentUser.avatar"/>
                                    <img v-else :src="friend.avatar"/>
                                </div>
                                <div class="message-content" @click.right="showActionPopup(message)">
                                    <div class="message-payload">
                                        <div class="pending" v-if="message.status === 'sending'"></div>
                                        <div class="send-fail" v-if="message.status === 'fail'"></div>
                                        <div class="content-text" v-if="message.type === 'text'">
                                            <div v-html="renderTextMessage(message)"></div>
                                        </div>
                                        <div class="content-image" v-if="message.type === 'image'">
                                            <viewer>
                                                <img :src="message.payload.url" alt="图片" />
                                            </viewer>
                                        </div>
                                        <a
                                            v-if="message.type === 'file'"
                                            :href="message.payload.url"
                                            target="_blank"
                                            download="download"
                                        >
                                            <div class="content-file">
                                                <div class="file-info">
                                                    <span class="file-name">{{ message.payload.name }}</span>
                                                    <span class="file-size">{{ (message.payload.size / 1024).toFixed(2) }}KB</span>
                                                </div>
                                                <img class="file-img" src="../../assets/img/file.png" />
                                            </div>
                                        </a>
                                        <GoEasyAudioPlayer
                                            v-if="message.type ==='audio'"
                                            :src="message.payload.url"
                                            :duration="message.payload.duration"
                                        />
                                        <GoEasyVideoPlayer
                                            v-if="message.type === 'video'"
                                            :video="message.payload.video"
                                            :thumbnail="message.payload.thumbnail"
                                            class="content-video"
                                        />
                                        <div class="content-custom" v-if="message.type === 'order'">
                                            <div class="title">
                                                <img src="../../assets/img/order.png" />
                                                <div>自定义消息</div>
                                            </div>
                                            <div>编号：{{message.payload.number}}</div>
                                            <div>商品: {{message.payload.goods}}</div>
                                            <div>金额: {{message.payload.price}}</div>
                                        </div>
                                    </div>
                                    <div :class="message.read ?'message-read':'message-unread'">
                                        <div v-if="message.senderId === currentUser.uuid">{{message.read?'已读':'未读'}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-checkbox-group>
            </div>
        </div>
        <div class="action-popup" v-if="actionPopup.visible" @click="actionPopup.visible = false">
            <div class="action-box">
                <div class="action-item" @click="deleteSingleMessage">删除</div>
                <div class="action-item" v-if="actionPopup.recallable" @click="recallMessage">撤回</div>
                <div class="action-item" @click="showCheckBox">多选</div>
                <div class="action-item" @click="actionPopup.visible = false">取消</div>
            </div>
        </div>
        <div class="chat-input">
            <div class="messageSelector-box" v-if="messageSelector.visible">
                <div class="messageSelector-btn" @click="deleteMultipleMessages"></div>
                <div>删除</div>
            </div>
            <MessagePanel
                v-else
                ref="messagePanel"
                @onSendMessage="onSendMessage"
                @click="scrollToBottom"
                :message="content"
                :receiver="friend"
            />
        </div>
    </el-container>
</template>

<script>
import restApi from '../../api/restapi';
import MessagePanel from '../../components/Chat/MessagePanel';
import EmojiDecoder from '../../utils/EmojiDecoder';
import GoEasyVideoPlayer from '../../components/GoEasyVideoPlayer/GoEasyVideoPlayer';
import GoEasyAudioPlayer from '../../components/GoEasyAudioPlayer/GoEasyAudioPlayer'
export default {
    name: 'PrivateChat',
    components: {
        MessagePanel,
        GoEasyVideoPlayer,
        GoEasyAudioPlayer,
    },
    data() {
        const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
        const emojiMap = {
            '[么么哒]': 'emoji_3@2x.png',
            '[乒乓]': 'emoji_4@2x.png',
            '[便便]': 'emoji_5@2x.png',
            '[信封]': 'emoji_6@2x.png',
            '[偷笑]': 'emoji_7@2x.png',
            '[傲慢]': 'emoji_8@2x.png',
        };
        return {
            content: '',
            friend: null,
            currentUser: null,
            messages: [],
            allHistoryLoaded: false,
            //定义表情列表
            emoji: {
                decoder: new EmojiDecoder(emojiUrl, emojiMap),
            },
            // 展示消息删除弹出框
            actionPopup: {
                visible: false,
                message: null,
                recallable: false,
            },
            // 消息选择
            messageSelector: {
                visible: false,
                messages: [],
                ids: []
            },
        };
    },
    created() {
        const friendId = this.$route.params.id;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.friend = restApi.findUserById(friendId);

        this.loadHistoryMessage(true);

        this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, (message) => {
            console.log('PRIVATE_MESSAGE_RECEIVED 收到消息：', message);
            if (message.senderId === this.friend.uuid) {
                this.messages.push(message);
                this.markPrivateMessageAsRead();
            }
            this.scrollToBottom();
        });
    },
    methods: {
        renderTextMessage(message) {
            return (
                '<span class="content-text">' +
                this.emoji.decoder.decode(message.payload.text) +
                '</span>'
            );
        },
        onSendMessage(message) {
            this.messages.push(message);
            if (message.type === 'image') {
                const img = new Image();
                img.src = message.payload.url;
                img.onload = () => this.scrollToBottom();
            } else {
                this.scrollToBottom();
            }
        },
        showActionPopup(message) {
            const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
            this.messageSelector.messages = [message];
            if ((Date.now() - message.timestamp) < MAX_RECALLABLE_TIME && message.senderId === this.currentUser.uuid && message.status === 'success') {
                this.actionPopup.recallable = true;
            } else {
                this.actionPopup.recallable = false;
            }
            this.actionPopup.visible = true;
        },
        deleteSingleMessage() {
            this.$alert('确认删除？')
                .then(() => {
                    this.actionPopup.visible = false;
                    this.deleteMessage();
                })
                .catch((e) => {
                    this.actionPopup.visible = false;
                });
        },
        deleteMultipleMessages() {
            if (this.messageSelector.messages.length > 0) {
                this.$alert('确认删除？')
                    .then(() => {
                        this.messageSelector.visible = false;
                        this.deleteMessage();
                    })
                    .catch((e) => {
                        this.messageSelector.visible = false;
                    });
            }
        },
        deleteMessage() {
            this.goEasy.im.deleteMessage({
                messages: this.messageSelector.messages,
                onSuccess: () => {
                    this.messageSelector.messages.forEach((message) => {
                        let index = this.messages.indexOf(message);
                        if (index > -1) {
                            this.messages.splice(index, 1);
                        }
                    });
                    this.messageSelector.messages = [];
                },
                onFailed: (error) => {
                    console.log('error:', error);
                },
            });
        },
        recallMessage() {
            this.actionPopup.visible = false;
            this.goEasy.im.recallMessage({
                messages: this.messageSelector.messages,
                onSuccess: ()=>{
                    console.log('撤回成功');
                },
                onFailed: (error) => {
                    console.log('撤回失败,error:', error);
                }
            });
        },
        editRecalledMessage (content) {
            this.$refs.messagePanel.onEditMessage();
            this.content = content;
        },
        showCheckBox() {
            this.messageSelector.messages = [];
            this.messageSelector.visible = true;
            this.actionPopup.visible = false;
        },
        selectMessages() {
            let selectedMessages = [];
            this.messages.forEach((message) => {
                if (this.messageSelector.ids.includes(message.messageId)) {
                    selectedMessages.push(message);
                }
            });
            this.messageSelector.messages = selectedMessages;
        },
        loadHistoryMessage(scrollToBottom) {
            //历史消息
            let lastMessageTimeStamp = null;
            let lastMessage = this.messages[0];
            if (lastMessage) {
                lastMessageTimeStamp = lastMessage.timestamp;
            }
            this.goEasy.im.history({
                userId: this.friend.uuid,
                lastTimestamp: lastMessageTimeStamp,
                limit: 10,
                onSuccess: (result) => {
                    let messages = result.content;
                    if (messages.length === 0) {
                        this.allHistoryLoaded = true;
                    } else {
                        this.messages = messages.concat(this.messages);
                        if (scrollToBottom) {
                            this.scrollToBottom();
                            //收到的消息设置为已读
                            this.markPrivateMessageAsRead();
                        }
                    }
                },
                onFailed: (error) => {
                    //获取失败
                    console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
                },
            });
        },
        markPrivateMessageAsRead() {
            this.goEasy.im.markPrivateMessageAsRead({
                userId: this.friend.uuid,
                onSuccess: function () {
                    console.log('标记私聊已读成功');
                },
                onFailed: function (error) {
                    console.log('标记私聊已读失败', error);
                },
            });
        },
        scrollToBottom() {
            this.$nextTick(() => {
                if (this.$refs.chatView) {
                    this.$refs.scrollView.scrollTop = this.$refs.chatView.scrollHeight;
                }
            });
        },
        renderMessageDate(message, index) {
            if (index === 0) {
                return this.formatDate(message.timestamp);
            } else {
                if (message.timestamp - this.messages[index - 1].timestamp > 5 * 60 * 1000) {
                    return this.formatDate(message.timestamp);
                }
            }
            return '';
        },
    },
};
</script>

<style lang="scss" scoped>
.chat-box {
    display: flex;
    flex-direction: column;
    position: relative;
    .chat-name {
        position: relative;
        height: 43px;
        font-size: 20px;
        font-weight: bold;
        padding: 5px 10px;
        text-align: left;
        display: flex;
        align-items: center;
        border-bottom: rgb(219, 214, 214) 1px solid;
    }
    .chat-content {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 0 15px;
        max-height: 386px;
        min-height: 386px;
        overflow: auto;
        overflow-y: scroll;
        scrollbar-color: transparent transparent;
        scrollbar-track-color: transparent;
        -ms-scrollbar-track-color: transparent;
        .history-loaded {
            text-align: center;
            font-size: 12px;
            color: #995656a8;
            cursor: pointer;
            line-height: 20px;
        }
        .time-tips {
            color: #999;
            text-align: center;
            font-size: 12px;
        }
        .message-item {
            display: flex;
            .message-item-checkbox {
                height: 50px;
                margin: 15px;
                display: flex;
                align-items: center;
            }
            .message-item-content {
                flex: 1;
                max-height: 230px;
                margin: 5px 0;
                overflow: hidden;
                display: flex;
                .user-avatar > img {
                    width: 50px;
                    height: 50px;
                }
                .message-content {
                    max-width: 460px;
                    .message-payload{
                        display: flex;
                        align-items: center;
                    }
                    .pending{
                        background: url("../../assets/img/pending.gif") no-repeat center;
                        background-size: 13px;
                        width: 15px;
                        height: 15px;
                    }
                    .send-fail{
                        background: url("../../assets/img/failed.png") no-repeat center;
                        background-size: 13px;
                        width: 15px;
                        height: 15px;
                    }
                    .message-read {
                        color: gray;
                        font-size: 12px;
                        text-align: end;
                        margin: 0 10px;
                        height: 16px;
                    }
                    .message-unread {
                        color: #af4e4e;
                        font-size: 12px;
                        text-align: end;
                        margin: 0 10px;
                        height: 16px;
                    }
                    .content-text {
                        text-align: left;
                        background: #FFFFFF;
                        font-size: 14px;
                        font-weight: 500;
                        padding: 10px 8px;
                        margin: 5px 10px;
                        line-height: 25px;
                        white-space: pre-line;
                        overflow-wrap: anywhere;
                        border-radius: 0 10px 10px 10px;
                    }
                    .content-image {
                        display: block;
                        margin: 5px 10px;
                        cursor: pointer;
                        max-height: 200px;
                        img {
                            max-width: 200px;
                            max-height: 200px;
                        }
                    }
                    .content-file {
                        width: 240px;
                        height: 65px;
                        font-size: 15px;
                        background: white;
                        display: flex;
                        margin: 5px 10px;
                        padding: 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        &:hover {
                            background: #f6f2f2;
                        }
                        .file-info {
                            width: 194px;
                            text-align: left;
                            .file-name {
                                text-overflow: ellipsis;
                                overflow: hidden;
                                display: -webkit-box;
                                word-break: break-all;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            .file-size {
                                font-size: 12px;
                                color: #ccc;
                            }
                        }
                        .file-img {
                            width: 30px;
                            height: 30px;
                            margin: auto 8px;
                        }
                    }
                    .content-video {
                        max-height: 240px;
                        margin: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .content-custom {
                        width: 150px;
                        height: 110px;
                        display: flex;
                        flex-direction: column;
                        font-size: 14px;
                        background: #ffffff;
                        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
                        border-radius: 10px;
                        padding: 0 10px;
                        margin: 5px 10px;
                        text-align: left;
                        line-height: 25px;
                        .title {
                            display: flex;
                            align-items: center;
                            font-size: 15px;
                            flex: 1;
                            img {
                                width: 20px;
                                height: 20px;
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
            .self {
                overflow: hidden;
                display: flex;
                justify-content: flex-start;
                flex-direction: row-reverse;
                .content-text {
                    background: #d1bfb6 !important;
                    border-radius: 10px 0 10px 10px !important;
                }
            }
            .self/deep/.audio-facade {
                flex-direction: row-reverse;
                background: #d1bfb6 !important;
            }
            .self/deep/.audio-facade-bg {
                background: url("../../assets/img/voice.png") no-repeat center;
                background-size: 15px;
                width: 20px;
                -moz-transform:rotate(180deg);
                -webkit-transform:rotate(180deg);
                -o-transform:rotate(180deg);
                transform:rotate(180deg);
            }
            .self/deep/.play-icon {
                background: url("../../assets/img/play.gif") no-repeat center;
                background-size: 20px;
                -moz-transform:rotate(180deg);
                -webkit-transform:rotate(180deg);
                -o-transform:rotate(180deg);
                transform:rotate(180deg);
            }
        }
        .message-item/deep/.el-checkbox__label {
            display: none;
        }
        .message-item/deep/.el-checkbox__inner {
            border-radius: 8px;
            width: 16px;
            height: 16px;
        }
        .message-item/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #AC4E4E;
            border-color: #AC4E4E;
        }
        .message-recalled {
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 28px;
            font-size: 13px;
            text-align: center;
            color: grey;
            margin-top: 10px;
            .message-recalled-self {
                display: flex;
                span {
                    margin-left: 5px;
                    color: #AC4E4E;
                    cursor: pointer;
                }
            }
        }
    }
    .chat-content::-webkit-scrollbar {
        width: 1px;
    }
    .chat-content::-webkit-scrollbar-thumb {
        background-color: #99565600;
    }
    .chat-input {
        height: 160px;
        .messageSelector-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: white;
            .messageSelector-btn {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: url("../../assets/img/delete.png") no-repeat center center #E9E6EC;
                cursor: pointer;
                margin-bottom: 5px;
            }
        }
    }
    .action-popup {
        width: 599px;
        height: 386px;
        position: absolute;
        top: 54px;
        left: 0;
        background: rgba(51, 51, 51, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        .action-box {
            width: 150px;
            height: 120px;
            background: #ffffff;
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
    }
}
</style>
