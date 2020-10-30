<template>
	<view>
		<!-- 顶部紫色渐变背景 -->
		<view class="top flex align-center justify-center">
		</view>
		<view class="flex align-center">
			<view class="flex align-center justify-center position-relative" style="width: 180rpx;height: 160rpx;">
				<image src="https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/5b2887d00a6c35f5e882ac8295cb77a.jpg"
				class="rounded-circle" style="height: 145rpx; width: 145rpx; position: absolute;top: -60rpx;"></image>
			</view>
			<view class="flex flex-column">
				<text class="font-md">Martin</text>
				<text class="font text-muted">人生如戏</text>
			</view>
			<view class="ml-auto mr-3">
				<view class="border border-main rounded flex align-center justify-center p-2" hover-class="bg-light">
					<text class="text-main font">编辑资料</text>
				</view>
			</view>
		</view>
		<view class="f-divider"></view>
		<f-list-item icon="iconbizhongguanli" title="我的金币" :showRight="false">
			<text class="text-muted font">50金币 立即充值</text>
		</f-list-item>
		<f-list-item icon="iconzhengzaizhibo" title="我的直播">
			<text class="text-muted font">0</text>
		</f-list-item>
		<f-list-item icon="iconfaxian" title="我的关注">
			<text class="text-muted font">0</text>
		</f-list-item>
		<f-list-item icon="iconmore" title="历史记录" ></f-list-item>
	</view>
</template>

<script>
	import fListItem from '../../components/common/f-list-item.vue'
	export default {
		components:{
			fListItem
		},
		data() {
			return {
				// statusBarHeight: 0
			};
		},
		onLoad() {
			// let res = uni.getSystemInfoSync()
			// this.statusBarHeight = res.statusBarHeight
		},
		methods:{}
	}
</script>

<style scoped>
.top {
	width: 750rpx;
	height: 260rpx;
	background-size: cover;
	/* background-image: url(../../static/beijing1.jpg); */
     /* 渐变色 从左到右 紫色逐渐加深 */
	background-image: linear-gradient(to right, #BA7ACE 0%, #8745FF 100%);
}
</style>
