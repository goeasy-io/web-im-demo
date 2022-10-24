<script>
  export default {
    currentUser: null,
    onLaunch: function () {
      console.log('App onLaunch');
    },
    onShow: function () {
      console.log('App Show');
    },
    onHide: function () {
      console.log('App Hide')
    }
  }
</script>

<style>
  @import url('./static/style/chatInterface.css');
  /* 隐藏滚动条 */
  uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
    color: transparent;
  }
</style>
