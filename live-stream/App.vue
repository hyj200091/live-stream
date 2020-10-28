<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 监听底部导航中间突起按钮
			uni.onTabBarMidButtonTap(() =>{
				console.log('点击了中间按钮');
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
/* 引入通用的free样式 */
@import url("/common/free.css");
/* 引入全局的common样式 */
@import url("/common/common.css");
/* 引入全局图标样式icon */
@import url("/common/icon.css");
</style>
