<template>
    <div class="send-box">
        <div class="send-box-top">
            <div :class="[audio.visible ? 'record-icon record-open-icon':'record-icon']" @click="audio.visible = !audio.visible"></div>
            <div class="message-record-container">
                <GoEasyRecorder @onComplete="onRecordComplete" v-if="audio.visible" />
                <!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
                <input class="message-input" type="text" maxlength="700" placeholder="发送消息" v-model="content" @focus="messageInputFocusin" v-else>
            </div>
            <div class="action-icon-container">
                <div class="emoji-icon" @click="showEmoji"></div>
                <div class="more-icon" @click="showMore"></div>
                <div class="send-btn" @click="sendTextMessage">发送</div>
            </div>
        </div>
        <div class="send-box-bottom" v-if="emoji.show || more.show">
            <div class="emoji-container" v-if="emoji.show">
                <img class="emoji-item"
                       v-for="(emojiItem, emojiKey, index) in emoji.map"
                       :key="index"
                       :src="emoji.url + emojiItem"
                       @click="selectEmoji(emojiKey)" />
            </div>
            <div class="more-container" v-if="more.show">
                <div class="more-item">
                    <img src="/static/images/tupian.png" />
                    <span>图片</span>
                    <input type="file" @change="chooseImage" class="img-input" ref="imgInput">
                </div>
                <div class="more-item">
                    <img src="/static/images/shipin.png" />
                    <span>视频</span>
                    <input type="file" @change="chooseVideo" class="img-input" ref="videoInput">
                </div>
                <div class="more-item">
                    <img src="/static/images/file.png" />
                    <span>文件</span>
                    <input type="file" @change="chooseFile" class="img-input" ref="fileInput">
                </div>
                <div class="more-item" @click="showCustomMessageForm">
                    <img src="/static/images/custom.png" />
                    <span>自定义消息</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GoEasyRecorder from "../../../components/GoEasyRecorder/GoEasyRecorder";
    export default {
        name: "SendBox",
        props : ['to','type'],
        components : {
            GoEasyRecorder
        },
        data () {
            let emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
            let emojiMap = {
                '[么么哒]': 'emoji_3@2x.png',
                '[乒乓]': 'emoji_4@2x.png',
                '[便便]': 'emoji_5@2x.png',
                '[信封]': 'emoji_6@2x.png',
                '[偷笑]': 'emoji_7@2x.png',
                '[傲慢]': 'emoji_8@2x.png'
            };
            return {
                audio : {
                    //语音录音中
                    recording : false,
                    //录音按钮展示
                    visible : false
                },
                emoji :{
                    url : emojiUrl,
                    map : emojiMap,
                    show: false
                },
                more : {
                    show : false
                },
                content :''
            }
        },
        methods : {
            onRecordComplete (file) {
                let audioMessage = this.goEasy.im.createAudioMessage({
                    to : {
                        id : this.to.uuid,
                        type : this.type,
                        data : {
                            name: this.to.name,
                            avatar: this.to.avatar
                        }
                    },
                    file: file,
                    onProgress :function (progress) {
                        console.log(progress)
                    }
                });
                this.sendMessage(audioMessage);
                this.$emit('onSent');
            },
            chooseImage (e) {
                let file = e.target.files[0];
                let imageMessage = this.goEasy.im.createImageMessage({
                    to : {
                        id : this.to.uuid,
                        type : this.type,
                        data : {
                            name:this.to.name,
                            avatar:this.to.avatar
                        }
                    },
                    file: file,
                    onProgress :function (progress) {
                        console.log(progress)
                    }
                });
                this.sendMessage(imageMessage);
                this.$emit('onSent');
            },
            chooseVideo (e) {
                let file = e.target.files[0];
                let videoMessage = this.goEasy.im.createVideoMessage({
                    to : {
                        id : this.to.uuid,
                        type : this.type,
                        data : {
                            name:this.to.name,
                            avatar:this.to.avatar
                        }
                    },
                    file: file,
                    onProgress :function (progress) {
                        console.log(progress)
                    }
                });
                this.sendMessage(videoMessage);
                this.$emit('onSent');
            },
            chooseFile (e) {
                let file = e.target.files[0];
                let fileMessage = this.goEasy.im.createFileMessage({
                    to : {
                        id : this.to.uuid,
                        type : this.type,
                        data : {
                            name:this.to.name,
                            avatar:this.to.avatar
                        }
                    },
                    file: file,
                    onProgress :function (progress) {
                        console.log(progress)
                    }
                });
                this.sendMessage(fileMessage);
                this.$emit('onSent');
            },
            sendTextMessage () {
                if(this.content.trim().length !== 0){
                    let textMessage = this.goEasy.im.createTextMessage({
                        text: this.content,
                        to : {
                            id : this.to.uuid,
                            type : this.type,
                            data : {
                                name:this.to.name,
                                avatar:this.to.avatar
                            }
                        }
                    });
                    this.sendMessage(textMessage);
                    this.$emit('onSent');
                    this.content = ''
                }
            },
            sendMessage(message){
                let toId = message.to.id;
                let type = message.to.type;
                let localHistory;
                if(type === this.GoEasy.IM_SCENE.PRIVATE){
                    localHistory = this.service.getPrivateMessages(toId);
                }else {
                    localHistory = this.service.getGroupMessages(toId);
                }
                localHistory.push(message);
                this.goEasy.im.sendMessage({
                    message: message,
                    onSuccess: function (message) {
                        console.log("发送成功.", message);
                    },
                    onFailed: function (error) {
                        console.log("发送失败:",error);
                    }
                });
            },
            showCustomMessageForm () {
                this.$router.push({
                    name : 'customMessage',
                    query : {
                        to : JSON.stringify(this.to),
                        type: this.type
                    }
                })
            },
            messageInputFocusin () {
                this.more.show = false;
                this.emoji.show = false
            },
            showEmoji () {
                this.emoji.show = !this.emoji.show;
                this.more.show = false;
            },
            selectEmoji (emojiKey) {
                this.content +=emojiKey
            },
            showMore () {
                this.more.show = !this.more.show;
                this.emoji.show = false
            }
        }
    }
</script>

<style scoped>
    @import "./sendBox.css";
</style>