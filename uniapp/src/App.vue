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
  /*  #ifdef  H5  */
  *{
    font-family: "HanHei SC",PingHei,"PingFang SC","Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;;
    font-style: normal;
    font-weight: normal;
  }
  /*  #endif  */
  /* 隐藏滚动条 */
  uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
    color: transparent;
  }
  .uni-page-head .uni-page-head__title{
    font-size: 30rpx !important;
  }
</style>
