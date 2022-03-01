<script>
    export default {
		onLaunch: function() {
			console.log("App onLaunch");
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide')
		},
        globalData : {
		    imService : null
        }
	}
</script>

<style>
    @import url("./static/style/chatInterface.css");
</style>
