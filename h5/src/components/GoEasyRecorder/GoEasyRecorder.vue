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
                    onProcess : function () {

                    }
                });
                this.recorder.open(() => {
                    console.log('录音授权成功')
                    //授权成功
                }, (e) => {
                    console.log('录音授权失败',e);
                    //授权失败
                    this.close()
                })
            },
            onStateChange () {
                if(this.recording) {
                    this.stop()
                }else{
                    this.start()
                }
            },
            start () {
                this.recording = true;
                if(this.recorder && this.recorder.state != 1) {
                    this.recorder.start()
                }
            },
            stop () {
                this.recorder.stop((blob, duration) => {
                    this.recording = false;
                    this.open = false;
                    let file = new File([blob], 'audio.mp3', {type: blob.type, lastModified: Date.now()});
                    this.$emit('onComplete', file);
                }, (msg) => {
                    console.log(msg)
                })
            },
            close () {
                this.open = true;
                if(this.recorder) {
                    this.recorder.close();
                }
            }
        }
    }
</script>

<style scoped>
    .goEasy-recorder{
        width: 2.1rem;
        display: flex;
    }

    .goEasy-recorder .record-input{
        width: 2.1rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 0.06rem;
        font-size: 0.14rem;
        color: #ffffff;
        text-align: center;
        background: #cccccc;
    }

    .record-loading{
        position: absolute;
        top:50%;
        left: 50%;
        width: 1.5rem;
        height: 1.5rem;
        margin: -4rem -0.75rem;
        background: #262628 url("./images/loading.gif") no-repeat center;
        background-size: 100%;
        border-radius: 0.2rem;
    }

</style>