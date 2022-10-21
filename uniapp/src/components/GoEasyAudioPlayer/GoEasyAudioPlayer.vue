<template>
    <div class="goeasy-audio-player" @click="playAudio">
        <div class="audio-facade" :style="{width:Math.ceil(duration)*7 + 50 + 'px'}">
            <div class="audio-facade-bg" :class="{'play-icon':play}"> </div>
            <div>{{Math.ceil(duration) || 1}}<span>"</span></div>
        </div>
    </div>
</template>

<script>
    const innerAudioContext = uni.createInnerAudioContext();
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
                innerAudioContext.src = this.src;
                innerAudioContext.play();
                setTimeout(() => {
                    this.play = false;
                }, this.duration*1000)
            }
        }
    }
</script>

<style scoped>
    .goeasy-audio-player{
		height: 86rpx;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    .audio-facade{
        min-width: 20rpx;
        padding: 6rpx 10rpx;
        line-height: 72rpx;
        background: #FFFFFF;
        font-size: 24rpx;
        border-radius: 14rpx;
        color: #000000;
        display: flex;
    }
    .audio-facade-bg{
        background: url("/static/images/voice.png") no-repeat center;
        background-size: 30rpx;
        width: 40rpx;
    }
    .audio-facade-bg.play-icon{
        background: url("/static/images/play.gif") no-repeat center;
        background-size: 30rpx;
    }
</style>
