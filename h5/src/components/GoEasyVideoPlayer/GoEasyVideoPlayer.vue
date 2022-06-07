<template>
    <div class="goeays-video-player">
        <video
            class="video-player"
            controls=""
            id="video"
            ref="video"
            :src="video.url"
        ></video>
        <span class="close-player" @click="handleClose">x</span>
    </div>
</template>

<script>
export default {
    name: 'video-player',
    props: {
        video: {
            type: Object,
        }
    },
    mounted() {
        this.$refs.video.play();
    },
    methods: {
        handleClose() {
            this.$emit('closeVideoPlayer');
            // 关闭弹出框时 视频关闭播放
            this.$refs.video.pause();
        },
    },
};
</script>

<style lang="scss">
.goeays-video-player {
    max-width: 750px;
    max-height: 500px;
    overflow: hidden;
    padding: 30px 0 5px 0;
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
    z-index: 9999;
    video {
        max-width: 750px;
        max-height: 500px;
    }
    .close-player {
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
</style>
