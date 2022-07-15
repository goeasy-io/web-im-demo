<template>
    <div>
        <div class="content-video" @click="play">
            <img :src="thumbnail.url" />
            <div class="icon"></div>
        </div>
        <div class="goeays-video-player" v-if="visible">
            <video
                class="video-player"
                :src="video.url"
                controls
                autoplay
            ></video>
            <span class="close-player" @click="end">x</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'goeasy-video-player',
    props: ['src','thumbnail'],
    data () {
        return {
            play: false
        }
    },
    methods: {
        play () {
            this.play = true;
        },

        end() {
            this.play = false;
        }

    },
};
</script>

<style lang="scss">
.content-video {
    display: block;
    margin: 5px 10px;
    cursor: pointer;
    max-height: 200px;
    position: relative;
    img {
        max-width: 200px;
        max-height: 200px;
    }
    .icon {
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
}
.goeays-video-player {
    max-width: 750px;
    max-height: 500px;
    overflow: hidden;
    background: #3e3e3e;
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
