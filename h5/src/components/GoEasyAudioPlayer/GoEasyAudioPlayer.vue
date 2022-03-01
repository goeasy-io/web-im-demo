<template>
    <div class="goeasy-audio-player" @click="playAudio">
        <div class="audio-facade" :style="{width:Math.ceil(duration)*7 + 80 + 'px'}">
            <div class="audio-facade-bg" :class="{'play-icon':play}"> </div>
            <div>{{Math.ceil(duration) || 0}}"</div>
        </div>
        <audio ref="audioPlayer"></audio>
    </div>
</template>

<script>
    export default {
        name: "GoEasyAudioPlayer",
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
        margin-top: 0.06rem;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    .audio-facade{
        min-width: 0.15rem;
        padding: 0.03rem 0.05rem;
        height: 0.36rem;
        line-height: 0.3rem;
        background: #618DFF;
        font-size: 0.12rem;
        border-radius: 0.07rem;
        color: #ffffff;
        display: flex;
    }
    .audio-facade-bg{
        background: url("./images/voice.png") no-repeat center;
        background-size: 0.15rem;
        width: 0.2rem;
    }
    .audio-facade-bg.play-icon{
        background: url("./images/play.gif") no-repeat center;
        background-size: 0.15rem;
        -moz-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -o-transform:rotate(180deg);
        transform:rotate(180deg);
    }
</style>