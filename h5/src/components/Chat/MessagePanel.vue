<template>
    <el-container>
        <el-main class="message-sender">
            <div class="actions">
                <!-- 语音 -->
                <div class="chat-option">
                    <div>
                        <el-tooltip class="item" effect="dark" content="语音" placement="top-start">
                            <label for="audio-input" @click="startAudioMessage">
                                <i class="iconfont el-icon-microphone"></i>
                            </label>
                        </el-tooltip>
                    </div>
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
                    <div>
                        <el-tooltip class="item" effect="dark" content="图片" placement="top-start">
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
                </div>
                <!-- 视频 -->
                <div class="chat-option">
                    <el-tooltip class="item" effect="dark" content="视频" placement="top-start">
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
                    <el-tooltip class="item" effect="dark" content="文件" placement="top-start">
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
            </div>

            <div class="content-send" v-if="!audio.visible">
                <el-input
                    rows="3"
                    type="textarea"
                    class="message-input"
                    v-model="content"
                    ref="input"
                    @paste.native="userPaste"
                ></el-input>
            </div>

            <div class="send-message" v-if="!audio.visible">
                <el-button class="send-button" size="small" @click="createTextMessage">发送</el-button>
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
            scene: null
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
            let imageMessage = this.goEasy.im.createImageMessage({
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
            let videoMessage = null;
            videoMessage = this.goEasy.im.createVideoMessage({
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
            let fileMessage = null;
            fileMessage = this.goEasy.im.createFileMessage({
                file: file,
                to: {
                    type: this.scene,
                    id: this.receiver.uuid,
                    data: this.receiver,
                },
            });
            this.sendMessage(fileMessage);
        },
        sendMessage(message) {
            this.goEasy.im.sendMessage({
                message: message,
                onSuccess: (message) => {
                    this.$emit('onSendMessage', message);
                },
            });
        },
        userPaste(e) {
            const file = e.clipboardData.files[0];
            if (file && file.type === 'image/png') {
                this.uploadImg(file);
            }
        },
        uploadImg(file) {
            let imageMessage = null;
            imageMessage = this.goEasy.im.createImageMessage({
                file: file,
                to: {
                    type: this.scene,
                    id: this.receiver.uuid,
                    data: this.receiver,
                },
            });
            this.$alert(
                '<img src="' +
                    imageMessage.payload.url +
                    '" style="width:300px;display:block;margin:0 auto;" ></img>',
                '确认发送',
                {
                    dangerouslyUseHTMLString: true,
                },
            ).then(() => {
                this.sendMessage(imageMessage);
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.el-main {
    padding: 0;
}
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
    .send-message {
        padding: 5px 10px;
        text-align: right;
    }
}
.el-textarea__inner {
  border: 0px !important;
  resize: none;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
}
.el-button {
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
