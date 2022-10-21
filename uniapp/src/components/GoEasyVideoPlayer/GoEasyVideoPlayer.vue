<template>
    <video
            v-if="show"
            class="video-player"
            controls = ""
            @play="onPlayStart"
            id="videoPlayer"
            autoplay="true"
            @error="error"
            @fullscreenchange="onVideoFullScreenChange"
            :src="url">
    </video>
</template>

<script>
    export default {
        name: "GoEasyVideoPlayer",
        data () {
            return {
                show : false,
                context: null,
                url: ''
            }
        },
        methods : {
            play (video) {
                this.url = video.url;
                this.context = uni.createVideoContext('videoPlayer');
                this.show = true;
            },
            onVideoFullScreenChange (e) {
                //当退出全屏播放时，隐藏播放器
                if(this.show && !e.detail.fullScreen){
                    this.show = false;
                    this.context.stop();
                }
            },
            onPlayStart () {
                //播放开始时，立即全屏
                this.context.requestFullScreen({
                    direction : 0
                });
            },
            error (e) {
                console.log(e)
            }
        }
    }
</script>

<style scoped>
    .video-player{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>