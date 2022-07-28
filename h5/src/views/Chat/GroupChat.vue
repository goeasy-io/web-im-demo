<template>
    <div class="chat-box">
        <div class="chat-header">
            <div>{{ group.name }}</div>
        </div>
        <div class="chat-main" ref="scrollView" @scroll="listenScroll">
            <div class="message-list" ref="messageList">
                <div v-if="history.loading" class="history-loading">
                    <img src="../../assets/img/pending.gif" />
                </div>
                <div v-else class="history-loaded" @click="loadHistoryMessage(false,0)">
                    {{ history.allLoaded ? '已经没有更多的历史消息' : '获取历史消息' }}
                </div>
                <div v-for="(message, index) in history.messages" :key="index">
                    <div class="time-tips">
                        {{ renderMessageDate(message, index) }}
                    </div>
                    <div class="message-recalled" v-if="message.recalled">
                        <div v-if="message.senderId !== currentUser.uuid">{{message.senderData.name}}撤回了一条消息</div>
                        <div v-else class="message-recalled-self">
                            <div>你撤回了一条消息</div>
                            <span v-if="message.type === 'text' && Date.now()-message.timestamp< 60 * 1000 " @click="editRecalledMessage(message.payload.text)">重新编辑</span>
                        </div>
                    </div>
                    <div class="message-item" v-else>
                        <div class="message-item-checkbox" v-if="messageSelector.visible && message.status !== 'sending'">
                            <input type="checkbox" :value="message.messageId" v-model="messageSelector.ids" @click="selectMessages">
                        </div>
                        <div class="message-item-content" :class="{ self: message.senderId === currentUser.uuid }">
                            <div class="user-avatar">
                                <img v-if="currentUser.uuid === message.senderId" :src="currentUser.avatar"/>
                                <img v-else :src="message.senderData.avatar" />
                            </div>
                            <div class="message-content" @click.right="showActionPopup(message)">
                                <div class="message-payload">
                                    <div class="pending" v-if="message.status === 'sending'"></div>
                                    <div class="send-fail" v-if="message.status === 'fail'"></div>
                                    <div class="content-text" v-if="message.type === 'text'" v-html="emoji.decoder.decode(message.payload.text)"></div>
                                    <div class="content-image"
                                         v-if="message.type === 'image'"
                                         :style="getImgHeight(message.payload.width,message.payload.height)"
                                         @click="showImagePreview(message.payload.url)"
                                    >
                                        <img :src="message.payload.url" alt="图片"/>
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
                                                <span class="file-size">{{ (message.payload.size / 1024).toFixed(2) }} KB</span>
                                            </div>
                                            <img class="file-img" src="../../assets/img/file.png" />
                                        </div>
                                    </a>
                                    <goeasy-audio-player
                                        v-if="message.type ==='audio'"
                                        :src="message.payload.url"
                                        :duration="message.payload.duration"
                                    />
                                    <goeasy-video-player
                                        v-if="message.type === 'video'"
                                        :thumbnail="message.payload.thumbnail"
                                        :src="message.payload.video.url"
                                    />
                                    <div class="content-custom" v-if="message.type === 'order'">
                                        <div class="title">
                                            <img src="../../assets/img/order.png" />
                                            <div>自定义消息</div>
                                        </div>
                                        <div>编号: {{message.payload.number}}</div>
                                        <div>商品: {{message.payload.goods}}</div>
                                        <div>金额: {{message.payload.price}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-footer">
            <div class="action-delete" v-if="messageSelector.visible">
                <div class="delete-btn" @click="deleteMultipleMessages"></div>
                <div>删除</div>
            </div>
            <div class="action-box" v-else>
                <div class="action-bar">
                    <!-- 表情 -->
                    <div class="action-item">
                        <div class="emoji-box" v-if="emoji.visible">
                            <img
                                class="emoji-item"
                                v-for="(emojiItem, emojiKey, index) in emoji.map"
                                :key="index"
                                :src="emoji.url + emojiItem"
                                @click="chooseEmoji(emojiKey)"
                            />
                        </div>
                        <i class="iconfont icon-smile" title="表情" @click="showEmojiBox"></i>
                    </div>
                    <!-- 图片 -->
                    <div class="action-item">
                        <label for="img-input">
                            <i class="iconfont icon-picture" title="图片"></i>
                        </label>
                        <input
                            accept="image/*"
                            type="file"
                            multiple
                            @change="sendImageMessage"
                            id="img-input"
                            v-show="false"
                        />
                    </div>
                    <!-- 视频 -->
                    <div class="action-item">
                        <label for="video-input">
                            <i class="iconfont icon-film" title="视频"></i>
                        </label>
                        <input
                            accept="video/*"
                            type="file"
                            @change="sendVideoMessage"
                            id="video-input"
                            v-show="false"
                        />
                    </div>
                    <!-- 文件 -->
                    <div class="action-item">
                        <label for="file-input">
                            <i class="iconfont icon-wenjianjia" title="文件"></i>
                        </label>
                        <input
                            type="file"
                            @change="sendFileMessage"
                            id="file-input"
                            v-show="false"
                        />
                    </div>
                    <!-- 自定义 -->
                    <div class="action-item">
                        <div class="order-form" v-if="customMessageForm.visible">
                            <div class="order-form-item">
                                <div class="order-form-label">编号</div>
                                <div class="order-form-input">
                                    <input v-model="customMessageForm.number" />
                                </div>
                            </div>
                            <div class="order-form-item">
                                <div class="order-form-label">商品</div>
                                <div class="order-form-input">
                                    <input v-model="customMessageForm.goods" />
                                </div>
                            </div>
                            <div class="order-form-item">
                                <div class="order-form-label">金额</div>
                                <div class="order-form-input">
                                    <input v-model="customMessageForm.price" />
                                </div>
                            </div>
                            <button class="cancel-button" @click="customMessageForm.visible = false">取消</button>
                            <button class="send-button" @click="sendCustomMessage">创建</button>
                        </div>
                        <i class="iconfont icon-dingdan" title="订单" @click="showCustomMessageForm"></i>
                    </div>
                </div>

                <div class="input-box">
                    <textarea
                        autocomplete="off"
                        class="input-content"
                        v-model="text"
                        ref="textBox"
                    ></textarea>
                </div>

                <div class="send-box">
                    <button class="send-button" @click="sendTextMessage">发送</button>
                </div>

            </div>
        </div>
        <div class="action-popup" v-if="actionPopup.visible" @click="actionPopup.visible = false">
            <div class="action-popup-main">
                <div class="action-item" @click="deleteSingleMessage">删除</div>
                <div class="action-item" v-if="actionPopup.recallable" @click="recallMessage">撤回</div>
                <div class="action-item" @click="showCheckBox">多选</div>
                <div class="action-item" @click="actionPopup.visible = false">取消</div>
            </div>
        </div>
        <div class="image-preview" v-if="imagePreview.visible">
            <img :src="imagePreview.url" alt="图片" />
            <span class="close" @click="imagePreview.visible = false">x</span>
        </div>
    </div>
</template>

<script>
import restApi from '../../api/restapi';
import EmojiDecoder from '../../utils/EmojiDecoder';
import GoeasyAudioPlayer from "../../components/GoEasyAudioPlayer/GoEasyAudioPlayer";
import GoeasyVideoPlayer from "../../components/GoEasyVideoPlayer/GoEasyVideoPlayer";
export default {
    name: 'GroupChat',
    components: {
        GoeasyVideoPlayer,
        GoeasyAudioPlayer,
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
            currentUser: null,
            group: null,

            history: {
                messages: [],
                allLoaded: false,
                loading: true
            },

            text: '',

            //定义表情列表
            emoji: {
                url: emojiUrl,
                map : emojiMap,
                visible: false,
                decoder: new EmojiDecoder(emojiUrl, emojiMap),
            },
            customMessageForm: {
                visible: false,
                number: null,
                goods: null,
                price: null
            },
            imagePreview: {
                visible: false,
                url: ''
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
                ids: []
            },
        };
    },
    created() {
        const groupId = this.$route.params.id;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.group = restApi.findGroupById(groupId);

        this.loadHistoryMessage(true,0);

        this.goEasy.im.on(this.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, this.onReceivedGroupMessage);
    },
    beforeDestroy(){
        this.goEasy.im.off(this.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, this.onReceivedGroupMessage);
    },
    methods: {
        getImgHeight (width,height) {
            if (width < height) {
                return { height:'200px' }
            } else if (width > height) {
                return { height:'150px' }
            } else {
                return { height: '100%' }
            }
        },
        onReceivedGroupMessage(message) {
            let groupId = message.groupId;
            if (groupId === this.group.uuid) {
                this.history.messages.push(message);
                this.markGroupMessageAsRead();
            }
            this.scrollTo(0);
        },
        sendTextMessage() {
            if (!this.text.trim()) {
                console.log('输入为空');
                return
            }
            const textMessage = this.goEasy.im.createTextMessage({
                text: this.text,
                to: {
                    type: this.GoEasy.IM_SCENE.GROUP,
                    id: this.group.uuid,
                    data: this.group,
                },
            });
            this.sendMessage(textMessage);
            this.text = '';
            this.$nextTick(() => {
                this.$refs.textBox.focus();
            });
        },
        showEmojiBox () {
            this.emoji.visible = !this.emoji.visible;
        },
        chooseEmoji(emojiKey) {
            this.text += emojiKey;
            this.emoji.visible = false;
        },
        sendImageMessage(e) {
            let fileList = [...e.target.files];
            fileList.forEach((file) => {
                const imageMessage = this.goEasy.im.createImageMessage({
                    file: file,
                    to: {
                        type: this.GoEasy.IM_SCENE.GROUP,
                        id: this.group.uuid,
                        data: this.group,
                    },
                });
                imageMessage.buildOptions.complete.then(() => {
                   this.sendMessage(imageMessage);
                }).catch((error) => {
                    console.log(error);
                });
            })
        },
        sendVideoMessage(e) {
            const file = e.target.files[0];
            const videoMessage = this.goEasy.im.createVideoMessage({
                file: file,
                to: {
                    type: this.GoEasy.IM_SCENE.GROUP,
                    id: this.group.uuid,
                    data: this.group,
                },
            });
            videoMessage.buildOptions.complete.then(() => {
                this.sendMessage(videoMessage);
            }).catch((error) => {
                console.log(error);
            });
        },
        sendFileMessage(e) {
            const file = e.target.files[0];
            const fileMessage = this.goEasy.im.createFileMessage({
                file: file,
                to: {
                    type: this.GoEasy.IM_SCENE.GROUP,
                    id: this.group.uuid,
                    data: this.group,
                },
            });
            this.sendMessage(fileMessage);
        },
        showCustomMessageForm () {
            this.customMessageForm = {
                visible: true,
                number: null,
                goods: null,
                price: null
            }
        },
        sendCustomMessage () {
            this.customMessageForm.visible = false;
            const customMessage = this.goEasy.im.createCustomMessage({
                type : 'order',
                payload : {
                    number : this.customMessageForm.number,
                    goods : this.customMessageForm.goods,
                    price : this.customMessageForm.price
                },
                to: {
                    type: this.GoEasy.IM_SCENE.GROUP,
                    id: this.group.uuid,
                    data: this.group,
                }
            });
            this.sendMessage(customMessage);
        },
        sendMessage(message) {
            this.history.messages.push(message);
            this.scrollTo(0);
            this.goEasy.im.sendMessage({
                message: message,
                onSuccess: (message) => {
                    console.log('发送成功',message);
                },
            });
        },
        showActionPopup(message) {
            const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
            this.messageSelector.ids = [message.messageId];
            if ((Date.now() - message.timestamp) < MAX_RECALLABLE_TIME && message.senderId === this.currentUser.uuid && message.status === 'success') {
                this.actionPopup.recallable = true;
            } else {
                this.actionPopup.recallable = false;
            }
            this.actionPopup.visible = true;
        },
        deleteSingleMessage() {
            this.actionPopup.visible = false;
            this.deleteMessage();
        },
        deleteMultipleMessages() {
            if (this.messageSelector.ids.length > 0) {
                this.messageSelector.visible = false;
                this.deleteMessage();
            }
        },
        deleteMessage() {
            let conf = confirm("确认删除？");
            if (conf === true) {
                let selectedMessages = [];
                this.history.messages.forEach((message) => {
                    if (this.messageSelector.ids.includes(message.messageId)) {
                        selectedMessages.push(message);
                    }
                });
                this.goEasy.im.deleteMessage({
                    messages: selectedMessages,
                    onSuccess: () => {
                        selectedMessages.forEach((message) => {
                            let index = this.history.messages.indexOf(message);
                            if (index > -1) {
                                this.history.messages.splice(index, 1);
                            }
                        });
                        this.messageSelector.ids = [];
                    },
                    onFailed: (error) => {
                        console.log('error:', error);
                    },
                });
            } else {
                this.messageSelector.ids = [];
            }
        },
        recallMessage() {
            let selectedMessages = [];
            this.history.messages.forEach((message) => {
                if (this.messageSelector.ids.includes(message.messageId)) {
                    selectedMessages.push(message);
                }
            });
            this.actionPopup.visible = false;
            this.goEasy.im.recallMessage({
                messages: selectedMessages,
                onSuccess: ()=>{
                    console.log('撤回成功');
                },
                onFailed: (error) => {
                    console.log('撤回失败,error:', error);
                }
            });
        },
        editRecalledMessage (text) {
            this.text = text;
        },
        showImagePreview(url) {
            this.imagePreview.visible = true;
            this.imagePreview.url = url;
        },
        showCheckBox() {
            this.messageSelector.ids = [];
            this.messageSelector.visible = true;
            this.actionPopup.visible = false;
        },
        selectMessages(e) {
            if (e.target.checked) {
                this.messageSelector.ids.push(e.target.value)
            } else {
                let index = this.messageSelector.ids.indexOf(e.target.value);
                if (index > -1) {
                    this.messageSelector.ids.splice(index, 1);
                }
            }
        },
        loadHistoryMessage(scrollTo,offsetHeight) {
            this.history.loading = true;
            //历史消息
            let lastMessageTimeStamp = null;
            let lastMessage = this.history.messages[0];
            if (lastMessage) {
                lastMessageTimeStamp = lastMessage.timestamp;
            }
            this.goEasy.im.history({
                groupId: this.group.uuid,
                lastTimestamp: lastMessageTimeStamp,
                limit: 10,
                onSuccess: (result) => {
                    this.history.loading = false;
                    let messages = result.content;
                    if (messages.length === 0) {
                        this.history.allLoaded = true;
                    } else {
                        this.history.messages = messages.concat(this.history.messages);
                        if (scrollTo) {
                            this.scrollTo(offsetHeight);
                            //收到的消息设置为已读
                            this.markGroupMessageAsRead();
                        }
                    }
                },
                onFailed: (error) => {
                    //获取失败
                    this.history.loading = false;
                    console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
                },
            });
        },
        markGroupMessageAsRead() {
            this.goEasy.im.markGroupMessageAsRead({
                groupId: this.group.uuid,
                onSuccess: function () {
                    console.log('标记群聊已读成功');
                },
                onFailed: function (error) {
                    console.log('标记群聊已读失败', error);
                },
            });
        },
        listenScroll(e){
            if (e.target.scrollTop === 0 && !this.history.allLoaded) {
                const offsetHeight = this.$refs.messageList.offsetHeight;
                this.loadHistoryMessage(true,offsetHeight);
            }
        },
        scrollTo(offsetHeight) {
            this.$nextTick(() => {
                this.$refs.scrollView.scrollTop = this.$refs.messageList.scrollHeight - offsetHeight;
            });
        },
        renderMessageDate(message, index) {
            if (index === 0) {
                return this.formatDate(message.timestamp);
            } else {
                if (message.timestamp - this.history.messages[index - 1].timestamp > 5 * 60 * 1000) {
                    return this.formatDate(message.timestamp);
                }
            }
            return '';
        }
    },
};
</script>

<style lang="scss" scoped>
.chat-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .chat-header {
        position: relative;
        font-size: 20px;
        font-weight: bold;
        padding: 15px 10px;
        text-align: left;
        display: flex;
        align-items: center;
        border-bottom: rgb(219, 214, 214) 1px solid;
    }
    .chat-main {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 0 15px 160px 15px;
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
                height: 55px;
                margin-right: 15px;
                display: flex;
                align-items: center;
                input[type="checkbox" i] {
                    position: relative;
                }
                input[type="checkbox"]::before,input[type="checkbox"]:checked::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: #FFFFFF;
                    width: 18px;
                    height: 18px;
                    border: 1px solid #cccccc;
                }
                input[type="checkbox"]:checked::before {
                    content: "\2713";
                    background-color: #93262b;
                    width: 18px;
                    color: #FFFFFF;
                    text-align: center;
                    font-weight: bold;
                }
            }
            .message-item-content {
                flex: 1;
                max-height: 230px;
                margin: 5px 0;
                overflow: hidden;
                display: flex;
                .user-avatar > img {
                    width: 45px;
                    height: 45px;
                    margin-top: 5px;
                }
                .message-content {
                    max-width: calc(100% - 100px);
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
                        color: #93262b;
                        font-size: 12px;
                        text-align: end;
                        margin: 0 10px;
                        height: 16px;
                    }
                    .content-text {
                        display: flex;
                        align-items: center;
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
    .chat-main::-webkit-scrollbar {
        width: 1px;
    }
    .chat-main::-webkit-scrollbar-thumb {
        background-color: #99565600;
    }
    .chat-footer {
        height: 160px;
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 999;
        .action-delete {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: white;
            .delete-btn {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: url("../../assets/img/delete.png") no-repeat center center #E9E6EC;
                cursor: pointer;
                margin-bottom: 5px;
            }
        }
        .action-box {
            display: flex;
            flex-direction: column;
            padding: 0;
            height: 160px;
            background-color: white;
            .action-bar {
                display: flex;
                flex-direction: row;
                padding: 0 10px;
                .action-item {
                    text-align: left;
                    padding: 10px 0;
                    position: relative;
                    .iconfont {
                        font-size: 22px;
                        margin: 0 10px;
                        z-index: 3;
                        &:focus {
                            outline: none;
                        }
                        &:hover {
                            color: #93262b;
                        }
                    }
                    .emoji-box {
                        width: 250px;
                        position: absolute;
                        top: -126px;
                        left: -53px;
                        z-index: 2007;
                        margin-bottom: 12px;
                        background: #FFF;
                        min-width: 150px;
                        border: 1px solid #EBEEF5;
                        padding: 12px;
                        text-align: justify;
                        font-size: 14px;
                        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
                        word-break: break-all;
                        border-radius: 4px;
                        display: flex;
                        flex-wrap: wrap;
                        .emoji-item {
                            width: 50px;
                            height: 50px;
                        }
                    }
                    .order-form {
                        width: 220px;
                        position: absolute;
                        top: -160px;
                        left: -105px;
                        z-index: 2015;
                        margin-bottom: 12px;
                        background: #FFF;
                        border: 1px solid #EBEEF5;
                        padding: 12px;
                        color: #606266;
                        text-align: justify;
                        font-size: 14px;
                        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
                        border-radius: 4px;
                        .order-form-item {
                            display: flex;
                            margin: 10px 0;
                            .order-form-label {
                                width: 50px;
                            }
                            .order-form-input {
                                input:focus-visible {
                                    outline: none;
                                }
                            }
                        }
                    }
                }
            }
            .input-box {
                padding: 0 10px;
                .input-content {
                    min-height: 66px;
                    border: none;
                    resize: none;
                    display: block;
                    padding: 5px 15px;
                    box-sizing: border-box;
                    width: 100%;
                    color: #606266;
                    outline: none;
                    background-color: #FFF;
                }
            }
            .send-box {
                padding: 5px 10px;
                text-align: right;
            }
            .cancel-button {
                margin: 0 35px 0 50px;
                border: none;
                padding: 6px 15px;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
                text-align: center;
                font-weight: 500;
                &:hover {
                    background: #FFFFFF;
                    color: #8c8c91;
                }
            }
            .send-button {
                background: #93262b;
                color: white;
                border: none;
                padding: 6px 15px;
                font-size: 12px;
                border-radius: 3px;
                cursor: pointer;
                text-align: center;
                font-weight: 500;
                &:active {
                    background: #93262b57;
                    color: #93262b;
                }
                &:hover {
                    background: #d38989;
                    color: white;
                }
                &:focus {
                    background: #93262b;
                    color: white;
                }
            }
        }
    }
    .action-popup {
        width: 100%;
        height: 485px;
        position: absolute;
        top: 54px;
        left: 0;
        background: rgba(51, 51, 51, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        .action-popup-main {
            width: 150px;
            height: 120px;
            background: #ffffff;
            z-index: 100;
            border-radius: 10px;
            overflow: hidden;
            .action-item {
                text-align: center;
                line-height: 40px;
                font-size: 15px;
                color: #262628;
                border-bottom: 1px solid #efefef;
            }
        }
    }
    .image-preview {
        max-width: 750px;
        max-height: 500px;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9998;
        img {
            max-width: 750px;
            max-height: 500px;
        }
        .close {
            padding: 0 8px;
            background: #f6f2f2;
            border: 1px solid #eeeeee;
            font-size: 15px;
            cursor: pointer;
            color: #333333;
            position: absolute;
            top: 4px;
            right: 10px;
        }
    }
}
</style>
