<template>
    <div class="goeays-video-player">
        <div class="video-snapshot" v-if="showSnapshot" @click="callFullScreen">
            <img :src="thumbnail.url" @load="onLoadEnd" ref="content" />
            <div class="icon"></div>
        </div>
        <el-dialog :visible.sync="dialogVisible" :width="contentWidth" :before-close="handleClose">
            <video
                class="video-player"
                controls=""
                v-show="show"
                id="video"
                :src="video.url"
            ></video>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'video-player',
    props: {
        video: {
            type: Object,
        },
        showSnapshot: {
            type: Boolean,
            default: true,
        },
        thumbnail: {
            type: Object,
        },
    },
    data() {
        return {
            show: false,
            dialogVisible: false,
            contentWidth: '',
        };
    },
    methods: {
        callFullScreen() {
            this.dialogVisible = true;
            this.show = true;
            this.contentWidth = this.$refs.content.width * 3 + 'px';
        },
        onLoadEnd() {
            this.$emit('onLoadEnd');
        },
        handleClose() {
            this.dialogVisible = false;
            // 关闭弹出框时 视频关闭播放
            const video = document.getElementById('video');
            video.pause();
        },
    },
};
</script>

<style lang="scss">
.video-snapshot {
    position: relative;
}
.video-snapshot img {
    max-height: 200px;
    max-width: 200px;
}
.video-snapshot .icon {
    position: absolute;
    width: 20px;
    height: 20px;
    background: url('../../assets/img/play.png') no-repeat center;
    background-size: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.video-player {
    width: 100%;
    height: 100%;
    display: block;
}
#video:focus {
    outline: none;
}
.el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 10px;
}
.el-dialog__header {
    padding: 15px;
}
.el-dialog__body {
    padding: 0;
}
</style>
