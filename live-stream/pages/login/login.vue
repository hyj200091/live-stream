<template>
	<view class="container">
		<view class="flex align-center justify-center" style="height: 350rpx;">
			<text style="font-size: 50rpx;" class="text-secondary">{{ type == 'codeLogin'? '手机验证码登录' : '账号密码登录'}}</text>
		</view>
		<!-- 中间部分 进行判断 -->
		<view v-if=" type == 'codeLogin'" style="height: 215rpx;" class="px-3 bg-white">
			<view class="flex  align-center border-bottom " style="height: 100rpx;">
				<text class="font-sm font-weight-bold mr-3">+86</text>
				<input type="number" placeholder="手机号" class="font-sm">
			</view>
			<view class="flex justify-between align-center mt-1 border-bottom" style="height: 100rpx;">
				<input type="text" placeholder="请输入验证码" class="font-sm mr-5">
				<view style="width: 130rpx;height: 55rpx;" class="flex justify-center bg-secondary rounded align-center"  @click="getNumber">
					<text class="font-sm  text-white">{{ codeTime === 0 ? '获取验证码' : second + 's' }}</text>
				</view>
				<!-- <view v-else style="width: 130rpx;height: 55rpx;" class="justify-center bg-secondary rounded align-center">
					<text class="ml-5 font-sm  text-white"> {{second}}s</text>
				</view> -->
			</view>
		</view>
		<view v-else style="height: 215rpx;" class="px-3 bg-white">
			<view class="flex  align-center border-bottom " style="height: 100rpx;">
				<input type="text" placeholder="昵称/手机号/邮箱" class="font-sm" v-model="form.username">
			</view>
			<view class="flex justify-between align-center mt-1 border-bottom" style="height: 100rpx;">
				<input type="text" placeholder="请输入密码" class="font-sm mr-5" v-model="form.password">
				<view style="width: 130rpx;height: 55rpx;" class="flex justify-center bg-secondary rounded align-center">
					<text class="font-sm  text-white">忘记密码</text>
				</view>
			</view>
		</view>
		
		<view :class="form.password === '' ? 'bg-secondary' : 'bg-danger'" style="height: 90rpx;width:100%;margin-top: 70rpx;" class="flex rounded-circle justify-center align-center" @click="submit">
			<text class="font text-white">登录</text>
		</view>
		<!-- 下面部分 -->
		<view class="bg-light" style="height: 380rpx;margin-top: 20rpx;">
			<!-- 验证码登录 | 登录遇到问题 -->
			<view style="height: 80rpx;" class="flex align-center justify-center">
				<text class="font-sm text-hover-primary mr-2" @click="changeType">{{ type == 'codeLogin'? '账号密码登录' : '验证码登录'}}</text>
				<text class="font-sm  mr-2">|</text>
				<text class="font-sm text-hover-primary">登录遇到了问题</text>
			</view>
			<!-- 社交账号登录 -->
			<view style="height: 80rpx;" class="flex align-center justify-center">
				<text class="font-sm text-secondary">————社交账号登录————</text>
			</view>
			<!-- 图标 -->
			<view class=" flex justify-center align-center" style="height: 120rpx;">
				<image class="rounded-circle" src="../../static/wx.png" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
				<image class="rounded-circle mr-5 ml-5" src="../../static/qq.png" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
				<image class="rounded-circle" src="../../static/wb.png" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
			</view>
		    <!-- 底部 -->
		   <view class="flex align-center justify-center mt-3" style="height: 40rpx;">
			<text class="font-sm">注册即代表您同意</text>
			<text class="font-sm text-primary">《xxx社区协议》</text>
		   </view>
	</view>

<!-- 		<view class="px-3">
			<input type="text" v-model="form.username" class="bg-light px-3 mb-4 font rounded" placeholder="请输入用户名" style="height: 100rpx;" />
			<input type="text" v-model="form.password" class="bg-light px-3 mb-4 font rounded" placeholder="请输入密码" style="height: 100rpx;" />
			<input v-if="type != 'login'" type="text" v-model="form.repassword" class="bg-light px-3 mb-4 font rounded" placeholder="请输入确认密码" style="height: 100rpx;" />
		</view>
		<view class="p-3 flex align-center justify-center" @click="submit">
			<view class="bg-main rounded p-3 flex align-center justify-center flex-1" hover-class="bg-main-hover">
				<text class="text-white font-md">{{ type == 'login'? '登录' : '注册'}}</text>
			</view>
		</view>
		<view class="flex align-center justify-center">
			<text class="text-light-muted font p-2" @click="changeType">{{ type == 'login'? '注册账号' : '去登录'}}</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 //控制文字和数字的显隐性
				 codeTime:0,
				 second: 60,
				type: 'codeLogin',
				form: {
					username: '',
					password: '',
					repassword: ''
				}
			}
		},
		methods: {
			// 获取验证码
			getNumber() {
				 this.codeTime = 1
				    var interval = setInterval(() => {
				        --this.second
				    }, 1000)
					if(this.second<60){
						uni.showToast({
							title:"时间未到 不能重复获取!",
							icon:'none'
						})
					}
				    setTimeout(() => {
				        clearInterval(interval)
				        this.codeTime = 0
				    }, 60000)
			},
			changeType() {
				this.type = this.type === 'codeLogin' ? 'accountLogin' : 'codeLogin'
			},
			submit() {
				let msg = this.type === 'codeLogin' ? '账号密码登录' : '验证码登录'
				this.$H.post('/'+ 'login',this.form).then(res => {
					uni.showToast({
						title: msg + '成功',
						icon: 'none'
					});
					if(this.type === 'reg'){
						this.changeType()
						this.form = {
							username: '',
							password: '',
							repassword: ''
						}
					}else {
						this.$store.dispatch('login',res)
						uni.navigateBack({
						delta: 1	
						});
					}
				})
			}
		}
	}
</script>

<style>
	.container{
		width: 750rpx;
		height: 100vh;
		margin: 0;
		padding: 100rpx 0 0 0;
		background-size: cover;
		/* background-image: linear-gradient(to bottom, #BA7ACE 0%, #8745FF 100%); */
	}
</style>
