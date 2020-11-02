<template>
	<view class="content">
		<!-- 自定义导航栏 -->
<!-- 		<nav-bar>
				<template slot="left">
					<text class="font-md ml-2 text-white">直播</text>
				</template>
				<template slot="right">
					<text class="iconfont iconmore mr-2 text-white"></text>
				</template>
		</nav-bar> -->
		<!-- <view style="margin-top: 24px;"> -->
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200" style="width: 750rpx;height: 250rpx;">
				<swiper-item>
					<image src="../../static/beijing2.jpg" style="width: 750rpx;height: 250rpx;"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/beijing1.jpg" style="width: 750rpx;height: 250rpx;"></image>
				</swiper-item>
			</swiper>
		<!-- </view> -->
		<view class="flex flex-wrap">
			<l-list v-for="(item,index) in list" :key="index" :item="item" :index="index" @into="live(item)"></l-list>
		</view>
			
	</view>
</template>

<script>
import navBar from '../../components/common/nav-bar.vue';
import lList from '../../components/common/l-list.vue'
	export default {
		components:{
			navBar,lList
		},
		data() {
			return{
				
				list:[
				{
					rank: 4,
					image: 'https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/2033810.jpg',
					people: 990,
					title: '二次元',
					finish:0    ,//0表示结束 1 表示正在直播
					url: 'https://houyuejia.utools.club/live/ZmKe7I2iL4kYl3VhZnFZ.flv?sign=1604331202-71109d2ac67c0da1e17eb967d9b3afc6'
				},
				{
					rank: 1,
					image: 'https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/d81a17f4f7eb0d8a786b6ae9b4a2596.jpg',
					people: 122,
					title: '户外',
					finish:0    //0表示结束 1 表示正在直播
				},
				{
					rank: 3,
					image: 'https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/5b2887d00a6c35f5e882ac8295cb77a.jpg',
					people: 324,
					title: '健身',
					finish: 0    //0表示结束 1 表示正在直播
				},
				{
					rank: 6,
					image: 'https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/d81a17f4f7eb0d8a786b6ae9b4a2596.jpg',
					people: 684,
					title: '美食',
					finish: 1    //0表示结束 1 表示正在直播
				},
				{
					rank: 5,
					image: 'https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/5b2887d00a6c35f5e882ac8295cb77a.jpg',
					people: 543,
					title: '帅哥',
					finish: 1    //0表示结束 1 表示正在直播
				},
				{
					rank: 2,
					image: 'https://soft1851.oss-cn-beijing.aliyuncs.com/markdown/2033810.jpg',
					people: 1100,
					title: '美女',
					finish: 1    //0表示结束 1 表示正在直播
				},
				]
			}
		},
		onLoad() {
			// uni.hideTabBar();
		},
		methods:{
			live(value) {
				// console.log(value);
				uni.navigateTo({
					url: '/pages/live/live'
				})
				
			}
		}
	}
</script>

<style>
</style>
