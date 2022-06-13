<template>
    <div class="goeasy-audio-player" @click="playAudio">
        <div class="audio-facade" :style="{width:Math.ceil(duration)*7 + 60 + 'px'}">
            <div class="audio-facade-bg" :class="{'play-icon':play}"> </div>
            <div>{{Math.ceil(duration) || 0}}"</div>
        </div>
        <audio ref="audioPlayer"></audio>
    </div>
</template>

<script>
export default {
    name: 'GoEasyAudioPlayer',
    props : ['src', 'duration'],
    data () {
        return {
            play : false
        }
    },
    methods : {
        playAudio () {
            this.play = true;
            this.$refs.audioPlayer.src =this.src;
            this.$refs.audioPlayer.load();
            this.$refs.audioPlayer.currentTime = 0;
            this.$refs.audioPlayer.play();
            setTimeout(() => {
                this.play = false;
            }, this.duration*1000)
        }
    }
}
</script>

<style scoped>
.goeasy-audio-player{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.audio-facade{
    min-width: 12px;
    background: #FFFFFF;
    border-radius: 7px;
    display: flex;
    font-size: 14px;
    padding: 8px;
    margin: 5px 10px;
    line-height: 25px;
    cursor: pointer;
}
.audio-facade-bg{
    background: url("../../assets/img/voice.png") no-repeat center;
    background-size: 15px;
    width: 20px;
}
.audio-facade-bg.play-icon{
    background: url("../../assets/img/play.gif") no-repeat center;
    background-size: 20px;
}
</style>
