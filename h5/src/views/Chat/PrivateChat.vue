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
                        <div class="time-tips" v-if="renderMessageDate(message, index)">
                            {{ renderMessageDate(message, index) }}
                        </div>
                        <div class="message-item">
                            <div class="message-item-checkbox" v-show="messageSelector.visible && message.status !== 'sending'">
                                <el-checkbox
                                    :label="message.messageId"
                                    :value="message.messageId"
                                ></el-checkbox>
                            </div>
                            <div class="message-item-content" :class="{ self: message.senderId === currentUser.uuid }">
                                <div class="user-avatar">
                                    <img v-if="currentUser.uuid === message.senderId" :src="currentUser.avatar"/>
                                    <img v-else :src="friend.avatar" alt="" />
                                </div>
                                <div class="message-content" @click.right="showActionPopup(message)">
                                    <div class="content-text" v-if="message.type === 'text'">
                                        <div v-html="renderTextMessage(message)"></div>
                                    </div>
                                    <div class="content-image" v-if="message.type === 'image'">
                                        <viewer>
                                            <img :src="message.payload.url" alt="图片" />
                                        </viewer>
                                    </div>
                                    <a
                                        :href="message.payload.url"
                                        target="_blank"
                                        download="download"
                                    >
                                        <div class="content-file" v-if="message.type === 'file'">
                                            <div class="file-info">
                                                <span class="file-name">{{ message.payload.name }}</span>
                                                <span class="file-size">{{ (message.payload.size / 1024).toFixed(2) }}KB</span>
                                            </div>
                                            <img class="file-img" src="../../assets/img/file.png" />
                                        </div>
                                    </a>

                                    <div class="content-audio" v-if="message.type === 'audio'">
                                        <audio controls :src="message.payload.url"></audio>
                                    </div>
                                    <VideoPlayer
                                        v-if="message.type === 'video'"
                                        :video="message.payload.video"
                                        :thumbnail="message.payload.thumbnail"
                                        class="content-video"
                                    />
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
                @sendTextMessage="sendTextMessage"
                @sendOtherMessage="sendOtherMessage"
                @click="scrollToBottom"
                :receiver="friend"
            />
        </div>
    </el-container>
</template>

<script>
import restApi from '../../lib/restapi';
import MessagePanel from '../../components/Chat/message-panel';
import EmojiDecoder from '../../lib/EmojiDecoder';
import VideoPlayer from '../../components/VideoPlayer/video-player';
export default {
    name: 'PrivateChat',
    components: {
        MessagePanel,
        VideoPlayer,
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
            friend: null,
            currentUser: null,
            messages: [],
            allHistoryLoaded: false,
            //定义表情列表
            emoji: {
                url: emojiUrl,
                map: emojiMap,
                visible: false,
                decoder: new EmojiDecoder(emojiUrl, emojiMap),
            },
            // 展示消息删除弹出框
            actionPopup: {
                visible: false,
                message: null,
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
                '<span class="text-content">' +
                this.emoji.decoder.decode(message.payload.text) +
                '</span>'
            );
        },
        sendMessage(message) {
            this.goEasy.im.sendMessage({
                message: message,
                onSuccess: (message) => {
                    this.messages.push(message);
                    this.scrollToBottom();
                },
            });
        },
        sendTextMessage(message) {
            const textMessage = this.goEasy.im.createTextMessage({
                text: message,
                to: {
                    id: this.friend.uuid,
                    data: this.friend,
                    type: this.GoEasy.IM_SCENE.PRIVATE,
                },
            });
            this.sendMessage(textMessage);
        },
        sendOtherMessage(message) {
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
            this.actionPopup.visible = true;
            this.messageSelector.messages = [message];
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
                onSuccess: (result) => {
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
            console.log('scrollToBottom');
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
        height: 42px;
        font-size: 20px;
        font-weight: bold;
        padding: 5px 10px;
        text-align: left;
        display: flex;
        align-items: center;
        border-bottom: rgb(219, 214, 214) 2px solid;
    }
    .chat-content {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 0 20px;
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
                max-height: 200px;
                margin-top: 15px;
                margin-bottom: 15px;
                overflow: hidden;
                display: flex;
            }
            .self{
                overflow: hidden;
                display: flex;
                justify-content: flex-start;
                flex-direction: row-reverse;
                .content-text {
                    border-radius: 10px 0 10px 10px !important;
                }
            }
            .content-text {
                text-align: left;
                background: #d1bfb6ec;
                font-size: 14px;
                font-weight: 500;
                padding: 10px 8px;
                margin: 5px 10px;
                line-height: 25px;
                white-space: pre-line;
                border-radius: 0 10px 10px 10px;
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

.content-emoji {
    margin: 0;
    padding: 0;
}
.message-content {
    max-width: 80%;
}
.user-avatar img {
    width: 50px;
    height: 50px;
}
.content-image {
    display: block;
    width: 200px;
    height: 100%;
    margin: 5px 10px;
    cursor: pointer;
    .content-image img {
        width: 200px;
    }
}
.content-file {
    width: 250px;
    height: 80px;
    font-size: 15px;
    background: white;
    display: flex;
    margin: auto 10px;
    border-radius: 5px;
    justify-content: space-around;
    cursor: pointer;
    .file-info {
        width: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: left;
        line-height: 40px;
        .file-name {
            width: 180px;
            line-height: 30px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .file-size {
            width: 100px;
            font-size: 12px;
            color: #ccc;
        }
    }
    .file-img {
        width: 30px;
        height: 30px;
        margin: auto 5px;
    }
}
.content-video {
    max-height: 240px;
    margin: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
.content-audio audio {
    width: 220px;
    height: 40px;
    margin: 5px;
}
audio:focus {
    outline: none;
}
</style>
<style>
.el-checkbox__label {
    display: none !important;
}
.el-textarea__inner {
    max-height: 73px;
}
</style>
