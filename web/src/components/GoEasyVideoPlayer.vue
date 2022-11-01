<template>
  <div>
    <div class="content-video" @click="play">
      <img :src="thumbnail.url" :style="{height:getImageHeight(thumbnail.width,thumbnail.height)+'px'}"/>
      <div class="icon"></div>
    </div>
    <div v-if="playing" class="video-player">
      <video
        :src="src"
        autoplay
        controls
      ></video>
      <span class="close-player" @click="end">x</span>
    </div>
  </div>
</template>

<script>
  const IMAGE_MAX_WIDTH = 200;
  const IMAGE_MAX_HEIGHT = 150;
  export default {
    name: 'goeasy-video-player',
    props: ['src', 'thumbnail'],
    data() {
      return {
        playing: false
      }
    },
    methods: {
      getImageHeight(width, height) {
        if (width < IMAGE_MAX_WIDTH && height < IMAGE_MAX_HEIGHT) {
          return height;
        } else if (width > height) {
          return (IMAGE_MAX_WIDTH / width * height);
        } else if (width === height || width < height) {
          return IMAGE_MAX_HEIGHT;
        }
      },

      play() {
        this.playing = true;
      },

      end() {
        this.playing = false;
      }

    },
  };
</script>

<style scoped>
  .content-video {
    display: block;
    cursor: pointer;
    position: relative;
    height: 100%;
  }

  .content-video img {
    height: 100%;
  }

  .content-video .icon {
    position: absolute;
    width: 20px;
    height: 20px;
    background: url('../assets/images/play.png') no-repeat center;
    background-size: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .video-player {
    max-width: 750px;
    max-height: 500px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
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
  }

  .video-player video {
    max-width: 750px;
    max-height: 500px;
  }

  .video-player .close-player {
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
</style>
