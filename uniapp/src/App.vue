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
</style>
