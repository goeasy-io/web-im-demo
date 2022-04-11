<template>
    <el-container>
        <el-main class="message-sender">
            <div class="actions">
                <!-- 语音 -->
                <div class="chat-option">
                    <el-tooltip effect="dark" content="语音" placement="top-start">
                        <label for="audio-input" @click="startAudioMessage">
                            <i class="iconfont el-icon-microphone"></i>
                        </label>
                    </el-tooltip>
                </div>
                <!-- 表情 -->
                <div class="chat-option">
                    <el-popover placement="top" width="250" trigger="click">
                        <div class="emojiList">
                            <img
                                class="emoji-item"
                                v-for="(emojiItem, emojiKey, index) in emojiMap"
                                :key="index"
                                :src="emojiUrl + emojiItem"
                                @click="chooseEmoji(emojiKey)"
                            />
                        </div>
                        <i class="iconfont icon-smile" slot="reference"></i>
                    </el-popover>
                </div>
                <!-- 图片 -->
                <div class="chat-option">
                    <el-tooltip effect="dark" content="图片" placement="top-start">
                        <label for="img-input">
                            <i class="iconfont icon-picture"></i>
                        </label>
                    </el-tooltip>
                    <input
                        accept="image/*"
                        type="file"
                        @change="createImageMessage"
                        id="img-input"
                        ref="img-input"
                        v-show="false"
                    />
                </div>
                <!-- 视频 -->
                <div class="chat-option">
                    <el-tooltip effect="dark" content="视频" placement="top-start">
                        <label for="video-input">
                            <i class="iconfont icon-film"></i>
                        </label>
                    </el-tooltip>
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
                    <el-tooltip effect="dark" content="文件" placement="top-start">
                        <label for="file-input">
                            <i class="iconfont icon-folder-open"></i>
                        </label>
                    </el-tooltip>
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
                    <el-tooltip effect="dark" content="订单" placement="top-start">
                        <el-popover placement="top" width="250" trigger="manual" v-model="customMessageForm.visible">
                            <el-form label-position="left" label-width="50px" size="small">
                                <el-form-item label="编号">
                                    <el-input v-model="customMessageForm.number"></el-input>
                                </el-form-item>
                                <el-form-item label="商品">
                                    <el-input v-model="customMessageForm.goods"></el-input>
                                </el-form-item>
                                <el-form-item label="金额">
                                    <el-input v-model="customMessageForm.price"></el-input>
                                </el-form-item>
                                <el-button class="cancel-button" size="small" @click="customMessageForm.visible = false">取消</el-button>
                                <el-button class="primary-button" size="small" @click="createCustomMessage">创建</el-button>
                            </el-form>
                            <i class="iconfont el-icon-edit-outline" slot="reference" @click="showCustomMessageForm"></i>
                        </el-popover>
                    </el-tooltip>
                </div>
            </div>

            <div class="content-send" v-if="!audio.visible">
                <el-input
                    rows="3"
                    type="textarea"
                    v-model="content"
                    ref="input"
                ></el-input>
            </div>

            <div class="send-message" v-if="!audio.visible">
                <el-button class="primary-button" size="small" @click="createTextMessage">发送</el-button>
            </div>

            <GoEasyRecorder @onComplete="createAudioMessage" v-if="audio.visible" />
        </el-main>
    </el-container>
</template>

<script>
import GoEasyRecorder from "../GoEasyRecorder/GoEasyRecorder";
export default {
    props: ['receiver'],
    components: {
        GoEasyRecorder,
    },
    data() {
        return {
            content: '',
            emojiContent: '',
            dropActive: false,
            type: this.$route.name,
            currentSession: this.$route.params.id,
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
        startAudioMessage() {
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
        chooseEmoji(emojiKey) {
            this.content += emojiKey;
        },
        createImageMessage(e) {
            const file = e.target.files[0];
            const imageMessage = this.goEasy.im.createImageMessage({
                file: file,
                to: {
                    type: this.scene,
                    id: this.receiver.uuid,
                    data: this.receiver,
                },
            });
            this.sendMessage(imageMessage);
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
            this.goEasy.im.sendMessage({
                message: message,
                onSuccess: (message) => {
                    this.$emit('onSendMessage', message);
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
            .iconfont {
                font-size: 22px;
                margin: 0 10px;
                z-index: 3;
                &:focus {
                    outline: none;
                }
            }
            .iconfont:hover {
                color: #af4e4e;
            }
            .emojiList {
                display: flex;
                flex-wrap: wrap;
                .emoji-item {
                    width: 50px;
                    height: 50px;
                }
            }
        }
    }
    .content-send {
        padding: 0 10px;
    }
    .content-send/deep/.el-textarea__inner {
        border: none;
        resize: none;
        max-height: 73px;
    }
    .send-message {
        padding: 5px 10px;
        text-align: right;
    }
}
.cancel-button {
    &:hover {
        background: #FFFFFF;
        color: #8c8c91;
    }
}
.primary-button {
    background: #af4e4e;
    color: white;
    border: none;
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
