<template>
	<view class="content">
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200" style="width: 750rpx;height: 250rpx;">
				<swiper-item>
					<image src="../../static/beijing2.jpg" style="width: 750rpx;height: 250rpx;"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/beijing1.jpg" style="width: 750rpx;height: 250rpx;"></image>
				</swiper-item>
			</swiper>
			<view class=" top flex align-center justify-center">
				<input 
				style="width: 600rpx; height: 70rpx; background-color: rgba(0,0,0,0.2);"
				type="text" 
				class="rounded-circle mx-1 pl-5"
				placeholder="搜索直播间"/>
			</view>
		<!-- 列表 -->
		<view class="flex flex-wrap">
			<view v-for="(item,index) in list" :key="index">
			<l-list :item="item" :index="index" @click="openLive(item.id)"></l-list>
		     </view>
		</view>
		<view class="f-divider">
			<view class="flex align-center justify-center py-3">
				<text class="font-md text-secondary">{{ loadText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import lList from '../../components/common/l-list.vue'
	export default {
		components:{
			lList
		},
		data() {
			return{
				list:[],
				page: 1,
				loadText: '上拉加载更多'
			};
		},
		onLoad() {
			this.getData();
			console.log(this.list);
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getData().then(res => {
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh();
			})
			.catch(err => {
				uni.stopPullDownRefresh();
			});
		},
		onReachBottom() {
			if(this.loadText !== '上拉加载更多') {
				return;
			}
			this.loadText = '加载中...';
			this.page++;
			this.getData();
		},
		methods:{
			// 获取直播列表数据
			getData() {
				let page = this.page;
				return this.$H.get('/live/list/' + page).then(res => {
					(this.list = page ===1 ? res : [...this.list, ...res]),
					 (this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多');
				})
				.catch(err => {
					if(this.page > 1) {
						this.page--;
						this.loadText = '上拉加载更多';
					}
				});
				console.log(this.list);
			},
			openLive(item) {
				uni.navigateTo({
					url: '/pages/live/live?id='+ item
				})
			}
		}
	}
</script>

<style scoped>
	.top {
		width: 750rpx;
		height: 120rpx;
		background-size: cover;
		background-image: linear-gradient(to right, #ba7ace 0%, #8745ff 100%);
	}
</style>
