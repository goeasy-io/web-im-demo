<template>
    <div class="goeasy-audio-player" @click="play">
        <div class="audio-facade" :style="{width:Math.ceil(duration)*7 + 60 + 'px'}">
            <div class="audio-facade-bg" :class="{'play-icon':playing}"> </div>
            <div>{{Math.ceil(duration) || 0}}"</div>
        </div>
        <audio ref="audioPlayer" @ended="onEnd"></audio>
    </div>
</template>

<script>
export default {
    name: 'goeasy-audio-player',
    props : ['src', 'duration'],
    data () {
        return {
            playing : false
        }
    },
    methods : {
        play () {
            this.playing = true;
            this.$refs.audioPlayer.src =this.src;
            this.$refs.audioPlayer.load();
            this.$refs.audioPlayer.currentTime = 0;
            this.$refs.audioPlayer.play();
        },
        onEnd () {
            this.playing = false;
        }
    }
}
</script>

<style scoped>
  .goeasy-audio-player {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .audio-facade {
    min-width: 12px;
    background: #eeeeee;
    border-radius: 7px;
    display: flex;
    font-size: 14px;
    padding: 8px;
    margin: 5px 0;
    line-height: 25px;
    cursor: pointer;
  }

  .audio-facade-bg {
    background: url("../assets/images/voice.png") no-repeat center;
    background-size: 15px;
    width: 20px;
  }

  .audio-facade-bg.play-icon {
    background: url("../assets/images/play.gif") no-repeat center;
    background-size: 20px;
  }
</style>
