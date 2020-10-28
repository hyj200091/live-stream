<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<nav-bar>
				<template slot="left">
					<text class="font-md ml-2 text-white">直播</text>
				</template>
				<template slot="right">
					<text class="iconfont iconmore mr-2 text-white"></text>
				</template>
		</nav-bar>
	</view>
</template>

<script>
import navBar from '../../components/common/nav-bar.vue';
	export default {
		components:{
			navBar
		},
		onLoad() {
			// uni.hideTabBar();
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		background: #5a5b5a;
	}
</style>
