<template>
    <div class="message-sender">
        <div class="actions">
            <!-- 语音 -->
            <div class="chat-option">
                <label for="audio-input" @click="showAudioRecorder" :title="audio.visible ?'键盘':'语音'">
                    <i v-if="!audio.visible" class="iconfont icon-maikefeng"></i>
                    <i v-else class="iconfont icon-jianpan"></i>
                </label>
            </div>
            <!-- 表情 -->
            <div class="chat-option">
                <div class="emoji-box" v-if="emoji.visible" title="表情">
                    <div class="emoji-list">
                        <img
                            class="emoji-item"
                            v-for="(emojiItem, emojiKey, index) in emojiMap"
                            :key="index"
                            :src="emojiUrl + emojiItem"
                            @click="chooseEmoji(emojiKey)"
                        />
                    </div>
                </div>
                <i class="iconfont icon-smile" slot="reference"  @click="showEmojiBox"></i>
            </div>
            <!-- 图片 -->
            <div class="chat-option">
                <label for="img-input" title="图片">
                    <i class="iconfont icon-picture"></i>
                </label>
                <input
                    accept="image/*"
                    type="file"
                    multiple
                    @change="createImageMessage"
                    id="img-input"
                    ref="img-input"
                    v-show="false"
                />
            </div>
            <!-- 视频 -->
            <div class="chat-option">
                <label for="video-input" title="视频">
                    <i class="iconfont icon-film"></i>
                </label>
                <input
                    accept="video/*"
                    type="file"
                    @change="createVideoMessage"
                    id="video-input"
                    ref="video-input"
                    v-show="false"
                />
            </div>
            <!-- 文件 -->
            <div class="chat-option">
                <label for="file-input" title="文件">
                    <i class="iconfont icon-folder-open"></i>
                </label>
                <input
                    type="file"
                    @change="createFileMessage"
                    id="file-input"
                    ref="file-input"
                    v-show="false"
                />
            </div>
            <!-- 自定义 -->
            <div class="chat-option">
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
                    <button class="primary-button" @click="createCustomMessage">创建</button>
                </div>
                <i class="iconfont el-icon-edit-outline" @click="showCustomMessageForm"></i>
            </div>
        </div>

        <div class="content-send" v-if="!audio.visible">
            <textarea
                autocomplete="off"
                class="content-input"
                v-model="content"
                ref="input"
            ></textarea>
        </div>

        <div class="send-message" v-if="!audio.visible">
            <button class="primary-button" @click="createTextMessage">发送</button>
        </div>

        <GoEasyRecorder @onComplete="createAudioMessage" v-if="audio.visible" />
    </div>
</template>

<script>
import GoEasyRecorder from "../GoEasyRecorder/GoEasyRecorder";
export default {
    props: ['receiver', 'message'],
    components: {
        GoEasyRecorder,
    },
    watch: {
        message: function (newVal, oldVal) {
            this.content = newVal;
        }
    },
    data() {
        return {
            content: '',
            type: this.$route.name,
            emojiUrl: 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/',
            emojiMap: {
                '[么么哒]': 'emoji_3@2x.png',
                '[乒乓]': 'emoji_4@2x.png',
                '[便便]': 'emoji_5@2x.png',
                '[信封]': 'emoji_6@2x.png',
                '[偷笑]': 'emoji_7@2x.png',
                '[傲慢]': 'emoji_8@2x.png',
            },
            audio : {
                //语音录音中
                recording : false,
                //录音按钮展示
                visible : false
            },
            scene: null,
            customMessageForm: {
                visible: false,
                number: null,
                goods: null,
                price: null
            },
            emoji: {
                visible: false
            }
        };
    },
    created() {
        if (this.type === 'private') {
            this.scene = this.GoEasy.IM_SCENE.PRIVATE;
        } else if (this.type === 'group') {
            this.scene = this.GoEasy.IM_SCENE.GROUP;
        }
    },
    methods: {
        handleMessage () {
          if (this.audio.visible) {
            this.audio.visible = false;
          }
        },
        showAudioRecorder() {
            this.audio.visible = !this.audio.visible;
        },
        createAudioMessage (file) {
            let audioMessage = this.goEasy.im.createAudioMessage({
                to : {
                    type: this.scene,
                    id: this.receiver.uuid,
                    data: this.receiver,
                },
                file: file,
                onProgress :function (progress) {
                    console.log(progress)
                }
            });
            this.sendMessage(audioMessage);
        },
        createTextMessage() {
            if (!this.content.trim()) {
                console.log('输入为空');
                return
            }
            const textMessage = this.goEasy.im.createTextMessage({
                text: this.content,
                to: {
                    type: this.scene,
                    id: this.receiver.uuid,
                    data: this.receiver,
                },
            });
            this.sendMessage(textMessage);
            this.content = '';
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        },
        showEmojiBox () {
            this.emoji.visible = !this.emoji.visible;
        },
        chooseEmoji(emojiKey) {
            this.content += emojiKey;
            this.emoji.visible = false;
        },
        createImageMessage(e) {
            let fileList = [...e.target.files];
            fileList.forEach((file) => {
                const imageMessage = this.goEasy.im.createImageMessage({
                    file: file,
                    to: {
                        type: this.scene,
                        id: this.receiver.uuid,
                        data: this.receiver,
                    },
                });
                this.sendMessage(imageMessage);
            })
        },
        createVideoMessage(e) {
            const file = e.target.files[0];
            const videoMessage = this.goEasy.im.createVideoMessage({
                file: file,
                to: {
                    type: this.scene,
                    id: this.receiver.uuid,
                    data: this.receiver,
                },
            });
            this.sendMessage(videoMessage);
        },
        createFileMessage(e) {
            const file = e.target.files[0];
            const fileMessage = this.goEasy.im.createFileMessage({
                file: file,
                to: {
                    type: this.scene,
                    id: this.receiver.uuid,
                    data: this.receiver,
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
        createCustomMessage () {
            this.customMessageForm.visible = false;
            const customMessage = this.goEasy.im.createCustomMessage({
                type : 'order',
                payload : {
                    number : this.customMessageForm.number,
                    goods : this.customMessageForm.goods,
                    price : this.customMessageForm.price
                },
                to: {
                    type: this.scene,
                    id: this.receiver.uuid,
                    data: this.receiver,
                }
            });
            this.sendMessage(customMessage);
        },
        sendMessage(message) {
            this.$emit('onSendMessage', message);
            this.goEasy.im.sendMessage({
                message: message,
                onSuccess: (message) => {
                    console.log('发送成功',message);
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.message-sender {
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 160px;
    background-color: white;
    .actions {
        display: flex;
        flex-direction: row;
        padding: 0 10px;
        .chat-option {
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
                    color: #af4e4e;
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
                .emoji-list {
                    display: flex;
                    flex-wrap: wrap;
                    .emoji-item {
                        width: 50px;
                        height: 50px;
                    }
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
                        outline: none;
                    }
                }
            }
        }
    }
    .content-send {
        padding: 0 10px;
        .content-input {
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
    .send-message {
        padding: 5px 10px;
        text-align: right;
    }
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
.primary-button {
    background: #af4e4e;
    color: white;
    border: none;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    font-weight: 500;
    &:active {
        background: #af4e4e57;
        color: #af4e4e;
    }
    &:hover {
        background: #d38989;
        color: white;
    }
    &:focus {
        background: #af4e4e;
        color: white;
    }
}
</style>
