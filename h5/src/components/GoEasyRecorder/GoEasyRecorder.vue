<template>
    <div class="goEasy-recorder">
        <div class="record-input" @click="onStateChange">{{recording ? '点击发送' : '点击录音'}}</div>
        <div class="record-loading" v-if="recording"></div>
    </div>
</template>

<script>
import Recorder from 'recorder-core';
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'
export default {
    name: "GoEasyRecorder",
    data () {
        return {
            recording : false,
            recorder : null,
            file : null
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.close();
        this.recorder = null;
    },
    methods : {
        init() {
            this.recorder = Recorder({
                type : 'mp3',
                sampleRate:16000,
                bitRate:16,
                onProcess : function () {}
            });
        },
        onStateChange () {
            if(this.recording) {
                this.stop()
            }else{
                this.start()
            }
        },
        start () {
            this.recorder.open(() => {
                console.log('录音授权成功')
                //授权成功
                this.recording = true;
                if(this.recorder && this.recorder.state !== 1) {
                    this.recorder.start()
                }
            }, (e) => {
                alert('获取录音权限失败,请先授权才能发送语音消息!');
                console.log('录音授权失败',e);
                //授权失败
                this.close()
            })
        },
        stop () {
            this.recording = false;
            this.recorder.stop((blob, duration) => {
                if (duration < 1000) {
                    alert('录音时间太短');
                } else {
                    let file = new File([blob], 'audio.mp3', {type: blob.type, lastModified: Date.now()});
                    this.$emit('onComplete', file);
                }
            }, (msg) => {
                console.log(msg)
            })
        },
        close () {
            if(this.recorder) {
                this.recorder.close();
            }
        }
    }
}
</script>

<style scoped>
.goEasy-recorder{
    width: 100px;
    display: flex;
    flex: 1;
    align-items: center;
    align-self: center;
}

.goEasy-recorder .record-input{
    width: 210px;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    background: #af4e4e;
}

.record-loading{
    position: absolute;
    top: -325px;
    left: 50%;
    width: 150px;
    height: 150px;
    margin: -40px -75px;
    background: #262628 url("../../assets/img/loading.gif") no-repeat center;
    background-size: 100%;
    border-radius: 20px;
}
</style>
